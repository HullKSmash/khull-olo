const fetch = require('node-fetch');

//Speficy base URL for this endpoint.  Params and query string are constructed in classes
const baseUrl = 'https://jsonplaceholder.typicode.com/';

//Generic function to make requests of specifiable method, url string, headers, and body
function makeRequest(urlStr, method, headers={}, body=null) {
    let response = {};
    fetch(baseUrl + urlStr, {
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
function get(url, headers={}, body=null) {
    let response = makeRequest(url, 'GET', headers, body);
    console.log(response);
    return response;
}

function post(url, headers={}, body=null) {
    let response = makeRequest(url, 'POST', headers, body);
    return response;
}

function del() {
    let response = makeRequest(url, 'DELETE', headers, body);
    return response;
}

function put() {
    let response = makeRequest(url, 'PUT', headers, body);
    return response;
}


exports.get = get;
exports.post = post;
exports.del = del;
exports.put = put;