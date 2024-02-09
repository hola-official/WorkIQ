// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

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

// Middleware for parsing JSON data in request body
app.use(express.json({ limit: "50mb" }));

// Middleware for parsing URL-encoded data in request body
app.use(express.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing (CORS) with custom options
app.use(cors(corsOptions));

// Middleware for parsing cookies
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

// Define a route for the home page
app.get("/", (req, res) => {
    res.send("Home Page");
});

// Initialize Passport authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // Start the server and listen for incoming connections
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
		