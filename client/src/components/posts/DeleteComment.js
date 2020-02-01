import React, { Fragment , useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { getPosts } from './getPosts'
import { PostContext } from '../../context/PostContext'

function DeleteComment({comment_id , post_id }) {
    const { userDispatch } = useContext(UserContext)
    const { postDispatch } = useContext(PostContext)

    const onClick = async(e)=>{
        e.preventDefault()
        try {
            const token = localStorage.getItem('TOKEN')
            if(token){
                userDispatch({ type : 'USER_FETICHING' })
                axios.defaults.headers.common = { Authorization: `bearer ${token}` }
                const {data} = await axios.delete(`/api/posts/delete_comment/${post_id}/${comment_id}` )
                userDispatch({ type : 'SET_ALRET', alretMsg : data , alretColor : '#D4EDDA' })
                getPosts().then(data=>postDispatch({ type : 'POSTS_LOADED' , posts : data })).catch(err=>console.log(err)
            )
            }
        } catch (error) {
            console.log(error.response.data.error);
        }    
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-danger" onClick={e=>onClick(e)} >
            <i className="fas fa-times" />
            </button>
        </Fragment>
    )
}

export default DeleteComment
