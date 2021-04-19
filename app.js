const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/Users");
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/Passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/users/register")
const port = 3000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server is started and running on port ${port} !`));