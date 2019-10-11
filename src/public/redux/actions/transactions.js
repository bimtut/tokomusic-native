import Axios from 'axios';
// const url = require('./url')
import url from "./url";


export const getUserTransactions = (id) => {
    return{
        type: 'GET_USER_TRANSACTIONS',
        payload: Axios.get(`${url}/api/transactions/user/${id}`)
    }
}

export const getTransactionsByMonth = (month) => {
    return{
        type: 'GET_TRANSACTIONS_BYMONTH',
        payload: Axios.get(`${url}/api/transactions/month/${month}`)
    }
}

export const newTransaction = (id,data) => {
    return{
        type: 'NEW_TRANSACTIONS',
        payload: Axios.post(`${url}/api/transactions/${id}`, data)
    }
}
