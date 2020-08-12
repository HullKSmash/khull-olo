/**
 * Client for http requests to comments API.  Calls are made via baseClient.js.
 * I've split this off from the post client for future scalability.
 *     If more functionality is added to comments (deleting, editing, fetching 
 *     comments by user) tests for those functions would use this client.
 */

var baseReq = require('./baseClient');
 
const baseUrlStr = '/comments';

 //Get comments on a post
function getComments(postId, headers={}, body=null) {
    let urlStr = '?' + postId;
    return new Promise ((resolve, reject) => {
        baseReq.get(baseUrlStr + urlStr, headers, body)
        .then(res => resolve(res))
        .catch((error => {return reject(error)}))
    });
}

exports.getComments = getComments;