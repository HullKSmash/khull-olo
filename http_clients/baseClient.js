/**
 * Base client for making http requests to server
 * 
 */

const fetch = require('node-fetch');

class BaseRequest {

    constructor(path, headers, body) {
        this.path = path;
        this.headers = headers;
        this.body = body;
        this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }


    //Generic function to make requests of specifiable method, url string, headers, and body
    makeRequest(method) {
        return new Promise((resolve, reject) => {
            var response = { status: null, body: null };
            fetch(this.baseUrl + this.path, {
                method: method,
                headers: this.headers,
                body: (this.body ? JSON.stringify(this.body) : null)
            })
                .then(res => {
                    response.status = res.status;
                    if (res.status == 500) {
                        response.body = null;
                        resolve(response);
                    } else {
                        res.json().then(resBody => {
                            response.headers = res.headers;
                            response.body = resBody;
                            resolve(response);
                        })
                            .catch(error => { return reject(error) });
                    }
                })
                .catch(error => { return reject(error) });
        });
    }

    //Performs a get request to JSONPlaceholder API
    get() {
        return new Promise((resolve, reject) => {
            this.makeRequest('GET')
                .then(response => {
                    resolve(response);
                })
                .catch(error => { return reject(error) });
        })
    }

    post() {
        return new Promise((resolve, reject) => {
            this.makeRequest('POST')
                .then(response => {
                    resolve(response);
                })
                .catch(error => { return reject(error) });
        })
    }

    del() {
        return new Promise((resolve, reject) => {
            this.makeRequest('DELETE')
                .then(response => {
                    resolve(response);
                })
                .catch(error => { return reject(error) });
        })
    }

    put() {
        return new Promise((resolve, reject) => {
            this.makeRequest('PUT')
                .then(response => {
                    resolve(response).catch(error => { return reject(error) });
                })
                .catch(error => { return reject(error) });
        })
    }

}

module.exports.BaseRequest = BaseRequest;