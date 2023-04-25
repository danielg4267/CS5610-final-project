import axios from 'axios';
const API_BASE = 'http://localhost:4000/api'
const SALES_API = `${API_BASE}/sales`;

const api = axios.create({withCredentials: true})


export const findSaleBySaleID = async (sid) => {

    const response = await api.get(`${SALES_API}/${sid}`);
    const sales = response.data;
    return sales;
}

export const findSalesByUserID = async (uid) => {

    const response = await api.get(`${SALES_API}/user/${uid}`);
    const sales = response.data;
    return sales;
}

export const findSalesByBookID = async (bid) => {

    //console.log(`${SALES_API}/book/${bid}`)
    const response = await api.get(`${SALES_API}/book/${bid}`);
    const sales = response.data;
    return sales;
}

export const createSale = async (sale) => {
    console.log(sale);
    const response = await api.post(`${SALES_API}`, sale);
    return response.data;
}


export const updateSale = async (sale) => {
    const response = await api.put(`${SALES_API}`, sale);
    return response.data;
}

export const purchaseSale = async (sid) => {
    const response = await api.put(`${SALES_API}/purchase/${sid}`);
    return response.data;
}

export const deleteSale = async (sid) => {
    const response = await api.delete(`${SALES_API}/${sid}`);
    return response.data;
}