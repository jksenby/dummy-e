# Devopsizer  

**Devopsizer** is an Ionic-Electron-Angular application designed for the inventorization of projects and servers. This application allows users to efficiently manage and track their development and deployment environments.  

## Features  
- Inventory management for projects and servers  
- Cross-platform support (Web & Desktop && Mobile) using Electron and Angular  
- Seamless synchronization between Angular and Electron  
- Easy initialization and setup  

## Installation  

Before running the application, ensure you have **Node.js** and **npm** installed. Also, to start project in development mode you need to create `environment.development.ts` in the environments folder

### 1️⃣ Clone the repository  
```sh
git clone <repository-url>
cd Devopsizer
```

### 2️⃣ Install dependencies
```sh
npm install
npm install -g @ionic/cli
```

### 🔄 Sync Angular code with Electron
```sh
npm run sync
```

### ⚡ Initialize Electron code (ignore if electron folder exists)
```sh
npm run electron:add
```

### 🖥 Start the Electron application
```sh
npm run electron:open
```

### 🌐 Start the Angular web application
```sh
npm start
```