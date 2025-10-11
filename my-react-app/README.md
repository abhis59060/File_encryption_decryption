# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


<!-- my-react-app/
├── public/
│   ├── index.html
│   └── assets/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   │   └── Button.jsx          # shadcn/ui button component
│   │   ├── FileUploader/
│   │   │   └── FileUploader.jsx   # File upload input and validation UI
│   │   └── AuthForm/
│   │       ├── Login.jsx          # Login form component
│   │       └── Register.jsx       # Signup form component
│   │
│   ├── contexts/
│   │   └── AuthContext.js
│   │
│   ├── hooks/
│   │   └── useEncryption.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── styles/
│   │   ├── index.css
│   │   └── animations/
│   │       └── animations.css
│   │
│   ├── utils/
│   │   └── validators.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── vite-env.d.ts
│
├── tailwind.config.js
├── vite.config.js
├── jsconfig.json
├── package.json
└── README.md -->
