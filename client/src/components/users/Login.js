import React , { useContext, useState, Fragment } from 'react'
import { Link , Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Alret from '../layout/alret';
import axios from 'axios'
import { ProfileContext } from '../../context/ProfileContext';
import Spinner from '../layout/Spinner';


function Login() {
    const { userDispatch , userState } = useContext(UserContext)
    const { profileDispatch } = useContext(ProfileContext)
    const [ formData , setformData ] = useState({
        email : '' ,
        password : ''
    })
    const onChange = e =>{
        setformData( { ...formData , [ e.target.name ] : e.target.value  } )
    }

    const onSubmit = async(e) =>{
        e.preventDefault()
        try {
          userDispatch({ type : 'USER_FETICHING' })
          const {data} = await axios.post('/api/users/login' , formData )
          localStorage.setItem('TOKEN' , data )
          userDispatch({ type : 'USER_LOADED' , user : formData.email , token : data })
          axios.defaults.headers.common = { Authorization: `bearer ${data}` }
          const profile = await axios.get('/api/profile/me')
          profileDispatch({ type:'PROFILE_LOADED' , profile : profile })
          userDispatch({ type : 'SET_ALRET', alretMsg : `Thanks ${formData.email} You Logged in sucessfully` , alretColor : '#D4EDDA' })
      } catch (error) {
          console.log(error.response.data.error);
          userDispatch({ type : 'SET_ALRET' , alretMsg : error.response.data.error , alretColor : '#F8D7DA'  })
      }
    }
if(userState.isAuth) return <Redirect to='/home'/>
    return (
      <Fragment>
      <div style={{ height:'30px' }} >{ userState.loading && <Spinner/> }</div>
<section className="container">
  <h1 className="large text-primary">Sign In</h1>
  <div style={{ height:'60px' }} ><Alret payload ={null} /></div>  
  <p className="lead"><i className="fas fa-user" /> Sign into Your Account</p>
  <form className="form" action="dashboard.html" onSubmit={e=>onSubmit(e)} >
    <div className="form-group">
      <input type="email" placeholder="Email Address" name="email" required onChange={e=>onChange(e)} />
    </div>
    <div className="form-group">
      <input type="password" placeholder="Password" name="password" required onChange={e=>onChange(e)}/>
    </div>
    <input type="submit" className="btn btn-primary" defaultValue="Login" />
  </form>
  <p className="my-1">
    Don't have an account? <Link to="/register">Sign Up</Link>
  </p>
</section>
</Fragment>
    )
}

export default Login
