import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://mysmarthome.software/api/v1/api-token-auth/';

const login = async (username, password) => {
    const response = await axios.post(API_URL, { 
        username: username,
        password: password
    });
    const token = response.data.token;
    await SecureStore.setItemAsync('auth_token', token);
    return token;
};

export { login };