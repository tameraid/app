import React, { Fragment , useContext , useState } from 'react'
import { Link } from 'react-router-dom'
import { PostContext } from '../../context/PostContext'
import Addpost from './Addpost'
import { UserContext } from '../../context/UserContext';
import Spinner from '../layout/Spinner';
import Alret from '../layout/alret';
import DeletePost from './DeletePost';
import Like from './Like';


function Posts() {
    const { userState } = useContext(UserContext)
    const { postState } = useContext(PostContext)
    const [ formData , setFormData ] = useState({ text : '' })

    const onChange = e =>{
        setFormData({ text : e.target.value })
    }

    return (
        <Fragment>
            <section className="container">
            <h1 className="large text-primary">
                Posts 
            </h1>
            <span style={{ height:'30px' }} >{ userState.loading && <Spinner/> }</span>  
            <div style={{ height:'60px' }} ><Alret payload ={null} /></div>                       
            <p className="lead"><i className="fas fa-user" /> Welcome to the community!</p>
            <div className="post-form">
                <div className="bg-primary p">
                <h3>Say Something...</h3>
                </div>
                <form className="form my-1" id='add post' >
                <textarea name="text" cols={30} rows={5} placeholder="Create a post" required defaultValue={""} onChange={e=>onChange(e)} />
                { userState.isAuth && <Addpost formData={formData} userId={userState.user._id} />}
                </form>
            </div>
            {postState ? postState.map((post , index)=>{
                return <div className="posts" key={index} >
                <div className="post bg-white p-1 my-1">
                <div>
                    <Link to="#!">
                    <img className="round-img" src={`https://i.picsum.photos/id/${parseInt( Math.random() * 100)}/200/200.jpg`} alt='click me' />
                    <h4>{post.name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                    {post.text}
                    </p>
                    <p className="post-date">
                    Posted on {post.date}
                    </p>
                    <Like post_id={post._id} length={post.likes.length} />
                    <button type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down" />
                    </button>
                    <Link to={{ pathname : '/comments' , state : post._id  }}  className="btn btn-primary">
                    Discussion <span className="comment-count"> {post.comments.length}</span>
                    </Link>
                    { post.user_id === post.auth_id ? <DeletePost postId={post._id} /> : '' }
                </div>
                </div>
            </div>
            }) 
            : <div>No posts yet</div> }
            </section>
        </Fragment>
    )
}

export default Posts
