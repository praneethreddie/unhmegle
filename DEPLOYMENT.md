# Deployment Guide for unhmegle

This guide covers multiple deployment options to make your unhmegle application publicly accessible.

## Option 1: Render (Recommended - Free Tier Available)

Render is perfect for full-stack applications and offers a free tier.

### Backend Deployment on Render

1. **Create a Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `unhmegle-backend`
     - **Root Directory**: `server`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `node index.js`
     - **Plan**: Free

3. **Note the Backend URL**
   - After deployment, copy the URL (e.g., `https://unhmegle-backend.onrender.com`)

### Frontend Deployment on Render

1. **Update Socket URL**
   - Edit `client/src/services/socket.js`
   - Replace `SOCKET_URL` with your Render backend URL

2. **Deploy Frontend**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `unhmegle`
     - **Root Directory**: `client`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

3. **Access Your App**
   - Your app will be live at `https://unhmegle.onrender.com`

---

## Option 2: Vercel (Frontend) + Railway (Backend)

### Backend on Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Deploy Backend**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Configure:
     - **Root Directory**: `/server`
     - Railway auto-detects Node.js
   - Click "Deploy"

3. **Get Backend URL**
   - Go to Settings → Generate Domain
   - Copy the URL (e.g., `https://unhmegle-backend.up.railway.app`)

### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Update Socket URL**
   - Edit `client/src/services/socket.js`
   - Update `SOCKET_URL` with Railway backend URL

3. **Deploy Frontend**
   ```bash
   cd client
   vercel
   ```
   - Follow prompts
   - Choose project name: `unhmegle`
   - Deploy to production

---

## Option 3: Heroku (Full Stack)

### Prerequisites
```bash
npm install -g heroku
heroku login
```

### Backend Deployment

1. **Create Heroku App**
   ```bash
   cd server
   heroku create unhmegle-backend
   ```

2. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Deploy backend"
   heroku git:remote -a unhmegle-backend
   git push heroku main
   ```

3. **Note Backend URL**
   ```bash
   heroku open
   ```

### Frontend Deployment

1. **Update Socket URL** in `client/src/services/socket.js`

2. **Create Frontend App**
   ```bash
   cd client
   heroku create unhmegle-frontend
   ```

3. **Add Buildpack**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

4. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Deploy frontend"
   heroku git:remote -a unhmegle-frontend
   git push heroku main
   ```

---

## Option 4: DigitalOcean App Platform

1. **Create DigitalOcean Account**
   - Go to [digitalocean.com](https://www.digitalocean.com)

2. **Create App**
   - Click "Create" → "Apps"
   - Connect GitHub repository

3. **Configure Backend**
   - **Source Directory**: `server`
   - **Environment**: Node.js
   - **Build Command**: `npm install`
   - **Run Command**: `node index.js`
   - **HTTP Port**: 5000

4. **Configure Frontend**
   - Add another component
   - **Source Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`

5. **Deploy**
   - Click "Create Resources"

---

## Important Configuration Changes

### 1. Update CORS Settings

Edit `server/index.js`:
```javascript
const cors = require('cors');

app.use(cors({
    origin: [
        'https://your-frontend-domain.com',
        'http://localhost:5173' // for local development
    ],
    credentials: true
}));
```

### 2. Update Socket.io Configuration

In `server/index.js`:
```javascript
const io = new Server(server, {
    cors: {
        origin: [
            'https://your-frontend-domain.com',
            'http://localhost:5173'
        ],
        methods: ['GET', 'POST'],
        credentials: true
    }
});
```

### 3. Environment Variables

Create `.env` file in server directory:
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

Update `server/index.js`:
```javascript
require('dotenv').config();
const PORT = process.env.PORT || 5000;
```

### 4. Update Client Socket URL

Edit `client/src/services/socket.js`:
```javascript
const SOCKET_URL = import.meta.env.PROD 
    ? 'https://your-backend-domain.com'
    : 'http://localhost:5000';
```

---

## Cost Comparison

| Platform | Backend | Frontend | Total/Month |
|----------|---------|----------|-------------|
| **Render** | Free (750hrs) | Free | $0 |
| **Vercel + Railway** | $5 | Free | $5 |
| **Heroku** | $7 | $7 | $14 |
| **DigitalOcean** | $5 | Included | $5 |

---

## Recommended Setup (Free)

**Best Free Option: Render**

1. Deploy backend on Render (Free tier)
2. Deploy frontend on Render (Free tier)
3. Total cost: **$0/month**

**Limitations:**
- Backend sleeps after 15 min of inactivity (30s cold start)
- 750 hours/month free tier

---

## Post-Deployment Checklist

- [ ] Update `SOCKET_URL` in client code
- [ ] Configure CORS with production domains
- [ ] Set up environment variables
- [ ] Test video connections between different networks
- [ ] Monitor server logs for errors
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (usually automatic on platforms)
- [ ] Test on mobile devices

---

## Troubleshooting

### WebRTC Not Connecting
- Ensure HTTPS is enabled (required for WebRTC)
- Check STUN/TURN server configuration
- Verify firewall settings

### Socket.io Connection Issues
- Check CORS configuration
- Verify backend URL in client
- Check browser console for errors

### Backend Sleeping (Free Tier)
- Use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 5 minutes
- Upgrade to paid tier for always-on service

---

## Next Steps

1. Choose a deployment platform
2. Follow the specific guide above
3. Update configuration files
4. Deploy and test
5. Share your app! 🎉

For questions, check the platform-specific documentation or open an issue on GitHub.
