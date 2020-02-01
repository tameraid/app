import axios from 'axios'


export const getProfile = async() => {
    try {
        const token = localStorage.getItem('TOKEN')
        if(token){
        axios.defaults.headers.common = { Authorization: `bearer ${token}` }
        const {data} = await axios.get('/api/profile/me')
        
        return data }
    } catch (error) {
        console.log(error.response.data.error);
        return {error : error.response.data.error }
    }
}