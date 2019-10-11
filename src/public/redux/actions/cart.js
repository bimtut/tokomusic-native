import Axios from 'axios';
// const url = require('./url')
import url from "./url";


export const getCart = (id) => {
    return{
        type: 'GET_CART',
        payload: Axios.get(`${url}/api/cart/${id}`)
    }
}

export const addCart = (id,data) => {
  
    return{
        type: 'ADD_CART',
        payload: Axios.post(`${url}/api/cart/${id}`, data)
    }
}

export const editCart = (id, data) => {
    return{
        type: 'EDIT_CART',
        payload: Axios.put(`${url}/api/cart/${id}`, data)
    }
}

export const deleteCart = (id, itemID, branchID) => {
    return{
        type: 'DELETE_CART',
        payload: Axios.delete(`${url}/api/cart/${id}/${itemID}/${branchID}`)
    }
}

export const clearCart = (id) => {
    return{
        type: 'CLEAR_CART',
        payload: Axios.delete(`${url}/api/cart/clear/${id}`)
    }
}