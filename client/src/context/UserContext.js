import React , { createContext , useReducer } from 'react'
import { user_reducer , inituserState } from '../reducer/userReducer'
export const UserContext = createContext()

function UserContextProvider(props) {

    const [userState , userDispatch]  = useReducer( user_reducer , inituserState ) 

    return (
        <UserContext.Provider value={{ userState , userDispatch }} >
            { props.children }
        </UserContext.Provider>   
    )
}

export default UserContextProvider
