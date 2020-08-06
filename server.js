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

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stats", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
useFindAndModify: false, });
// Define middleware here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cookieParser("SecretSecretSecret"));

app.use(
  session({
      resave: true,
      saveUninitialized: true,
      secret: "SecretSecretSecret",
      cookie: {
          secure: false,
          maxAge: 1000 * 60 * 120 ,
      },
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

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});