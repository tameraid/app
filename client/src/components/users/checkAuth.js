import axios from 'axios'

const checkAuth = async(userDispatch)=>{
    const token = localStorage.getItem('TOKEN')
    if(token){
        localStorage.clear()
        localStorage.setItem('TOKEN' , token)
        try {
            axios.defaults.headers.common = { Authorization: `bearer ${token}` }
            const {data} = await axios.get('/auth')
            userDispatch( { type : 'USER_LOADED' , user : data , token })
        } catch (error) {
            localStorage.removeItem('TOKEN')
        }
        console.log('no token , log in again');
    }
}

export default checkAuth