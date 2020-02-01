import React , { useState , useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'
import { ProfileContext } from '../../context/ProfileContext'
import Alret from '../layout/alret'
import Spinner from '../layout/Spinner'

function EditProfile() {
    const {userState , userDispatch} = useContext(UserContext)
    const {profileDispatch} = useContext(ProfileContext)
    
    const [ formData , setFormData ] = useState({
        name : '' ,
        professional : '' ,
        company : '' ,
        website : '' ,
        location : '' ,
        bio : '' ,
        social : {
            youtube : '',
            facebook : '',
            twitter : '',
            instgram : '' 
        }
    })

    const onChange = (e)=>{
        setFormData({ ...formData ,  [e.target.name] : e.target.value , social : { [e.target.name] : e.target.value } })
    }

    const onSubmit = async(e) =>{
        e.preventDefault()
        try {
            const token = localStorage.getItem('TOKEN')
            if(token){
                userDispatch({ type : 'USER_FETICHING' })
                axios.defaults.headers.common = { Authorization: `bearer ${token}` }
                const {data} = await axios.post('/api/profile/add' , formData )
                userDispatch({ type : 'FINISH_FETICHING' })
                document.getElementById("edit-form").reset()
                profileDispatch({ type:'PROFILE_LOADED' , profile : formData })
                userDispatch({ type : 'SET_ALRET', alretMsg : data , alretColor : '#D4EDDA' })
                console.log(data);
            }else
                {throw new Error('You need to log in again')}
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
                Create Your Profile
            </h1>
            <div style={{ height:'60px' }} ><Alret payload ={null} /></div>  
            <p className="lead">
                <i className="fas fa-user" /> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" id='edit-form' onSubmit={e=>onSubmit(e)} >
                <div className="form-group">
                <select name="professional" onChange={e=>onChange(e)} >
                    <option value={0}>* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Company" name="company" onChange={e=>onChange(e)} />
                <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Website" name="website" onChange={e=>onChange(e)}/>
                <small className="form-text">Could be your own or a company website</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location" onChange={e=>onChange(e)}/>
                <small className="form-text">City &amp; state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" defaultValue={""} onChange={e=>onChange(e)}/>
                <small className="form-text">Tell us a little about yourself</small>
                </div>
                <div className="my-2">
                <button type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div>
                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x" />
                <input type="text" placeholder="Twitter URL" name="twitter" onChange={e=>onChange(e)} />
                </div>
                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x" />
                <input type="text" placeholder="Facebook URL" name="facebook" onChange={e=>onChange(e)} />
                </div>
                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x" />
                <input type="text" placeholder="YouTube URL" name="youtube" onChange={e=>onChange(e)} />
                </div>
                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x" />
                <input type="text" placeholder="Instagram URL" name="instagram" onChange={e=>onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/profile">Go Back</Link>
            </form>
        </section>
    </Fragment>
    )
}

export default EditProfile
