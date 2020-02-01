const userRouter = require('express').Router()
const userController = require('../controllers/user.controller')
const { check } = require('express-validator');



// ------- user routs ------------



userRouter.post('/register' ,[
    check('name', 'Name is required').not().isEmpty(),
    check('email').not().isEmpty().withMessage('please enter your email').isEmail().withMessage('Please include a valid email'),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], userController.register )

userRouter.post('/login' ,[
    check('email').not().isEmpty().withMessage('please enter your email').isEmail().withMessage('Please include a valid email'),
    check('password', 'Please enter your password').not().isEmpty()
] , userController.login )






module.exports = userRouter
