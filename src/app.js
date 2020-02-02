const express = require('express')
const route = express.Router()
const path = require('path')
const mongoURI = require('config').get('mongoURI')
const userRouter = require('../routes/user.routs')
const profileRouter = require('../routes/profile.routs')
const authRouter = require('../routes/authRouter')
const postRouter = require('../routes/posts.routs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')
const app = express()

// ------- config Mongo Data base --------------
// process.env.MONGODB_URI ||
mongoose.connect( process.env.MONGODB_URI || mongoURI , { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true } )
mongoose.connection.on('connected' , ()=>{console.log('Data base connected...')})
mongoose.connection.on('error' , ()=>{console.error('Couldnot connect to Data base...')})

// -------- Midelwaers--------
app.use(route);
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

// -------- Routers------------------
app.use('/api/users' , userRouter )
app.use( '/api' , authRouter )
app.use('/api/profile' , profileRouter )
app.use('/api/posts' , postRouter )

// -------- Errors------------------ throw err  or next(err) will deliver the error here



if(process.env.NODE_ENV === 'production'){
    app.use( express.static(path.join(__dirname, '../client' , 'build')) )

    app.get('*' , (req,res)=>{
    res.sendFile(path.join(__dirname , '../client' , 'build' , 'index.html' ))
})}

app.use((req,res,next)=>{
    var err = new Error('Not Found..')
    err.status = 404
    next(err)
})

app.use((err , req , res , next)=>{
    const status = err.status || 500
    const error = err.message || 'Faild for preccess your request'
    res.status(status).send({error})

})
module.exports = app