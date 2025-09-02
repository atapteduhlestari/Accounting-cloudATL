// src/axios.js
import axios from 'axios';

// Buat instance axios khusus
const api = axios.create({
    baseURL: 'http://192.168.1.30:8000',
    withCredentials: true,
});

// Tambahkan CSRF token ke setiap request
api.interceptors.request.use((config) => {
    const xsrfToken = getCookie('XSRF-TOKEN');
    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
    }
    return config;
});

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

export default api;
