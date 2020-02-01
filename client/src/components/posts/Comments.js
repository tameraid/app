import React, { Fragment , useContext , useState , useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { getPosts } from './getPosts'
import { PostContext } from '../../context/PostContext'
import DeleteComment from './DeleteComment'
import Spinner from '../layout/Spinner'
import Alret from '../layout/alret'

function Comments(props) {
    const [formData , setFormData] = useState({text:''})
    const [post , setPost] = useState()
    const {userDispatch , userState} = useContext(UserContext)
    const { postState , postDispatch} = useContext(PostContext)

    const onChange = e =>{
        setFormData({text : e.target.value})
    }

    useEffect(()=>{
        const res = postState.find(post=>{
            return post._id === props.location.state
        })
        setPost(res)
    },[postState , props.location.state])

    const onClick = async(e) =>{
        e.preventDefault()
        try {
            const token = localStorage.getItem('TOKEN')
            if(token){
                userDispatch({ type : 'USER_FETICHING' })
                axios.defaults.headers.common = { Authorization: `bearer ${token}` }
                const {data} = await axios.post(`/api/posts/add_comment/${post._id}` , formData )
                userDispatch({ type : 'SET_ALRET', alretMsg : data , alretColor : '#D4EDDA' })
                getPosts().then(data=>postDispatch({ type : 'POSTS_LOADED' , posts : data })).catch(err=>console.log(err)
                )
                document.getElementById("comment-form").reset()
            }
        } catch (error) {
            console.log(error.response.data.error);
        }    
    }
    if(!post) return <div></div>
    return (
        <Fragment>
            <section className="container">
            <span style={{ height:'30px' }} >{ userState.loading && <Spinner/> }</span>  
            <div style={{ height:'60px' }} ><Alret payload ={null} /></div> 
            <Link to="/posts" className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
                <div>
                <Link to="/profile">
                    <img className="round-img" src={`https://i.picsum.photos/id/${parseInt( Math.random() * 100)}/200/200.jpg`} alt='comments' />
                    <h4>{post.name}</h4>
                </Link>
                </div>
                <div>
                <p className="my-1">
                    {post.text}
                </p>
                </div>
            </div>
            <div className="post-form">
                <div className="bg-primary p">
                <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1" id='comment-form' >
                <textarea name="text" cols={30} rows={5} placeholder="Comment on this post" required defaultValue={""} onChange={e=>onChange(e)} />
                <input type="submit" className="btn btn-dark my-1" defaultValue="Submit" onClick={e=>onClick(e)} />
                </form>
            </div>
            <div className="comments">
                {post.comments.map((comment , index )=>{ 
                    return(
                    <div className="post bg-white p-1 my-1" key={index} >
                        <div>
                            <Link to="profile.html">
                            <img className="round-img" src={`https://i.picsum.photos/id/${parseInt( Math.random() * 100)}/200/200.jpg`} alt='comments' />
                            <h4>{comment.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className="my-1">
                            {comment.text}
                            </p>
                            <p className="post-date">
                            Posted on {comment.date}
                            </p>
                            { post.auth_id === comment.user_id ? <DeleteComment post_id={post._id} comment_id={comment._id}/> : '' }
                        </div>
                    </div>
                    )}).reverse()}

            </div>
            </section>

        </Fragment>
    )
}

export default Comments
