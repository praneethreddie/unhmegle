<div align="center">

# 🎥 un<span style="color: #3b82f6;">h</span>megle

### *Talk to strangers, make friends.*

A modern, real-time video chat application inspired by Omegle, built with React, Node.js, and WebRTC.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://uhmegle-e1kz.onrender.com/)
[![GitHub](https://img.shields.io/badge/github-repo-blue?style=for-the-badge&logo=github)](https://github.com/praneethreddie/unhmegle)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

[Live Demo](https://uhmegle-e1kz.onrender.com/) • [Report Bug](https://github.com/praneethreddie/unhmegle/issues) • [Request Feature](https://github.com/praneethreddie/unhmegle/issues)

</div>

---

## 🌟 Features

<table>
<tr>
<td>

### 🎬 **Video Chat**
Connect with random strangers instantly via WebRTC with crystal-clear video quality

</td>
<td>

### 👥 **Smart Matching**
Gender-based matchmaking that prioritizes opposite-gender connections

</td>
</tr>
<tr>
<td>

### 💬 **Real-Time Chat**
Send text messages during video calls with beautiful overlay notifications

</td>
<td>

### 🎨 **Stunning UI**
Dynamic Three.js shader animation background with modern dark theme

</td>
</tr>
<tr>
<td>

### 📱 **Mobile Ready**
Fully responsive design optimized for both desktop and mobile devices

</td>
<td>

### ⚡ **Fast & Smooth**
Trickle ICE for instant connections and glassmorphism effects

</td>
</tr>
</table>

---

## 🚀 Live Demo

**Try it now:** **[https://uhmegle-e1kz.onrender.com/](https://uhmegle-e1kz.onrender.com/)**

> ⚠️ **Note:** Hosted on Render's free tier. First connection after 15 min of inactivity may take ~30 seconds to wake up the server.

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

### WebRTC
![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white)
![Simple Peer](https://img.shields.io/badge/Simple_Peer-FF6B6B?style=for-the-badge)

</div>

---

## 📁 Project Structure

```
unhmegle/
├── 📂 client/                      # Frontend React application
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📄 Landing.jsx      # Landing page with gender selection
│   │   │   ├── 📄 VideoRoom.jsx    # Main video chat interface
│   │   │   └── 📂 ui/
│   │   │       └── 📄 ShaderAnimation.jsx  # Three.js background
│   │   ├── 📂 services/
│   │   │   └── 📄 socket.js        # Socket.io client config
│   │   ├── 📄 App.jsx              # Main app component
│   │   ├── 📄 main.jsx             # Entry point
│   │   └── 📄 index.css            # Global styles
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   └── 📄 tailwind.config.js
│
└── 📂 server/                      # Backend Node.js server
    ├── 📄 index.js                 # Express + Socket.io server
    ├── 📄 matchmaker.js            # Matchmaking algorithm
    └── 📄 package.json
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser (Chrome/Edge recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/praneethreddie/unhmegle.git
   cd unhmegle
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running Locally

**Terminal 1 - Backend:**
```bash
cd server
node index.js
```
🟢 Server running on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
🟢 Client running on `http://localhost:5173`

---

## 🌐 Deployment

### Deploy to Render (Free)

#### 1️⃣ Deploy Backend

1. Create account at [render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   ```
   Name: unhmegle
   Root Directory: server
   Build Command: npm install
   Start Command: node index.js
   Instance Type: Free
   ```
5. Copy your backend URL (e.g., `https://unhmegle.onrender.com`)

#### 2️⃣ Update Frontend Configuration

Edit `client/src/services/socket.js`:
```javascript
const SOCKET_URL = 'https://your-backend-url.onrender.com';
```

Commit and push:
```bash
git add .
git commit -m "Update socket URL for production"
git push origin main
```

#### 3️⃣ Deploy Frontend

1. Click **New +** → **Static Site**
2. Connect your GitHub repository
3. Configure:
   ```
   Name: unhmegle-frontend
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```
4. Click **Create Static Site**

🎉 **Your app is live!**

> 📚 For more deployment options (Vercel, Railway, Heroku), see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎯 Features in Detail

### 🔄 Matchmaking Algorithm
- Prioritizes opposite-gender matches
- Falls back to any available user if no opposite-gender match found
- Real-time queue management with instant notifications

### 🌐 WebRTC Configuration
- **STUN Servers** for NAT traversal
- **Trickle ICE** for faster peer connections
- **Automatic reconnection** on network changes

### 🎨 UI/UX Highlights
- **Shader Animation**: Dynamic Three.js background on landing page
- **Radar Loader**: Animated search indicator
- **Message Overlay**: Temporary chat notifications over video
- **Responsive Design**: Mobile-optimized split-screen layout
- **Modern Chat**: iMessage-style chat bubbles with smooth animations

---

## 🌍 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ Recommended |
| Firefox | ✅ Full Support |
| Safari | ⚠️ Limited WebRTC |
| Opera | ✅ Full Support |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🔨 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [Omegle](https://www.omegle.com/)
- Built with modern web technologies
- Shader animation adapted from [Three.js examples](https://threejs.org/examples/)
- Icons from [Lucide React](https://lucide.dev/)

---

## 📧 Contact

**Praneeth Reddy Vallem**

📧 Email: [praneethreddyvallem@gmail.com](mailto:praneethreddyvallem@gmail.com)

🐙 GitHub: [@praneethreddie](https://github.com/praneethreddie)

🔗 **Project Link:** [https://github.com/praneethreddie/unhmegle](https://github.com/praneethreddie/unhmegle)

🌐 **Live Demo:** [https://uhmegle-e1kz.onrender.com/](https://uhmegle-e1kz.onrender.com/)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by [Praneeth Reddy Vallem](https://github.com/praneethreddie)

</div>
