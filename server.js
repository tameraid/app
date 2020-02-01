const express = require('express')


const app = require('./src/app')

// app.use( express.static('client/build') )

// app.get('*' , (req,res)=>{
//     res.sendFile(path.resolve(__dirname , 'client' , 'index.html' ))
// } )

const PORT = process.env.PORT || 5000

app.listen( PORT , ()=>console.log('Server running at port 5000...'))