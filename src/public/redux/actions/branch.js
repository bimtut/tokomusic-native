import Axios from 'axios';
// const url = require('./url')
import url from "./url";


export const getBranch = () => {
    return{
        type: 'GET_BRANCH',
        payload: Axios.get(`${url}/api/branch/`)
    }
}

export const addBranch = (data) => {
    return{
        type: 'ADD_BRANCH',
        payload: Axios.post(`${url}/api/branch/`, data)
    }
}

export const editBranch = (id, data) => {
    return{
        type: 'EDIT_BRANCH',
        payload: Axios.put(`${url}/api/branch/${id}`, data)
    }
}

export const deleteBranch = (id) => {
    return{
        type: 'DELETE_BRANCH',
        payload: Axios.delete(`${url}/api/branch/${id}`)
    }
}