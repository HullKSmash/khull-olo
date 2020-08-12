/**
 * Client for interactions with posts API
 */

var baseReq = require('./baseClient');

const baseUrlStr = '/posts';

 //get posts
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
 //Add comments to a post - note that this is conceptually comment-oriented, but uses the posts API, so it's here
 //  Is there a chance this will be implemented under the comments API instead?
function commentOnPost(postId, commentStr, headers={}, body=null) {
    //This isn't defined in the specs; treat it like something that will be implemented
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