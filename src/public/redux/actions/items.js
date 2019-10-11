import Axios from 'axios';
// const url = require('./url')
import url from "./url";


export const getItemsByCategory = (id) => {
    return{
        type: 'GET_ITEMS_BYCATEGORY',
        payload: Axios.get(`${url}/api/items/category/${id}`)
    }
}

export const getItemsByBranch = (id) => {
    return{
        type: 'GET_ITEMS_BYBRANCH',
        payload: Axios.get(`${url}/api/items/branch/${id}`)
    }
}

export const getItemsByName = (name) => {
    return{
        type: 'GET_ITEMS_BYNAME',
        payload: Axios.get(`${url}/api/items/name/${name}`)
    }
}

export const getItemDetails = (id) => {
    return{
        type: 'GET_ITEM_DETAILS',
        payload: Axios.get(`${url}/api/items/details/${id}`)
    }
}

export const addItem = (data) => {
    return{
        type: 'ADD_ITEM',
        payload: Axios.post(`${url}/api/items/`, data)
    }
}

export const editItem = (id, data) => {
    return{
        type: 'EDIT_ITEM',
        payload: Axios.put(`${url}/api/items/${id}`, data)
    }
}

export const deleteItem = (id) => {
    return{
        type: 'DELETE_ITEM',
        payload: Axios.delete(`${url}/api/items/${id}`)
    }
}