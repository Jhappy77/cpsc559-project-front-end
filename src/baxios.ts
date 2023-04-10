import axios from 'axios';
import { rotateProxyIndex } from './settings';

// Use baxios instead of axios for any requests to Bahoot (it manages proxy)
const baxios = axios.create();

baxios.interceptors.response.use(function(response){
    return response;
}, function (error){
    const hasResponse = !!error.response;
    if(!hasResponse || error.response.status > 499 || error.response.status === 404){
        rotateProxyIndex();
    }
    return Promise.reject(error);
});

export default baxios;