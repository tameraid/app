const mongoose = require('mongoose')

const PostsSchema = mongoose.Schema({
    user_id : String ,
    name : String ,
    text : String ,
    date : Date ,
    likes : [
       { user_id : String} 
    ],
    comments : [{
        user_id : String,
        name : String ,
        text : String ,
        date : Date 
    }]
})

module.exports = mongoose.model('Post' , PostsSchema)