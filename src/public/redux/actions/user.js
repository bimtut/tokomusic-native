import Axios from 'axios';
// const url = require('./url')
import url from "./url";


export const login = (data) => {
    return{
        type: 'LOGIN',
        payload: Axios.post(`${url}/api/user/login`, data)
    }
}

export const register = (data) => {
    return{
        type: 'REGISTER',
        payload: Axios.post(`${url}/api/user/register`, data)
    }
}