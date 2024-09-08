import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    timeout: 8000,
    headers: {
        Accept: 'application/json',
        ["Content-Type"]: "application/json; charset=utf-8",
    },
});

instance.interceptors.request.use(function (config) {
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
});

instance.interceptors.response.use(
    (res) => res.data,
)

export default instance;