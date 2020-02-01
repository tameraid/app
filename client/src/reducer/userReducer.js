
export const inituserState = {
    loading : false ,
    isAuth : null ,
    user : {
        _id : '',
        name : '' 
    } ,
    token : '',
    alretMsg : null ,
    alretColor : '' ,
    logout : false
}

export const user_reducer = ( userState , action) =>{
    switch (action.type) {
        case 'SET_ALRET':
            return ({ ...userState , alretMsg : action.alretMsg , alretColor : action.alretColor , loading : false})
        case 'REMOVE_ALRET':
            return ({ ...userState , alretMsg : null , alretColor : '' , loading : false})
        case 'USER_FETICHING':
            return ({ ...userState , loading : true })
        case 'FINISH_FETICHING':
            return ({ ...userState , loading : false })
        case 'LOGOUT':
            return ({ ...userState , logout : true })
        case 'USER_LOADED':
            return ({ ...userState , loading : false , ...action , isAuth : true , user : action.user , token : action.token })
        default:
            return userState
    }
}