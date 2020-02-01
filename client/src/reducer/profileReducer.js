export const intiProfileState = {
    name : '' ,
    professional : '' ,
    company : '' ,
    website : '' ,
    location : '' ,
    experience : [{
        jobTitle : '' ,
        company : '' ,
        describtion : '',
        from : '' ,
        to : ''
    }],
    education : [{
        school : '' ,
        degree : '' ,
        describtion : '',
        from : '' ,
        to : ''
    }],
    bio : '' ,
    social : {
        youtube : '',
        facebook : '',
        twitter : '',
        instgram : ''
    }
}

export const profile_reducer = ( profileState , action )=>{

    switch (action.type) {
        case 'PROFILE_LOADED':
            return ({ ...profileState , ...action.profile})
        case 'EXP_LOADED':
            profileState.experience.unshift(action.profile)
            return ({ ...profileState })
        case 'EDUC_LOADED':
                profileState.education.unshift(action.profile)
                return ({ ...profileState })  
        case 'EXP_DELETE':
            console.log('testing')
           return profileState                  
        default:
            return profileState
    }
}