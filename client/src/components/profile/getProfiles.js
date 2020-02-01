import axios from 'axios'

export const getProfiles = async()=>{
    try {
        const token = localStorage.getItem('TOKEN')
        if(token){
        axios.defaults.headers.common = { Authorization: `bearer ${token}` }
        const {data} = await axios.get('/api/profile/')
        return data }
    } catch (error) {
        console.log(error.response.data.error);
        return {error : error.response.data.error }
    }
}