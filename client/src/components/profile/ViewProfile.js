// import React, { Fragment , useState } from 'react'
// import { Link , Redirect } from 'react-router-dom'
// import axios from 'axios'

// function ViewProfile({profile_id}) {
//     const [devProfile , setDevProfile] = useState({})
//     const [redirectFlag , setRedirectFlag] = useState(false)

//     // const onClick = async(e)=>{
//     //     e.preventDefault()
//     //     try {
//     //         const token = localStorage.getItem('TOKEN')
//     //         if(token){
//     //         axios.defaults.headers.common = { Authorization: `bearer ${token}` }
//     //         const {data} = await axios.get(`/api/profile/${profile_id}`)
//     //         setDevProfile(data)
//     //         setRedirectFlag(true)
//     //     }
//     //     } catch (error) {
//     //         console.log(error.response.data.error);
//     //         return {error : error.response.data.error }
//     //     }
//     // }
//     if(redirectFlag)return <Redirect to={{pathname : '/dev_profile' , state : devProfile }} />
//     return (
//         <Fragment>
//             <Link to="/dev_profile" className="btn btn-primary" onClick={e=>onClick(e)} >View Profile</Link>
//         </Fragment>
//     )
// }

// export default ViewProfile
