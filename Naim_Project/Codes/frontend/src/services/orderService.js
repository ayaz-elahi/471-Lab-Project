import axios from 'axios';

const API_URL = 'http://localhost:5001/api/orders';

const createOrder = (orderData) => {
    return axios.post(`${API_URL}/create`, orderData);
};

const getOrders = () => {
    return axios.get(API_URL);
};

const getOrderById = (orderId) => {
    return axios.get(`${API_URL}/${orderId}`);
};

const getOrderByNumber = (orderNumber) => {
    return axios.get(`${API_URL}/number/${orderNumber}`);
};

const updateOrderStatus = (orderId, statusData) => {
    return axios.put(`${API_URL}/${orderId}/status`, statusData);
};

const simulateOrderProgress = (orderId) => {
    return axios.post(`${API_URL}/${orderId}/simulate-progress`);
};

export default {
    createOrder,
    getOrders,
    getOrderById,
    getOrderByNumber,
    updateOrderStatus,
    simulateOrderProgress
};
