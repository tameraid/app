const express = require('express')


const app = require('./src/app')


const PORT = 5000
// process.env.PORT
app.listen( PORT , ()=>console.log('Server running at port 5000...'))