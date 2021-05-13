const Router = require("express").Router();
const {signup, singin, raiseQuery, allQueries, myQueries, deletePost} = require("../controllers/Auth");


Router.post("/signin",singin);

Router.post("/signup",signup);
Router.post("/raiseQuery", raiseQuery);
Router.post("/discussions", allQueries);
Router.post("/myDiscussions", myQueries);
Router.post("/deletePost", deletePost)

module.exports = Router;