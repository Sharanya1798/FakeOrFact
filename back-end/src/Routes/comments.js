const router = require('express').Router();
const Comment = require('../models/comment');
const verify = require('./verifyToken'); 
const logger = require("../../logger/loggerConfig");

router.get('/getComments' , (req,res) => {
    const post_ID = req.header('auth-header');
    Comment.find({"query": post_ID})
        .populate('user')
        .sort({'createdAt':-1})
        .then(comments => {
            logger.info("message from winston : Comments are retrieved successfully for ",{ message: post_ID } );
            res.json(comments)
        })
        .catch(err => res.status(400).json('Error' + err));
});

router.post('/add', verify,async (req,res) => {

    const comment = new Comment({

        user : req.user.id,
        query: req.body.post_ID,
        content: req.body.comment.content
    });
    try {
        const savedComment = await comment.save();
        const savedCommentWithUserData = await Comment.findById(savedComment._id).populate('user');
        logger.info("message from winston : Comments has been added successfully for post ",{ message: post_ID } );
        res.send(savedCommentWithUserData); 
    }catch(err){
        logger.error("message from winston : Some error occured" );
        res.status(400).send(err);
    }
})

router.put('/update/', verify, async (req,res) => {
    
    try {
        await Comment.findByIdAndUpdate(req.body._id, { upvotes : req.body.upvotes, downvotes: req.body.downvotes });
        logger.info("message from winston : Comments has beed updated successfully with upvote/downvote for ",{ message: post_ID } );
        res.send({ "success": true });
    }catch(err){
        logger.error("message from winston : Some error occured");
        res.status(400).send(err);
    }
})


module.exports = router;