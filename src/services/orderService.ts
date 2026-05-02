import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/api/orders`;

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface OrderData {
    paymentMethod: string;
    items: OrderItem[];
}

export const checkout = (orderData: OrderData) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/checkout`, orderData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getOrderHistory = () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/history`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};
