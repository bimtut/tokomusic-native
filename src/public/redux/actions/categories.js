import Axios from 'axios';
import url from "./url";

export const getCategories = () => {
    return{
        type: 'GET_CATEGORIES',
        payload: Axios.get(`${url}/api/categories/`)
    }
}

export const addCategory = (data) => {
    return{
        type: 'ADD_CATEGORY',
        payload: Axios.post(`${url}/api/categories/`, data)
    }
}

export const editCategory = (id, data) => {
    return{
        type: 'EDIT_CATEGORY',
        payload: Axios.put(`${url}/api/categories/${id}`, data)
    }
}

export const deleteCategory = (id) => {
    return{
        type: 'DELETE_CATEGORY',
        payload: Axios.delete(`${url}/api/categories/${id}`)
    }
}

export const setDisplay = (status) => {
    return{
        type: 'SET_DISPLAY',
        payload: status
    }
}