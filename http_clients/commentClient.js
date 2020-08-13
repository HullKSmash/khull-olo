/**
 * Client for http requests to comments API.  Calls are made via baseClient.js.
 * I've split this off from the post client for future scalability, though 
 * there is currently only one route here.  In this structure, tests for 
 * expanded routes and functions on this endpoint could easily be added here.
 */

var BaseRequest = require('./baseClient').BaseRequest;

class Comment {

    constructor(postId, name, email, commentStr) {
        this.postId = postId,
        this.id = 1,
        this.name = name,
        this.email = email,
        this.body = commentStr
    }
}

class CommentRequest {

    constructor(comment, headers, body) {
        this.postId = comment.postId;
        this.headers = headers;
        this.body = body;
        this.baseUrlStr = '/comments';
    }

    //This is the only route implemented or documented on this endpoint
    getComments(postId) {
        let url = this.baseUrlStr + '?postId=' + postId;
        let req = new BaseRequest(url, this.headers, this.body);
        return new Promise((resolve, reject) => {
            req.get()
                .then(res => resolve(res))
                .catch((error => { return reject(error) }))
        });
    }

}

module.exports.Comment = Comment;
module.exports.CommentRequest = CommentRequest;