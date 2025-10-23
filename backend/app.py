# backend/app.py

from flask import Flask, request, send_from_directory, jsonify, redirect, url_for
from flask_cors import CORS
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Protocol.KDF import scrypt
import os

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React frontend (e.g., localhost:3000)

# Set up directories for file uploads and encrypted/decrypted files
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ENCRYPTED_FOLDER = os.path.join(os.getcwd(), 'encrypted')
DECRYPTED_FOLDER = os.path.join(os.getcwd(), 'decrypted')

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(ENCRYPTED_FOLDER, exist_ok=True)
os.makedirs(DECRYPTED_FOLDER, exist_ok=True)

# Helper function to derive key from password using scrypt
def derive_key(password: str, salt: bytes):
    return scrypt(password.encode(), salt, 32, N=2**14, r=8, p=1)

# AES encryption
def encrypt_file(file_path: str, password: str):
    salt = os.urandom(16)
    key = derive_key(password, salt)
    cipher = AES.new(key, AES.MODE_CBC)
    
    with open(file_path, 'rb') as f:
        file_data = f.read()

    encrypted_data = cipher.encrypt(pad(file_data, AES.block_size))

    # Save the encrypted file with salt and IV included
    encrypted_filename = f"encrypted_{os.path.basename(file_path)}"
    encrypted_file_path = os.path.join(ENCRYPTED_FOLDER, encrypted_filename)
    
    with open(encrypted_file_path, 'wb') as f:
        f.write(salt + cipher.iv + encrypted_data)

    return encrypted_file_path, encrypted_filename

# AES decryption
def decrypt_file(file_path: str, password: str):
    with open(file_path, 'rb') as f:
        file_data = f.read()
    
    salt = file_data[:16]
    iv = file_data[16:32]
    encrypted_data = file_data[32:]

    key = derive_key(password, salt)
    cipher = AES.new(key, AES.MODE_CBC, iv)

    decrypted_data = unpad(cipher.decrypt(encrypted_data), AES.block_size)

    # Save the decrypted file
    decrypted_filename = f"decrypted_{os.path.basename(file_path)}"
    decrypted_file_path = os.path.join(DECRYPTED_FOLDER, decrypted_filename)

    with open(decrypted_file_path, 'wb') as f:
        f.write(decrypted_data)

    return decrypted_file_path, decrypted_filename

@app.route('/')
def index():
    return jsonify({'message': 'Backend API is running'})

@app.route('/upload', methods=['POST'])
def upload_file():
    password = request.form.get('password')
    if 'file' not in request.files or not password:
        return jsonify({'error': 'Missing file or password'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file:
        filename = file.filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        encrypted_file_path, encrypted_filename = encrypt_file(file_path, password)
        
        # Clean up original uploaded file (optional, for security)
        os.remove(file_path)
        
        return jsonify({
            'message': 'File encrypted successfully',
            'encrypted_filename': encrypted_filename,
            'download_url': url_for('download_file', filename=encrypted_filename, _external=True)
        })

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(ENCRYPTED_FOLDER, filename)
    if os.path.exists(file_path):
        response = send_from_directory(ENCRYPTED_FOLDER, filename)
        # Force download by setting content-disposition header
        response.headers['Content-Disposition'] = f'attachment; filename={filename}'
        # Disable caching
        response.cache_control.no_cache = True
        response.cache_control.no_store = True
        response.cache_control.must_revalidate = True
        return response
    return jsonify({'error': 'File not found'}), 404

@app.route('/decrypt', methods=['POST'])
def decrypt_file_route():
    password = request.form.get('password')
    if 'file' not in request.files or not password:
        return jsonify({'error': 'Missing file or password'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file:
        filename = file.filename
        file_path = os.path.join(ENCRYPTED_FOLDER, filename)
        file.save(file_path)
        
        try:
            decrypted_file_path, decrypted_filename = decrypt_file(file_path, password)
            
            # Clean up uploaded encrypted file (optional)
            os.remove(file_path)
            
            return jsonify({
                'message': 'File decrypted successfully',
                'decrypted_filename': decrypted_filename,
                'download_url': url_for('download_decrypted_file', filename=decrypted_filename, _external=True)
            })
        except Exception as e:
            # Handle decryption errors (e.g., wrong password)
            return jsonify({'error': 'Decryption failed: ' + str(e)}), 400

@app.route('/decrypted/<filename>', methods=['GET'])
def download_decrypted_file(filename):
    file_path = os.path.join(DECRYPTED_FOLDER, filename)
    if os.path.exists(file_path):
        response = send_from_directory(DECRYPTED_FOLDER, filename)
        # Force download
        response.headers['Content-Disposition'] = f'attachment; filename={filename}'
        # Disable caching
        response.cache_control.no_cache = True
        response.cache_control.no_store = True
        response.cache_control.must_revalidate = True
        return response
    return jsonify({'error': 'File not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run on port 5000 for development