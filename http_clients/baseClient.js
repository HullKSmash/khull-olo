/**
 * Base client for making http requests to server
 * 
 */

const fetch = require('node-fetch');

//Speficy base URL for this endpoint.  Params and query string are constructed in classes
const baseUrl = 'https://jsonplaceholder.typicode.com';

//Generic function to make requests of specifiable method, url string, headers, and body
function makeRequest(path, method, headers={}, body=null) {
    return new Promise((resolve, reject) => {
        var response = {status: null, body: null};
        fetch(baseUrl + path, {
            method: method,
            headers: headers,
            body: (body ? JSON.stringify(body) : null)
        })
        .then(res => {
            response.status = res.status;
            if (res.status != 500) {
                res.json().then(resBody => {
                    response.body = resBody;
                    resolve(response);
                })
                .catch(error => {return reject(error)});
            } else {
                res.body = null;
            }
        })
        .catch(error => {return reject(error)});
    });
}

//Performs a get request to JSONPlaceholder API
function get(path, headers={}, body=null) {
    return new Promise ((resolve, reject) => {
        makeRequest(path, 'GET', headers, body)
        .then(response => {
            resolve(response);
        })
        .catch(error => {return reject(error)});
    })
}

function post(path, headers={}, body=null) {
    return new Promise((resolve, reject) => {
        makeRequest(path, 'POST', headers, body)
        .then(response => {
            resolve(response);
        })
        .catch(error => {return reject(error)});
    })
}

function del(path, headers={}, body=null) {
    return new Promise((resolve, reject) => {
        makeRequest(path, 'DELETE', headers, body)
        .then(response => {
            resolve(response);
        })
        .catch(error => {return reject(error)});
    })
}

function put(path, headers={}, body=null) {
    return new Promise((resolve, reject) => {
        makeRequest(path, 'PUT', headers, body)
        .then(response => {
            resolve(response).catch(error => {return reject(error)});
        })
        .catch(error => {return reject(error)});
    })
}


exports.get = get;
exports.post = post;
exports.del = del;
exports.put = put;