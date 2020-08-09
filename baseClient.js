/**
 * Base client for making http requests to server
 * 
 */

const fetch = require('node-fetch');

//Speficy base URL for this endpoint.  Params and query string are constructed in classes
const baseUrl = 'https://jsonplaceholder.typicode.com';

//Generic function to make requests of specifiable method, url string, headers, and body
function makeRequest(path, method, headers={}, body=null) {
    let response = {};
    fetch(baseUrl + path, {
        method: method,
        headers: headers,
        body: (body ? JSON.stringify(body) : null)
    })
    .then(res => {
        response.status = res.status;
        res.json().then(resBody => {
            response.body = resBody;
            console.log(response);
            return response;
        });
    })
    .catch(error => {return error});
}

//Performs a get request to JSONPlaceholder API
function get(path, headers={}, body=null) {
    let response = makeRequest(path, 'GET', headers, body);
    console.log(response);
    return response;
}

function post(path, headers={}, body=null) {
    let response = makeRequest(path, 'POST', headers, body);
    return response;
}

function del(path, headers={}, body=null) {
    let response = makeRequest(path, 'DELETE', headers, body);
    return response;
}

function put(path, headers={}, body=null) {
    let response = makeRequest(path, 'PUT', headers, body);
    return response;
}


exports.get = get;
exports.post = post;
exports.del = del;
exports.put = put;