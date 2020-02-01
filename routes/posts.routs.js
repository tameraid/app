const postRouter = require('express').Router()
const postsController = require('../controllers/post.controller')
const { check } = require('express-validator')

postRouter.get('/' , postsController.getAll )

postRouter.post('/add' , [
    check('text' , 'pleaser enter your post text first').not().isEmpty()
] , postsController.addPost )

postRouter.delete('/delete/:postId' , postsController.deletPost )

postRouter.post('/add_comment/:postId' , [
    check('text' , 'pleaser enter your comment text first').not().isEmpty()
] , postsController.addComment )

postRouter.delete('/delete_comment/:postId/:commentId' , postsController.deletComment )

postRouter.post('/like/:postId' , postsController.Like )


module.exports = postRouter