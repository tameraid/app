import React, { Fragment ,useEffect , useState , useContext } from 'react'
import {Link} from 'react-router-dom'
import { getProfiles } from './getProfiles'
import { UserContext } from '../../context/UserContext'
import Spinner from '../layout/Spinner'
// import ViewProfile from './ViewProfile'

function Profiles() {
    const [profiles , setProfiles] = useState([])
    const { userState , userDispatch } = useContext(UserContext)

    useEffect(()=>{
        userDispatch({ type : 'USER_FETICHING' })
        getProfiles().then(data=>{
        setProfiles(data)
        userDispatch({ type : 'FINISH_FETICHING'})
       }).catch(err=>console.log(err))
    },[userDispatch])

    return (
        <Fragment>
            <section className="container">
            <h1 className="large text-primary">Developers</h1>
      <span style={{ height:'30px' }} >{ (userState.loading || profiles === null) && <Spinner/> }</span>

            <p className="lead">
                <i className="fab fa-connectdevelop" /> Browse and connect with developers
            </p>
            {profiles && profiles.map((profile , index )=>{
              return  <div className="profiles" key={index} >
                <div className="profile bg-light">
                <img className="round-img" src={`https://i.picsum.photos/id/${parseInt( Math.random() * 100)}/150/150.jpg`} alt='profiles' />
                <div>
                    <h2>{profile.name}</h2>
                    <p>{profile.professional}</p>
                    <p>{profile.location}</p>
                    {/* <ViewProfile profile_id={ profile._id } /> */}
                    <Link to={`/dev_profile/${profile._id}`} className="btn btn-primary"  >View Profile</Link>
                </div>
                <ul>
                    <li className="text-primary">
                    <i className="fas fa-check" /> {profile.social && profile.social.youtube}
                    </li>
                    <li className="text-primary">
                    <i className="fas fa-check" /> {profile.social && profile.social.facebook}
                    </li>
                    <li className="text-primary">
                    <i className="fas fa-check" /> {profile.social && profile.social.twitter}
                    </li>
                    <li className="text-primary">
                    <i className="fas fa-check" /> {profile.social && profile.social.instgram}
                    </li>
                </ul>
                </div>
            </div>
            }) }

            </section>

        </Fragment>
    )
}

export default Profiles
