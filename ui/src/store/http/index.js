import axios from 'axios';

const defHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
const request = async (url, method, data, headers = null) => {
    if(!headers) headers = defHeaders;
    const response = await axios.request({
        baseURL: "http://api.blog.com",
        url,
        method,
        data,
        headers,
        withCredentials: true
    });
    return response;
}

export default request;