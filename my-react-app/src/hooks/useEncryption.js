import { useState } from 'react';

// Convert string to ArrayBuffer
function strToBuf(str) {
  return new TextEncoder().encode(str);
}

// Convert ArrayBuffer to Base64 string
function bufToBase64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Convert Base64 string to ArrayBuffer
function base64ToBuf(base64) {
  const binary = window.atob(base64);
  const buf = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buf[i] = binary.charCodeAt(i);
  }
  return buf.buffer;
}

// Derive CryptoKey from password and salt using PBKDF2
async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export function useEncryption() {
  const [error, setError] = useState(null);

  // Encrypt file data (ArrayBuffer) with password using AES-GCM
  const encrypt = async (fileBuffer, password) => {
    try {
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(password, salt);

      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        fileBuffer
      );

      return {
        salt: bufToBase64(salt.buffer),
        iv: bufToBase64(iv.buffer),
        data: bufToBase64(encryptedBuffer),
      };
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // Decrypt encrypted data object with password
  const decrypt = async (encryptedObj, password) => {
    try {
      const salt = base64ToBuf(encryptedObj.salt);
      const iv = base64ToBuf(encryptedObj.iv);
      const encryptedData = base64ToBuf(encryptedObj.data);
      const key = await deriveKey(password, new Uint8Array(salt));

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(iv) },
        key,
        encryptedData
      );

      return decryptedBuffer; // Returns decrypted ArrayBuffer
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return { encrypt, decrypt, error };
}
