import React , { useState , useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { ProfileContext } from '../../context/ProfileContext'
import Alret from '../layout/alret'
import Spinner from '../layout/Spinner'

function AddExp() {
  const {userState , userDispatch} = useContext(UserContext)
  const {profileDispatch} = useContext(ProfileContext)
  const initstate = {
    jobTitle : '' ,
    company : '' ,
    describtion : '',
    from : '' ,
    to : ''
}
const [ formData , setFormData ] = useState(initstate)

const onChange = (e)=>{
  setFormData({ ...formData ,  [e.target.name] : e.target.value })
}

const onSubmit = async(e) =>{
  e.preventDefault()
  try {
      const token = localStorage.getItem('TOKEN')
      if(token){
          userDispatch({ type : 'USER_FETICHING' })
          axios.defaults.headers.common = { Authorization: `bearer ${token}` }
          const {data} = await axios.post('/api/profile/add_exp/' , formData )
          document.getElementById("exp-form").reset()
          userDispatch({ type : 'FINISH_FETICHING' })
          profileDispatch({ type:'EXP_LOADED' , profile : formData })
          userDispatch({ type : 'SET_ALRET', alretMsg : data , alretColor : '#D4EDDA' })
      }else{throw new Error('You need to log in again')}
  } catch (error) {
      console.log(error.response.data.error);
      console.log(error);
      userDispatch({ type : 'SET_ALRET' , alretMsg : error.response.data.error , alretColor : '#F8D7DA'})
  }
}

    return (
      <Fragment>
      <div style={{ height:'30px' }} >{ userState.loading && <Spinner/> }</div>
      <section className="container">
          <h1 className="large text-primary">
            Add An Experience
          </h1>
          <div style={{ height:'60px' }} ><Alret payload ={null} /></div>            
          <p className="lead">
            <i className="fas fa-code-branch" /> Add any developer/programming
            positions that you have had in the past
          </p>
          <small>* = required field</small>
          <form className="form" id='exp-form' onSubmit={e=>onSubmit(e)} >
            <div className="form-group">
              <input type="text" placeholder="* Job Title" name="jobTitle" required onChange={e=>onChange(e)}/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="* Company" name="company" required onChange={e=>onChange(e)}/>
            </div>
            <div className="form-group">
              <h4>From Date</h4>
              <input type="date" name="from" onChange={e=>onChange(e)}/>
            </div>
            <div className="form-group">
              <h4>To Date</h4>
              <input type="date" name="to"  />
            </div>
            <div className="form-group">
              <textarea name="describtion"  cols={30} rows={5} placeholder="Job Description" defaultValue={""} onChange={e=>onChange(e)}/>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/profile">Go Back</Link>
          </form>
      </section>
      </Fragment>
    )
}

export default AddExp
