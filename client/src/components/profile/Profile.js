import React , { useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ProfileContext } from '../../context/ProfileContext'
import Alret from '../layout/alret';
import DeleteExp from './Delete';
import { UserContext } from '../../context/UserContext';
import Spinner from '../layout/Spinner';

function Profile() {
    const { profileState } = useContext(ProfileContext)
    const { userState } = useContext(UserContext)

    return (
        <Fragment>
    <section className="container">
        <h1 className="large text-primary" style={{ marginBottom :'0px' , paddingBottom: "0px" }} >
            Dashboard
        </h1>
        <div style={{ height:'60px' }} >{ userState.loading && <Spinner/> }</div>
        <div style={{ height:'60px' }} ><Alret payload ={null} /></div>  
        <p className="lead"><i className="fas fa-user" /> Welcome {profileState.name} </p>
        <div className="dash-buttons">
            <Link to="/editprofile" className="btn btn-light"><i className="fas fa-user-circle text-primary" /> Edit Profile</Link>
            <Link to="/addexp" className="btn btn-light"><i className="fab fa-black-tie text-primary" /> Add Experience</Link>
            <Link to="/addeduc" className="btn btn-light"><i className="fas fa-graduation-cap text-primary" /> Add Education</Link>
        </div>
        <h2 className="my-2">Experience Credentials</h2>
        <table className="table">
            <thead>
            <tr>
                <th>Company</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Years</th>
                <th />
            </tr>
            </thead>
            <tbody>
            {profileState.experience.length > 0 ?  profileState.experience.map((exp , index)=>{
                return ( exp.company !== '' ? <tr key={index} >
                            <td>{exp.company}</td>
                            <td className="hide-sm">{exp.jobTitle}</td>
                            <td className="hide-sm">
                            02-03-2009 - 01-02-2014
                            </td>
                            <td>
                                <DeleteExp action={'exp'}  id={exp._id} />
                            </td>
                        </tr> :  '' )
            }).reverse() : <tr><td>No experience added yet. start add one</td></tr> }

            </tbody>
        </table>
        <h2 className="my-2">Education Credentials</h2>
        <table className="table">
            <thead>
            <tr>
                <th>School</th>
                <th className="hide-sm">Degree</th>
                <th className="hide-sm">Years</th>
                <th>
                </th></tr>
            </thead>
            <tbody>
            {profileState.education.length > 0 ? profileState.education.map((educ , index)=>{
                return (<tr key={index} >
                            <td>{educ.school}</td>
                            <td className="hide-sm">{educ.degree}</td>
                            <td className="hide-sm">
                            02-03-2009 - 01-02-2014
                            </td>
                            <td>
                                <DeleteExp action={'Educ'}  id={educ._id} />
                            </td>
                        </tr>)
            }).reverse() : <tr><td>No educations added yet. start add one</td></tr> }
            </tbody>
        </table>
        {/* <div className="my-2">
            <button className="btn btn-danger">
            <i className="fas fa-user-minus" />
            Delete My Account
            </button>
        </div> */}
    </section>
</Fragment>
    )
}

export default Profile
