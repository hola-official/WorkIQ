const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Set up MongoDB store
const store = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: "sessions",
	expires: 1 * 60 * 60, // 1hr in seconds
});

// Use express-session middleware
app.use(
	session({
		secret: process.env.JWT_SECRET, // Change this to a secure secret key
		resave: true,
		saveUninitialized: false,
		store: store, // Use MongoDB store
		cookie: {
			maxAge: 1 * 60 * 60 * 1000, // 1hr in milliseconds,
			secure: true, // Set to true if using HTTPS
			sameSite: "none",
		},
	})
);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(PORT, () => console.log(`Server Is 🏃‍♂️ On PORT ${PORT}`));
	})
	.catch((err) => console.log(err));
