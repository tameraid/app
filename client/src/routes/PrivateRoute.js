import React , { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function PrivateRoute({ component: Component , ...rest }) {
    const { userState , userDispatch } = useContext(UserContext)
    const { isAuth } = userState
    return (
            <Route {...rest} render={ props => {
            if(!isAuth)
            {
            userDispatch( { type : 'SET_ALRET' , alretMsg : 'You must Log In first...' , alretColor : '#F8D7DA'  } ) 
            return (<Redirect to='/login'/>) 
            }
            else 
            { return <Component {...props} />} }} />
    )
}

export default PrivateRoute