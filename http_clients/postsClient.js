/**
 * Client for interactions with posts API
 */
var baseReq = require('./baseClient');

const baseUrlStr = '/posts';

 /**Though a GET request would not normally take a body, I've exposed it here 
  * for negative testing capability.
  */

function getPosts(postId=null, headers={}, body=null) {
    let urlStr;
    postId ? urlStr = "/" + postId : urlStr = '';
    return new Promise ((resolve, reject) => {
        baseReq.get(baseUrlStr + urlStr, headers, body)
        .then(res => resolve(res))
        .catch((error => {return reject(error)}))
    });
}
//Add a post
function addPost(headers={}, postTitle, postBody, postUserId) {
    let reqBody = JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: postUserId
    });
    return new Promise ((resolve, reject) => {
        baseReq.post(baseUrlStr, headers, body)
        .then(res => resolve(res))
        .catch(error => {return reject(error)});
    })
}
 //Edit a post
function editPost(postId, headers={}, postTitle, postBody, postUserId) {
    let reqBody = JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: postUserId
    });
    return new Promise ((resolve, reject) => {
        baseReq.put(baseUrlStr + '/' + postId, headers, reqBody)
        .then(res => resolve(res))
        .catch(error => {return reject(error)});
    })
}
 /**This endpoint is not implemented, so there is no call to be made.  For this case, I've mocked a return of 
  * a response object with a 200 status and empty body
  * Note that this function is conceptually comment-oriented, but it is implemented (or to be implemented) on 
  * the posts endpoint according to the path 
  * */
function commentOnPost(postId, commentStr, headers={}, body=null) {
    return new Promise ((resolve, reject) => {
        let res = {status: 200, body: {}};
        resolve(res);
        if (error) {
            reject(error);
        }
    })
}
 //Remove a post
function removePost(postId, headers={}, body=null) {
    return new Promise ((resolve, reject) => {
        baseReq.del(baseUrlStr + '/' + postId, headers, body)
        .then(res => resolve(res))
        .catch(error => {return reject(error)});
    })
}

exports.getPosts = getPosts;
exports.addPost = addPost;
exports.editPost = editPost;
exports.removePost = removePost;
exports.commentOnPost = commentOnPost;