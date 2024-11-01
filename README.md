# WorkIQ - Empowering Global Freelancers

WorkIQ is a decentralized freelancing platform that bridges payment barriers through hybrid payment solutions, combining traditional payment methods with blockchain technology.

## 💻 Tech Stack

### Frontend
- React.js with Vite
- Web3.js for blockchain integration
- Firebase Authentication
- Stream.io for real-time features
- Stripe Payment Integration

### Backend
- Node.js & Express.js
- MongoDB Atlas
- JWT Authentication
- Google OAuth
- Cloudinary for file storage
- Celo Blockchain Integration

## 🛠️ Installation

1. Clone the repository
```bash
git clone https://github.com/hola-official/workiq.git
cd workiq
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Set up environment variables

```bash
# Cleints .env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTHDOMAIN=your_firebase_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STREAM_API_KEY=your_stream_api_key
VITE_SERVER_BASE_URL=http://localhost:3000
VITE_STRIPE_KEY=your_stripe_public_key
VITE_BASE_URL=http://localhost:3000/
VITE_CHAIN_ID=44787

# Server .env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACTIVATION_SECRET=your_activation_secret
SESSION_SECRET=your_session_secret

# Stream Configuration
STREAM_APP_ID=your_stream_app_id
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Configuration
EMAIL=your_email
PASSWORD=your_email_app_password

# Stripe Configuration
STRIPE_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Application URLs
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=your_admin_email

# Blockchain Configuration
CELO_WEBSOCKET_URL=wss://alfajores-forno.celo-testnet.org/ws
PRIVATE_KEY=your_private_key
```

4. Run the application
```bash
# Run backend (from server directory)
npm run dev

# Run frontend (from clients directory)
npm run dev
```

## 🌐 Features & Functionality

### Authentication
- Firebase Authentication
- Google OAuth Integration
- JWT Token Management
- Email Verification

### Payment Systems
- Stripe Integration for Traditional Payments
- Celo Blockchain Integration (Testnet)
- USDC Token Support
- Webhook Handling

### Real-time Features
- Stream.io Integration
- Real-time Messaging

### File Management
- Cloudinary Integration
- Secure File Upload
- Image Optimization

### Blockchain Features
- Celo Testnet Integration (Chain ID: 44787)
- Smart Contract Interaction
- Cryptocurrency Payments

## 🔐 Security Configuration

Create a `.gitignore` file in both frontend and backend directories:

```bash
# .gitignore
.env
node_modules/
dist/
build/
.DS_Store
*.log
```

## 🚀 Deployment

### Frontend Deployment
- Configure Firebase hosting
- Update environment variables for production
- Set up HTTPS and custom domain

### Backend Deployment
- Set up MongoDB Atlas production cluster
- Configure environment variables
- Set up SSL certificates
- Configure CORS policies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Project Link: [https://github.com/hola-official/workiq](https://github.com/hola-official/workiq)  
Email: [infoworkiq@gmail.com](mailto:infoworkiq@gmail.com)
