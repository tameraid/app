const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    _id : String,
    name : String ,
    professional : String ,
    company : String ,
    website : String ,
    location : String ,
    experience : [{
        id : String,
        jobTitle : String ,
        company : String ,
        describtion : String,
        from : Date ,
        to : Date
    }],
    education : [{
        id : String,
        school : String ,
        degree : String ,
        describtion : String,
        from : Date ,
        to : Date
    }],
    bio : String ,
    social : {
        youtube : String,
        facebook : String,
        twitter : String,
        instgram : String
    }
})

module.exports = mongoose.model('Profile' , profileSchema)