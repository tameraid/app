import React , {useContext , useState } from 'react'
import { UserContext } from '../../context/UserContext'

function Alret({payload}) {
    const [ directflag , setDiretflag ] = useState(null)
    const { userDispatch , userState } = useContext(UserContext)
    if(userState.alretMsg){
        window.scrollTo(0 , 0)
        setTimeout(()=>{
            userDispatch({ type : 'REMOVE_ALRET'})
            if(payload && userState.isAuth ){ setDiretflag(payload) }
        } , 3000 )
    }
    if(directflag)return payload
    return (
        <div>
            {userState.alretMsg && <div className="alret" style={{background:userState.alretColor , padding:'10px' , wedith:'100%' , textAlign:'center' }} >
            {userState.alretMsg}
            </div>}
        </div>
    )
}

export default Alret
