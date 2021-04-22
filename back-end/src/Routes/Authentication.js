const Router = require("express").Router();
const {signup, singin} = require("../controllers/Auth");


Router.post("/signin",singin);

Router.post("/signup",signup);

module.exports = Router;