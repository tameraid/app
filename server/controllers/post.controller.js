const Post = require('../models/posts.model')
const { validationResult } = require('express-validator');

const postsController = {}

postsController.getAll = async(req,res,next)=>{
    try {
        const posts = await Post.find().sort({date : -1 }).lean(true)
        posts.map(post=>{
            post.auth_id = req.user._id  
        })
        res.send(posts)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

postsController.addPost = async(req,res,next)=>{
    const post = req.body
    post.user_id = req.user._id
    post.name = req.user.name
    post.date = new Date()
    const errors = validationResult(req)
    try {
        if(errors.array().length !== 0) {
            const err = errors.array()[0].msg
            throw new Error(err)
            }
        const newPost = new Post(post)
        await newPost.save()
        res.send('The post added successfully')
    } catch (error) {
        next(error)
    }
}

postsController.deletPost = async(req,res,next)=>{
    postId = req.params.postId
    try {
        await Post.findByIdAndDelete({_id : postId})
        res.send('The post deleted successfully')
    } catch (error) {
        next(error)
    }
}

postsController.addComment = async (req,res,next)=>{
    const errors = validationResult(req)
    const comment = req.body
    comment.date = new Date
    comment.user_id = req.user._id
    comment.name = req.user.name
    const postId = req.params.postId    
    try {
        if(errors.array().length !== 0) {
            const err = errors.array()[0].msg
            throw new Error(err)
            }        
        const post = await Post.findById(postId)
        console.log(post)

        post.comments.push(comment)

        await Post.updateOne({_id : postId} , { $set : post })
        res.send('the comment added successfully')
    } catch (error) {
        next(error)
    }
}

postsController.deletComment = async (req,res,next)=>{
    const postId = req.params.postId
    const commentId = req.params.commentId
    try {
        const post = await Post.findById(postId)        
        const newcomments = post.comments.filter( comment => comment._id.toString() !== commentId )
        post.comments = newcomments
        await Post.updateOne({_id : postId} , { $set : post })
        res.send('the comment deleted successfully')
    } catch (error) {
        next(error)
    }
}

postsController.Like = async (req,res,next)=>{
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId)
        const checkLike = post.likes.filter( like => like.user_id !== req.user._id )
        if(checkLike.length !== post.likes.length){
            post.likes = checkLike
            await Post.updateOne({_id : postId} , { $set : post })
            return res.send(false)
        }
        post.likes.unshift({user_id : req.user._id})
        await Post.updateOne({_id : postId} , { $set : post })
        return res.send(true)
    } catch (error) {
        next(error)
    }
}


module.exports = postsController