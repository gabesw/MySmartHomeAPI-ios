import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'https://mysmarthome.software/api/v1/';

const GET = async (endpoint) => {
    const response = await axios.get(API_BASE_URL + endpoint, {
        headers: {
            Authorization: 'Token ' + await SecureStore.getItemAsync('auth_token')
        }
    });
    const data = response.data;
    return data;
};

const PUT = async (endpoint, req_data) => {
    const response = await axios.put(API_BASE_URL + endpoint, req_data, {
        headers: {
            Authorization: 'Token ' + await SecureStore.getItemAsync('auth_token')
        }
    });
    const data = response.data;
    return data;
};

export { GET, PUT };