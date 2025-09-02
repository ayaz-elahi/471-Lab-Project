import axios from 'axios';

const API_URL = 'http://localhost:5001/api/cart';

const getCart = () => {
    return axios.get(API_URL);
};

const addToCart = (productId, quantity, price) => {
    console.log('🛒 CartService: Adding to cart:', { productId, quantity, price });
    console.log('🛒 CartService: API URL:', `${API_URL}/add`);
    
    return axios.post(`${API_URL}/add`, { productId, quantity, price })
        .then(response => {
            console.log('🛒 CartService: Success response:', response.data);
            return response;
        })
        .catch(error => {
            console.error('🛒 CartService: Error adding to cart:', error);
            throw error;
        });
};

const updateCartItem = (productId, quantity) => {
    return axios.put(`${API_URL}/update`, { productId, quantity });
};

const cartService = {
    getCart,
    addToCart,
    updateCartItem,
};

export default cartService;
