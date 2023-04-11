// Uncomment for testing
// const proxyOne = 'http://localhost:3005';
const proxyOne = 'https://559proxy.vercel.app';
const proxyTwo = 'https://proxy2.herokuapp.com';
const PROXY_URL_OPTIONS = [proxyOne, proxyTwo];
let currentProxyIndex = 0;

export function getProxyUrl(){
    // Uncomment these to test with local proxy or app server
    // return `http://localhost:3005`;
    // return `https://appserver559-1.herokuapp.com`;
    return PROXY_URL_OPTIONS[currentProxyIndex];
}

export function rotateProxyIndex(){
    currentProxyIndex += 1;
    if (currentProxyIndex >= PROXY_URL_OPTIONS.length){
        currentProxyIndex = 0;
    }
    console.log(`Rotating proxy, new proxy: ${getProxyUrl()}`)
}

export const SOCKET_URL = `https://cpsc-559-project.vercel.app:8008`;
// export const SOCKET_URL = `http://localhost:8008`;
