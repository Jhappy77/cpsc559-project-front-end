import axios from 'axios';
import { getProxyUrl, rotateProxyIndex } from './settings';

// Use baxios instead of axios for any requests to Bahoot (it manages proxy)
const baxios = axios.create();

// When there is no responseUrl, rotate a max of once every 10 seconds
let lastRotation = Date.now();
const minTimeSinceLastRotation = 10000; 

baxios.interceptors.response.use(function(response){
    return response;
}, function (error){
    const hasResponse = !!error.response;
    const responseUrl = error.request?.responseUrl;
    if(!hasResponse || error.response.status > 499 || error.response.status === 404){
        if(responseUrl === getProxyUrl()){
            rotateProxyIndex();
        } else if(!responseUrl || responseUrl === ''){
            if((Date.now() - lastRotation) > minTimeSinceLastRotation){
                rotateProxyIndex();
                lastRotation = Date.now();
            }
        }
    }
    return Promise.reject(error);
});

export default baxios;