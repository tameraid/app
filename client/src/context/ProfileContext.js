import React , {createContext , useReducer , useEffect , useContext } from 'react'
import { profile_reducer , intiProfileState } from '../reducer/profileReducer'
import { UserContext } from './UserContext'
import { getProfile } from '../components/profile/loading_data'

export const ProfileContext = createContext()

function ProfileContextProvider(props) {
    const { userState } = useContext(UserContext)
    const [ profileState , profileDispatch ] = useReducer( profile_reducer , intiProfileState )

    useEffect(()=>{
            getProfile().then(data => profileDispatch({ type:'PROFILE_LOADED' , profile : data})).catch(error=>console.log(error))
    },[userState.isAuth])

    return (
        <ProfileContext.Provider value={{ profileState , profileDispatch }} >
            { props.children }
        </ProfileContext.Provider> 
    )
}

export default ProfileContextProvider
