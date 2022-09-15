import axios from "axios"
// const API_URL = 'http://localhost:4000/api/v1/Seupb'
const API_URL = 'https://seupb.herokuapp.com/api/v1/Seupb'


export default axios.create({
    baseURL: API_URL,
})