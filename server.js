const express = require('express')
const path = require('path')


const app = require('./src/app')


const PORT = process.env.PORT || 5000
// process.env.PORT
app.listen( PORT , ()=>console.log('Server running at port 5000...'))