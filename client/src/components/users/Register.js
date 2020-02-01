import React , {useState , useContext , Fragment} from "react";
import { Redirect } from 'react-router-dom'
import { UserContext } from "../../context/UserContext";
import Spinner from '../layout/Spinner'
import Alret from "../layout/alret";
import axios from 'axios'

function Register() {
    const { userDispatch , userState } = useContext(UserContext)
    const [formData , setFormData] = useState({
        name : '',
        email : '',
        password : '',
        password2 : ''
    })

    const onChange = e => setFormData({ ...formData , [e.target.name] : e.target.value })
    
    const onSubmit = async(e) =>{
        e.preventDefault()
        if(formData.password !== formData.password2){
          return userDispatch({type : 'SET_ALRET' , alretMsg : 'The passwords not matches' , alretColor : '#F8D7DA' })
          }
          try {
              userDispatch({ type : 'USER_FETICHING' })
              const {data} = await axios.post('/api/users/register' , formData )
              localStorage.setItem('TOKEN' , data )
              userDispatch({ type : 'USER_LOADED' , user : formData.email , token : data })
              userDispatch({ type : 'SET_ALRET', alretMsg : `Thanks ${formData.name} You registred sucessfully` , alretColor : '#D4EDDA' })
          } catch (error) {
              console.log(error.response.data.error);
              userDispatch({type : 'SET_ALRET' , alretMsg : error.response.data.error , alretColor : '#F8D7DA' })
          }
    }

  return (
    <Fragment>
    <div style={{ height:'30px' }} >{ userState.loading && <Spinner/> }</div>
    <section className="container" >
      <h1 className="large text-primary">Sign Up</h1>
      <div style={{ height:'60px' }} ><Alret payload ={<Redirect to='/'/>} /></div>  
      <p className="lead"><i className="fas fa-user" /> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={e=>onSubmit(e)} >
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required onChange={e=>onChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" required onChange={e=>onChange(e)}/>
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" required minLength={6} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Confirm Password" name="password2" minLength={6} onChange={e=>onChange(e)}/>
        </div>
        <input type="submit" className="btn btn-primary" defaultValue="Register" />
      </form>
      <p className="my-1">Already have an account? <a href="login.html">Sign In</a></p>
    </section>
    </Fragment>
  );
}

export default Register;
