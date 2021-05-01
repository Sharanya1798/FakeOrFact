const Router = require("express").Router();
const {signup, singin, raiseQuery, allQueries, myQueries} = require("../controllers/Auth");


Router.post("/signin",singin);

Router.post("/signup",signup);
Router.post("/raiseQuery", raiseQuery);
Router.post("/discussions", allQueries);
Router.post("/myDiscussions", myQueries);

module.exports = Router;