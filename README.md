# File Encryption & Decryption

A full-stack web application that provides secure file encryption and decryption services with user authentication and an intuitive user interface.

## 🎯 Features

- 🔐 **Secure File Encryption/Decryption** - AES encryption using PyCryptodome
- 👤 **User Authentication** - Registration and login system
- 📁 **File Upload** - Upload and manage encrypted files
- 🎨 **Modern UI** - Built with React, Vite, and Tailwind CSS
- ⚡ **Fast Performance** - Optimized with Vite and lazy loading
- 🔄 **CORS Enabled** - Seamless frontend-backend communication
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 📋 Project Structure

```
File_encryption_decryption/
├── backend/                    # Python Flask backend
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt        # Python dependencies
│   ├── .env                   # Environment variables
│   └── README.md              # Backend setup guide
│
├── my-react-app/              # React + Vite frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # UI components (Button, etc.)
│   │   │   ├── FileUploader/ # File upload component
│   │   │   └── AuthForm/     # Login/Register forms
│   │   ├── contexts/         # React Context API
│   │   │   └── AuthContext.js
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useEncryption.js
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/         # API services
│   │   │   └── api.js
│   │   ├── styles/           # CSS files
│   │   │   └── animations/
│   │   ├── utils/            # Utility functions
│   │   │   └── validators.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/               # Static files
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file:**
   ```bash
   touch .env
   ```
   Add the following environment variables:
   ```
   FLASK_ENV=development
   FLASK_DEBUG=True
   SECRET_KEY=your_secret_key_here
   ```

5. **Run the backend server:**
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd my-react-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (if needed):**
   ```bash
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🔧 Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Flask | 3.0.3 | Web framework |
| Flask-CORS | 4.0.1 | Handle CORS requests |
| pycryptodome | 3.20.0 | Encryption/Decryption |
| python-dotenv | 1.0.1 | Environment variables |

## 📦 Frontend Dependencies

### Key Libraries
- **React** (^19.1.1) - UI library
- **Vite** (^7.1.7) - Build tool
- **Tailwind CSS** (^4.1.14) - Styling
- **React Router DOM** (^7.9.3) - Routing
- **Axios** (^1.12.2) - HTTP client
- **Framer Motion** (^12.23.22) - Animations
- **Three.js** (^0.180.0) - 3D graphics
- **Lucide React** (^0.544.0) - Icons

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### File Operations
- `POST /api/files/encrypt` - Encrypt a file
- `GET /api/files/decrypt/:id` - Decrypt a file
- `GET /api/files` - Get user's files
- `DELETE /api/files/:id` - Delete a file

## 🔐 Security Features

- Password hashing for user accounts
- AES encryption for file security
- CORS enabled for secure cross-origin requests
- Environment variables for sensitive data
- Input validation on both frontend and backend

## 🛠️ Available Scripts

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend Scripts
```bash
python app.py                    # Run Flask server
python -m flask shell            # Interactive shell
python -m pytest                 # Run tests (if configured)
```

## 📝 Environment Variables

### Backend (`.env`)
```
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your_secret_key_here
DATABASE_URL=sqlite:///database.db
```

### Frontend (`.env`)
```
VITE_API_BASE_URL=http://localhost:5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### Backend Issues
- **Port already in use:** Change Flask port in `app.py`
- **Module not found:** Ensure virtual environment is activated and dependencies installed
- **CORS errors:** Verify Flask-CORS is installed and properly configured

### Frontend Issues
- **Port already in use:** Vite will use next available port
- **Module not found:** Clear `node_modules` and reinstall with `npm install`
- **API connection errors:** Check if backend is running and `VITE_API_BASE_URL` is correct

## 📞 Support

For support, please open an issue on the GitHub repository.

## 🔗 Links

- [GitHub Repository](https://github.com/abhis59060/File_encryption_decryption)
- [React Documentation](https://react.dev)
- [Flask Documentation](https://flask.palletsprojects.com)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated:** May 1, 2026
