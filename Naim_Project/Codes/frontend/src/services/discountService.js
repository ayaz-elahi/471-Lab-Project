import axios from 'axios';

const API_URL = 'http://localhost:5001/api/discount';

const applyDiscount = (couponCode, cartTotal) => {
    return axios.post(`${API_URL}/apply`, { couponCode, cartTotal });
};

export default {
    applyDiscount,
};
