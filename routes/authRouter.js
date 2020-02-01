const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')

authRouter.all('*' , (req,res,next)=>{
    if(!req.headers.authorization){
           throw new Error('You not authoriazed to enter this page')
        }
    const webToken = req.headers.authorization.split(' ')[1]
    try {
        req.user = jwt.verify(webToken , 'tameraid')
    } catch (error) {
        const err = new Error('You not authoriazed to enter this page..Login agian')
        next(err)
    }
    return next()
})

authRouter.get('/auth' , (req,res,next)=>{
   req.user._id = req.user._id.toString() 
    res.send(req.user)
} )

module.exports = authRouter