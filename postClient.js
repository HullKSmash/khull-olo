/**
 * Client for interactions with post API
 */

var postReq = require('./baseClient');
const queryString = require('querystring');

const baseUrlStr = '/posts';

 //get posts
 /**Though a GET request would not normally take a body, I've exposed it here 
  * for negative testing capability.
  */
function getPosts(headers={}, body=null) {
    let res = postReq.get(baseUrlStr, headers, body);
    return res;
}
//Add a post
function addPost(headers={}, postTitle, postBody, postUserId) {
    let reqBody = JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: postUserId
    });
    let res = postReq.post(baseUrlStr, headers, reqBody);
    return res;
}
 //Edit a post
function editPost(postId, headers={}, postTitle, postBody, postUserId) {
    let reqBody = JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: postUserId
    });
    let res = postReq.put(baseUrlStr + '/' + postId, headers, reqBody);
    return res;
}
 //Add comments to a post - note that this is conceptually comment-oriented, but uses the posts API, so it's here
function commentOnPost(postId, commentStr, headers={}, body=null) {
    //This isn't defined in the specs
    //Probably ask Hannah; but call ou that this method is not supported according to the docs
}
 //Remove a post
function removePost(postId, headers={}, body=null) {
    let res = postReq.del(baseUrlStr + '/' + postId, headers, body);
    return res;
}