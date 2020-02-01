import React, { Fragment , useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { getPosts } from './getPosts'
import { PostContext } from '../../context/PostContext'

function Addpost({formData , userId}) {
    const {userDispatch} = useContext(UserContext)
    const {postDispatch} = useContext(PostContext)

const onClick = async(e)=>{
    e.preventDefault()
    try {
        const token = localStorage.getItem('TOKEN')
        if(token){
            userDispatch({ type : 'USER_FETICHING' })
            axios.defaults.headers.common = { Authorization: `bearer ${token}` }
            const {data} = await axios.post(`/api/posts/add` , formData )
            document.getElementById("add post").reset()
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
            <input type="submit" className="btn btn-dark my-1" defaultValue="Submit" onClick={e=>onClick(e)} />
        </Fragment>
    )
}

export default Addpost
