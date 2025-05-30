
# 🧾 SQATE Tools – Desktop App

> ⚠️ **Important:** You must have **Node.js v18.x (LTS)** installed to run this project.
> This is required before executing any commands.

A cross-platform desktop application for SQATE tooling, built using React, TypeScript, Tailwind CSS, and Electron.

---
## ✅ Requirements
- Node.js v18.x (LTS recommended)
---

# 📅 Centralized Evaluation Calendar

A desktop application built with **React**, **TypeScript**, and **Electron** that allows instructors to upload CSV files containing evaluation data and visualize them on a calendar. Designed to increase evaluation visibility and awareness.

---

## 🚀 Features

- Upload CSV files to visualize evaluations
- Interactive calendar view using `react-big-calendar`
- Real-time CSV parsing and display
- Error handling for invalid or missing data
- Modular, scalable architecture (planned extensibility for conflict detection and reports)

---

## 🛠️ Tech Stack

| Category         | Technology                           |
| ---------------- | ------------------------------------- |
| Language         | [TypeScript](https://www.typescriptlang.org/) |
| UI Framework     | [React](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/) |
| Desktop Runtime  | [Electron](https://www.electronjs.org/) |
| Calendar Library | [React Big Calendar](https://github.com/jquense/react-big-calendar) |
| CSV Parser       | [PapaParse](https://www.papaparse.com/) |
| Testing          | [Jest](https://jestjs.io/) |


## 📦 Installation
```bash
npm  install
```
---
## 🚀 Development
Start the React development server:
```bash
npm  start
```
---

## 🖥️ Launch Desktop App (Electron)
Build the React app and run it with Electron:
```bash
npm  run  desktop
```
---