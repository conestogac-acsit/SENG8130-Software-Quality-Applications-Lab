
# 🧾 SQATE Tools – Desktop App

A cross-platform desktop application for SQATE tooling, built using React, TypeScript, Tailwind CSS, and Electron.

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
Start only React(Vite) Only:

```bash
vite
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
## 📦 Build:
Build React App: 

```bash
npm run build
```
---
## 🖥️ Launch Desktop App (Production Build)
After building with npm run build, run the production Electron app:

```bash
npm start
```
⚠️ This assumes Vite’s dist/ folder is correctly built.
