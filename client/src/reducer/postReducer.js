export const initPostState = [
    {
    auth_id : '' ,    
    _id : '' ,
    user_id : '' ,
    name : '' ,
    text : '' ,
    date : '' ,
    likes : [
       { user_id : ''} 
    ],
    comments : [{
        user_id : '',
        name : '' ,
        text : '' ,
        date : '' 
    }]}
]

export const post_reducer = ( postState , action ) =>{

    switch (action.type) {
        case 'POSTS_LOADED' :
            return ([...action.posts ])
        default:
            return postState
    }
}