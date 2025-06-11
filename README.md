# 🧾 SQATE Tools – Desktop App
A cross-platform desktop application designed to support SQATE tooling modules.
It provides an interactive interface for various testing and automation tasks.

---
## ✅ Requirements
- Node.js @ LTS
---
## 📦 Installation
```bash
npm  install
```

---
## 🚀 Development
Start both React (Vite) and Electron in development mode:

```bash
npm run dev
```
Start only Electron Dev with live reload (after Vite is running):

```bash
npm run electron:dev
```
---
## 🧪 Run Tests
```bash
npm run test
```
---
## 🧹 Code Linting

To run lint checks across the project:

```bash
npm run lint
```
---
## 📦 Build & Package (Production):
To prepare the app for production, first build and then package the Electron app into a standalone executable:

For Windows:
```bash
npm run build && npm run package
```
For Mac/iOS:
```bash
npm run build
npm run package:mac
```
---
## 🖥️ Launch Desktop App (Production Build)
Once packaged, you can launch the app by running the generated executable directly from the out/ folder.

⚠️ This assumes Vite’s dist/ folder is correctly built.
