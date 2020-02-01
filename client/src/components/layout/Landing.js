import React , { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function Landing() {
    const { userState } = useContext(UserContext)
    if(userState.logout)window.location.reload()
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large">Developer Connector</h1>
                <p className="lead">
                    Create a developer profile/portfolio, share posts and get help from
                    other developers
                </p>
                { !userState.isAuth &&
                    <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    <Link to="/login" className="btn btn-light">Login</Link> 
                    </div>
                }
                </div>
            </div>
        </section>

    )
}

export default Landing
