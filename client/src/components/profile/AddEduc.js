import React , { useState , useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { ProfileContext } from '../../context/ProfileContext'
import Alret from '../layout/alret'
import Spinner from '../layout/Spinner'

function AddEduc() {
    const {userState , userDispatch} = useContext(UserContext)
    const {profileDispatch} = useContext(ProfileContext)
    const [ formData , setFormData ] = useState({
        school : '' ,
        degree : '' ,
        describtion : '',
        from : '' ,
        to : ''
  })

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
            const {data} = await axios.post('/api/profile/add_educ/' , formData )
            userDispatch({ type : 'FINISH_FETICHING' })
            document.getElementById("educ-form").reset()

            profileDispatch({ type:'EDUC_LOADED' , profile : formData })
            userDispatch({ type : 'SET_ALRET', alretMsg : data , alretColor : '#D4EDDA' })
        }else{throw new Error('You need to log in again')}
    } catch (error) {
        console.log(error.response.data.error);
        userDispatch({ type : 'SET_ALRET' , alretMsg : error.response.data.error , alretColor : '#F8D7DA'})
    }
  }


    return (
        <Fragment>
        <div style={{ height:'30px' }} >{ userState.loading && <Spinner/> }</div>        
        <section className="container">
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <div style={{ height:'60px' }} ><Alret payload ={null} /></div>            
            <p className="lead">
                <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" id="educ-form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="* School or Bootcamp" name="school" required onChange={e=>onChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Degree or Certificate" name="degree" required onChange={e=>onChange(e)}/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" onChange={e=>onChange(e)}/>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" onChange={e=>onChange(e)}/>
                </div>
                <div className="form-group">
                <textarea name="describtion" cols={30} rows={5} placeholder="Program Description" defaultValue={""} onChange={e=>onChange(e)}/>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/profile">Go Back</Link>
            </form>
        </section>
    </Fragment>
    )
}

export default AddEduc
