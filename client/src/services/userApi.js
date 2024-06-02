import axios from 'axios';


const instance = axios.create({
    baseURL: "your_backend_url",
   
});
console.log("url is ---------",instance.baseURL);


// Register a new user
export async function registerUser(userData) {
    try {
        const response = await instance.post('/api/users/signup', userData);
        return response.data.user;
    } catch (error) {
        throw new Error('Failed to register user');
    }
}

// Login user
export async function loginUser(credentials) {
    try {
        const response = await instance.post('/api/users/login', credentials);
        return response.data.user;
    } catch (error) {
        throw new Error('Failed to login user');
    }
}
