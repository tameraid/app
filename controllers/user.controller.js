const User = require('../models/users.models')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

const userController = {}

userController.register = async (req,res,next)=>{
    const { name , email , password , password2 } = req.body
    const errors = validationResult(req)
    try {
        if(errors.array().length !== 0) {
            const err = errors.array()[0].msg
            throw new Error(err)
        }
        const user = await User.findOne({email})
        if(user){
            throw  new Error('The Email already excits')
        }
        const newUser = new User({name , email , password : User().hashpassword(password)})
        await newUser.save()
        const webToken = jwt.sign({_id : newUser._id , name : name } , 'tameraid' , {expiresIn : '2h'})
        res.send(webToken)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

userController.login = async (req,res,next)=>{
    const {email , password} = req.body
    const errors = validationResult(req)
    try {
        if(errors.array().length !== 0) {
            const err = errors.array()[0].msg
            throw new Error(err)
        }
        const user = await User.findOne({email})
        if(!user){
            throw new Error('This email not register yet')
        }
        if (!user.comparePassword(password)){
            throw new Error('The Password is incorrect')
        }
        const webToken = jwt.sign({_id : user._id , name : user.name } , 'tameraid' , {expiresIn : '1h'})
        res.send(webToken)
    } catch (error) {
        next(error)
    }
}


module.exports = userController