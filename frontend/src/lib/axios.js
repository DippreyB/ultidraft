import Axios, { AxiosRequestConfig } from 'axios'


const authRequestInterceptor = (config) => {
    const {token} = JSON.parse(localStorage.getItem('loggedInUser'))
    if(token){
        const newConfig = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        config.headers = newConfig.headers
    }

    return config
}

const axios = Axios.create()

axios.interceptors.request.use(authRequestInterceptor)

export default axios