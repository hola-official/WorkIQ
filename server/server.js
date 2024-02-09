const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
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


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing

app.use(express.json({ limit: "50mb" })); //parse json data inside the req body
app.use(express.urlencoded({ extended: true })); // parse form data inside the req body
app.use(cors(corsOptions));
app.use(cookieParser());

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

app.get("/", (req, res) => {
  res.send("Home Page");
});


app.use(passport.initialize());
app.use(passport.session());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(PORT, () => console.log(`Server Is 🏃‍♂️ On ` + PORT));
	})
	.catch((err) => console.log(err));
