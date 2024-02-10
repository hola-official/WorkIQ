// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
// const proposalRoutes = require("./routes/proposalRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
// const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require("./routes/authRoutes");
// const DeleteTaskJob = require("./db/deleteJobs");

// Load environment variables from .env file
dotenv.config();

// Set port number, defaulting to 3000 if not specified in environment variables
const PORT = process.env.PORT || 3000;

// Create an instance of Express application
const app = express();

// Set up MongoDB session store
const store = new MongoDBStore({
    uri: process.env.MONGO_URI, // MongoDB connection URI
    collection: "sessions", // Collection to store sessions
    expires: 1 * 60 * 60, // Session expiration time in seconds (1 hour)
});

// Middleware to handle options credentials check and fetch cookies credentials requirement
app.use(credentials);
app.use(bodyParser.json());

// Middleware for parsing JSON data in request body
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Set up express-session middleware for session management
app.use(
    session({
        secret: process.env.JWT_SECRET, // Secret key used to sign the session ID cookie
        resave: true, // Forces session to be saved even if not modified
        saveUninitialized: false, // Prevents saving uninitialized sessions
        store: store, // Use MongoDB store for session storage
        cookie: {
            maxAge: 1 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 hour)
            secure: true, // Set to true if using HTTPS
            sameSite: "none", // Enforces same-site cookie attribute for CSRF protection
        },
    })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
// app.use("/api/proposals", proposalRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/auth", authRoutes);
// app.use('/api/admin', adminRoutes);

// Initialize Passport authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            // Start the task deletion job
            // DeleteTaskJob.start();
        });
    })
    .catch((error) =>
        console.error("Error connecting to MongoDB:", error.message)
    );
