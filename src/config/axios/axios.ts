import axios from 'axios';
import { LocalStorageTokenKey } from 'constans/localStorage';

export const ApiBaseUrl = 'http://localhost:5000/';

export const apiClassic = axios.create({
    baseURL: ApiBaseUrl,
});

export const $api = axios.create({
    baseURL: ApiBaseUrl,
});

$api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(LocalStorageTokenKey);

    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});
