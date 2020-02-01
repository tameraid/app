import React , { useContext } from 'react'
import { ProfileContext } from '../../context/ProfileContext'
import axios from 'axios'
import {getProfile} from './loading_data'
import { UserContext } from '../../context/UserContext'

function DeleteExp({id , action}) {
    const { profileDispatch } = useContext(ProfileContext)
    const { userDispatch } = useContext(UserContext)

    const onClick = async(e) =>{
        try {
            const token = localStorage.getItem('TOKEN')
            userDispatch({ type : 'USER_FETICHING' })
            axios.defaults.headers.common = { Authorization: `bearer ${token}` }
            const {data} = await axios.delete(`/api/profile/delete_${action}/${id}`)
            userDispatch({ type : 'SET_ALRET', alretMsg : data , alretColor : '#D4EDDA' })
            getProfile().then(data => profileDispatch({ type:'PROFILE_LOADED' , profile : data})).catch(error=>new Error ('something wrong happened'))
        } catch (error) {
            console.log(error)
            userDispatch({ type : 'SET_ALRET' , alretMsg : error.response.data.error , alretColor : '#F8D7DA'  })
        }
    }
    return (
        <div>
            <button className="btn btn-danger" onClick={e=>onClick(e)} >Delete</button>
        </div>
    )
}

export default DeleteExp
