🧾 SQATE Tools – Desktop App (React + TypeScript + Tailwind + Electron)
A cross-platform desktop application for SQATE-related tooling, built using React, TypeScript, Tailwind CSS, and Electron.

📦 Installation
 
  npm install

🚀 Development
Start the React development server:

npm start

🖥️ Launch Desktop App (Electron)
Build the React app and run it with Electron:

npm run desktop

🏗️ Build for Distribution
Install Electron Packager (if not already):

npm install --save-dev electron-packager

⚙️ Scripts in package.json:
 
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "electron": "electron public/electron.js",
  "desktop": "npm run build && npm run electron",
  "package:win": "electron-packager . sqate-tools --platform=win32 --arch=x64 --out=dist --overwrite",
  "package:mac": "electron-packager . sqate-tools --platform=darwin --arch=x64 --out=dist --overwrite",
  "package:linux": "electron-packager . sqate-tools --platform=linux --arch=x64 --out=dist --overwrite"
}

📁 All built packages will be placed in the dist/ directory.

🧪 Run Packaging Commands

🔹 Windows (.exe): 
    
    npm run package:win

🔸 macOS (.dmg): 
    
    npm run package:mac

🟢 Linux (.AppImage or executable folder):
    
    npm run package:linux

⚠️ On Windows, you can only build for Windows by default.
To build for macOS or Linux, you must do it from that OS or use Docker/CI environments.

📁 File Structure
sqate-tools/
├── public/
│   └── electron.js          # Electron app entry point
├── src/                     # React + TS source
├── dist/                    # Packaged desktop apps
├── build/                   # React production build
├── package.json
├── tsconfig.json
└── tailwind.config.js


✅ Requirements

Node.js v18.x (recommended)
Electron
Tailwind CSS
TypeScript
Electron Packager

