import React , {useContext , useReducer , createContext , useEffect } from 'react'
import { initPostState , post_reducer } from '../reducer/postReducer'
import { getPosts } from '../components/posts/getPosts'
import { UserContext } from './UserContext'

export const PostContext = createContext()

function PostContextProvider(props) {
    const [ postState , postDispatch ] = useReducer( post_reducer , initPostState )
    const { userState } = useContext(UserContext)

useEffect(()=>{
    if(userState.isAuth){
        getPosts().then(data=>{
        postDispatch({ type : 'POSTS_LOADED' , posts : data })}).catch(err=>console.log(err)
        )
    }
} , [userState.isAuth] )

    return (
        <PostContext.Provider value={{ postState , postDispatch }} >
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
