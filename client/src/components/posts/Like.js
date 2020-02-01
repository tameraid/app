import React, { Fragment ,useContext } from 'react'
import axios from 'axios'
import {getPosts} from '../posts/getPosts'
import { PostContext } from '../../context/PostContext'

function Like({post_id , length}) {
    const {postDispatch} = useContext(PostContext)

    const onClick = async(e)=>{
        e.preventDefault()
        try {
            const token = localStorage.getItem('TOKEN')
            if(token){
                axios.defaults.headers.common = { Authorization: `bearer ${token}` }
                await axios.post(`/api/posts/like/${post_id}`)
                getPosts().then(data=>postDispatch({ type : 'POSTS_LOADED' , posts : data })).catch(err=>console.log(err)
            )
            }
        } catch (error) {
            console.log(error.response.data.error);
        }    
    }   

    return (
        <Fragment>
            <button type="button" className="btn btn-light" onClick={e=>onClick(e)} >
            <i className="fas fa-thumbs-up" /> 
            <span> {length}</span>
            </button>
        </Fragment>
    )
}

export default Like
