const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser"); // form data
const cookieParser = require("cookie-parser");
//const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stats", { useNewUrlParser: true, useUnifiedTopology: true });
// Define middleware here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cookieParser("SecretSecretSecret"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session({
      resave: true,
      saveUninitialized: true,
      secret: "SecretSecretSecret",
      cookie: {
          secure: false, // not using https
          maxAge: 1000 * 60 * 20 ,
      }, // two weeks in milliseconds
      store: new MongoStore({
          url: process.env.MONGODB_URI || "mongodb://localhost/stats",
          autoReconnect: true,
      }),
  })
);

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});