/**
 * Client for http requests to comments API.  Calls are made via baseClient.js.
 * I've split this off from the post client for future scalability.
 *     If more functionality is added to comments (deleting, editing, fetching 
 *     comments by user) tests for those functions would use this client.
 */

var postReq = require('./baseClient');
const queryString = require('querystring');
 
const baseUrlStr = '/comments';

 //Get comments on a post
function getComments(postId, headers={}, body=null) {
    let res = postReq.get(baseUrlStr + '?' + postId);
    return res;
}