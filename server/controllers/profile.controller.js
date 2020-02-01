const Profile = require('../models/profile.model')
const { validationResult } = require('express-validator');

const profileController = {}

profileController.allProfiles = async (req,res,next)=>{
    try {
        const profiles = await Profile.find()
        if(!profiles){
            return res.send('No profiles created yet..add your information and be the first one')
        }
        res.send(profiles)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

profileController.getProfile = async (req,res,next)=>{
    const id = req.params.id
    try {
        const profile = await Profile.findById(id)
        res.send(profile)
    } catch (error) {
        next(error)
    }
}

profileController.me = async (req,res,next)=>{
    try {
        const profile = await Profile.findById(req.user._id)
        if(!profile){
            return res.send({ alret :'No profile created yet..add your information and create one'})
        }
        res.send(profile)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

profileController.add = async (req,res,next)=>{
    const prof = req.body
    prof._id = req.user._id
    prof.name = req.user.name
    const errors = validationResult(req)
    try {
        if(errors.array().length !== 0) {
            const err = errors.array()[0].msg
            throw new Error(err)
        }
        const profile = await Profile.findById(req.user._id)
        if(!profile){
            const newProfile = new Profile(prof)
            await newProfile.save()
            return res.send('the profile created successfully')
        }
        await Profile.updateOne({_id:req.user._id},{$set:prof})
        res.send('the profile updated successfully')
    } catch (error) {
        next(error)
    }
}

profileController.addExp = async(req,res,next)=>{
    const experience = req.body
    const errors = validationResult(req)
    try {
        if(errors.array().length !== 0) {
            const err = errors.array()[0].msg
            throw new Error(err)
        }        
        const profile = await Profile.findById(req.user._id)
        if(!profile){
            const newProfile = new Profile({_id:req.user._id , experience:experience})
            await newProfile.save()
            return res.send('the experience created successfully')
        }
        profile.experience.unshift(experience)
        await Profile.updateOne({_id:req.user._id},{$set:profile})
        res.send('the experience added successfully')
    } catch (error) {
        console.log(error);
        next(error)
    }
}

profileController.deleteExp = async(req,res,next)=>{
    const expId = req.params.expId
    try {
        const profile = await Profile.findById(req.user._id)
        const newExp = profile.experience.filter( exp => exp._id.toString() !== expId )
        profile.experience = newExp
        await Profile.updateOne({_id:req.user._id},{$set:profile})
        res.send('the experience deleted successfully')
    } catch (error) {
        console.log(error);
        next(error)
    }
}

profileController.addEduc = async(req,res,next)=>{
    const education = req.body
    const errors = validationResult(req)
    try {
        if(errors.array().length !== 0) {
            const err = errors.array()[0].msg
            throw new Error(err)
        }        
        const profile = await Profile.findById(req.user._id)
        if(!profile){
            const newProfile = new Profile({_id:req.user._id , education:education})
            await newProfile.save()
            return res.send('the education created successfully')
        }
        profile.education.unshift(education)
        await Profile.updateOne({_id:req.user._id},{$set:profile})
        res.send('the education added successfully')
    } catch (error) {
        console.log(error);
        next(error)
    }
}

profileController.deleteEduc = async(req,res,next)=>{
    const educId = req.params.educId
    try {
        const profile = await Profile.findById(req.user._id)
        const newEduc = profile.education.filter( educ => educ._id.toString() !== educId )
        profile.education = newEduc
        await Profile.updateOne({_id:req.user._id},{$set:profile})
        res.send('the education deleted successfully')
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = profileController