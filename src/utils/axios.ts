import axios from "axios"
import { api_url } from "."

const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_API_URL : api_url,
})

export default Axios