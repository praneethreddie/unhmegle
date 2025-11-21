# unhmegle

A modern, real-time video chat application inspired by Omegle, built with React, Node.js, and WebRTC.

## 🌐 Live Demo

**Try it now:** [https://uhmegle-e1kz.onrender.com/](https://uhmegle-e1kz.onrender.com/)

> **Note:** The app is hosted on Render's free tier. If inactive for 15 minutes, the backend may take ~30 seconds to wake up on first connection.

## Features

- **Random Video Chat**: Connect with strangers instantly via WebRTC
- **Gender-Based Matching**: Prioritizes opposite-gender matches
- **Real-Time Text Chat**: Send messages during video calls with overlay notifications
- **Stunning UI**: Features a dynamic Three.js shader animation background
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Modern Design**: Dark theme with glassmorphism effects and smooth animations

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Socket.io Client** - Real-time communication
- **Simple Peer** - WebRTC wrapper
- **Three.js** - 3D shader animations
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Socket.io** - WebSocket server
- **CORS** - Cross-origin resource sharing

## Project Structure

```
unhmegle/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.jsx          # Landing page with gender selection
│   │   │   ├── VideoRoom.jsx        # Main video chat interface
│   │   │   └── ui/
│   │   │       └── ShaderAnimation.jsx  # Three.js background
│   │   ├── services/
│   │   │   └── socket.js            # Socket.io client configuration
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/                 # Backend Node.js server
    ├── index.js            # Express + Socket.io server
    ├── matchmaker.js       # Matchmaking algorithm
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

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

## Running Locally

### Start the Backend Server
```bash
cd server
node index.js
```
The server will run on `http://localhost:5000`

### Start the Frontend Development Server
   ```

2. **Start Backend Tunnel**
   ```bash
   cloudflared tunnel --url http://localhost:5000 > backend_tunnel.log 2>&1 &
   ```

3. **Start Frontend Tunnel**
   ```bash
   cloudflared tunnel --url http://localhost:5173 > frontend_tunnel.log 2>&1 &
   ```

4. **Update Socket URL**
   - Copy the backend tunnel URL from `backend_tunnel.log`
   - Update `SOCKET_URL` in `client/src/services/socket.js`

## Features in Detail

### Matchmaking Algorithm
- Prioritizes opposite-gender matches
- Falls back to any available user if no opposite-gender match is found
- Real-time queue management

### WebRTC Configuration
- STUN servers for NAT traversal
- Trickle ICE for faster connections
- Automatic peer connection management

### UI/UX Highlights
- **Shader Animation**: Dynamic Three.js background on landing page
- **Radar Loader**: Animated search indicator
- **Message Overlay**: Temporary chat notifications over video
- **Responsive Design**: Mobile-optimized split-screen layout
- **Modern Chat**: iMessage-style chat bubbles

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari (limited WebRTC support)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning or building your own applications.

## Acknowledgments

- Inspired by Omegle
- Built with modern web technologies
- Shader animation adapted from Three.js examples

## Contact

For questions or feedback, please open an issue on GitHub.
