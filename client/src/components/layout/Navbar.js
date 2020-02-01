import React , { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

function Navbar() {
    const { userState , userDispatch } = useContext(UserContext)
    const onClick = e =>{
        localStorage.removeItem('TOKEN')
        userDispatch({ type : 'LOGOUT' })
    }

    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code" /> DevConnector</Link>
                </h1>
            { !userState.isAuth ?
                (<ul>
                    <li><Link to="/profiles">Developers</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>) : 
                (<ul>
                    <li><Link to="/profiles">Developers</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li>
                        |
                        <Link to="/profile" title="Dashboard"><i className="fas fa-user" />
                        <span className="hide-sm"> Dashboard </span></Link>
                    </li>
                    <li>
                        <Link to="/" title="Logout" onClick={e=>onClick(e)} >
                        <i className="fas fa-sign-out-alt" />
                        <span className="hide-sm"  > Logout </span></Link>
                    </li>
                </ul>)
            }
                </nav>
        </div>
    )
}

export default Navbar
