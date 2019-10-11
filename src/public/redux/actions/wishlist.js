import Axios from 'axios';
// const url = require('./url')
import url from "./url";


export const getWishlist = (id) => {
    return{
        type: 'GET_WISHLIST',
        payload: Axios.get(`${url}/api/wishlist/${id}`)
    }
}

export const addWishlist = (user, item) => {
    return{
        type: 'ADD_WISHLIST',
        payload: Axios.post(`${url}/api/wishlist/${user}/${item}`,{})
    }
}

export const deleteWishlist = (user, item) => {
    return{
        type: 'DELETE_WISHLIST',
        payload: Axios.delete(`${url}/api/wishlist/${user}/${item}`)
    }
}