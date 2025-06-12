# 🧾 SQATE Tools – Desktop App
A cross-platform desktop application designed to support SQATE tooling modules.
It provides an interactive interface for various testing and automation tasks.

## Essential Links

> ⚠️ **Please do not remove or modify this section.**  
> It contains valuable resources that will be helpful for future students.

### Documentation

The documentation for the project is in [Microsoft Loop](https://stuconestogacon.sharepoint.com/:fl:/g/contentstorage/CSP_b962f780-af09-442b-aad9-5bfca98e6e35/EaBZj2i9JqxCqmICZIh42kgBLrf0mtydOh94-W6v2RrB9Q?e=5kURPx&nav=...)

With the above link, you will be able to see the Home page.  
To gain access, you must ask one of the Admins for access.

Please contact [Andy Chow](mailto:achow@conestogac.on.ca) or [Priya Manimaran](mailto:pmanimaran@conestogac.on.ca)

### Objective, Key Results (OKR)

This is worth a mention as it is one of the main ways that we will be tracking outcomes and evaluation.  
The OKRs are located in **Microsoft Loop** as well.  
As soon as you gain access to the Documentation, you will be able to see this under the subpage called **OKR**.

### Product Roadmap

This is worth a mention as it is one of the main ways that we will be tracking outcomes and evaluation.  
The Product Roadmap is located in **Microsoft Loop** as well.  
As soon as you gain access to the Documentation, you will be able to see this under the subpage called **Product Roadmap**.

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
For macOS:
⚠️ Note: These commands must be run on macOS. They are not supported on iOS devices (iPhone/iPad).
```bash
npm run build && npm run package:mac
```

---
## 🖥️ Launch Desktop App (Production Build)
Once packaged, you can launch the app by running the generated executable directly from the **out/ folder**.

⚠️ This assumes Vite’s dist/ folder is correctly built.
