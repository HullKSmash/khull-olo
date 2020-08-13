/**
 * Client for interactions with posts API
 */
var BaseRequest = require('./baseClient').BaseRequest;

class Post {
    constructor(userId, title, postBody) {
        this.userId = userId;
        this.title = title;
        this.postBody = postBody;
        this.id;
    }
}

class PostsRequest {
    constructor(headers, body) {
        this.headers = headers;
        this.body = body;
        this.baseUrlStr = '/posts';
    }

    //const baseUrlStr = '/posts';

    /**
     * Though a GET request would not normally take a body, I've exposed it here 
     * for negative testing capability.
     */

    getPosts(postId = null) {
        let urlStr;
        postId ? urlStr = "/" + postId : urlStr = '';
        let url = this.baseUrlStr + urlStr;
        let req = new BaseRequest(url, this.headers, this.body);
        return new Promise((resolve, reject) => {
            req.get()
                .then(res => resolve(res))
                .catch(error => { return reject(error) })
        });
    }
    //Add a post
    addPost(post) {
        let reqBody = JSON.stringify({
            title: post.title,
            body: post.postBody,
            userId: post.userId
        });
        let req = new BaseRequest(this.baseUrlStr, this.headers, reqBody);
        return new Promise((resolve, reject) => {
            req.post()
                .then(res => resolve(res))
                .catch(error => { return reject(error) });
        })
    }
    //Edit a post
    editPost(oldPostId, editedPost) {
        let url = this.baseUrlStr + '/' + oldPostId;
        let reqBody = JSON.stringify({
            title: editedPost.title,
            body: editedPost.postBody,
            userId: editedPost.userId
        });
        let req = new BaseRequest(url, this.headers, this.body);
        return new Promise((resolve, reject) => {
            req.put()
                .then(res => resolve(res))
                .catch(error => { return reject(error) });
        })
    }
    /**This endpoint is not implemented, so there is no call to be made.  For this case, I've mocked a return of 
     * a response object with a 200 status and empty body
     * Note that this function is conceptually comment-oriented, but it is implemented (or to be implemented) on 
     * the posts endpoint according to the path 
     * */
    commentOnPost(comment) {
        let url = this.baseUrlStr + '/' + comment.postId + '/comments';
        let reqBody = JSON.stringify({
            name: comment.name,
            email: comment.email,
            body: comment.commentStr
        });
        let req = new BaseRequest(url, this.headers, this.body);
        return new Promise((resolve, reject) => {
            let res = {
                status: 200,
                body: {
                    postId: comment.postId,
                    id: 1,
                    name: comment.name,
                    email: comment.email,
                    body: comment.commentStr
                }
            };
            resolve(res);
            if (error) {
                reject(error);
            }
        })
    }
    //Remove a post
    removePost(postId) {
        let url = this.baseUrlStr + '/' + postId;
        let req = new BaseRequest(url, this.headers, this.body);
        return new Promise((resolve, reject) => {
            req.del()
                .then(res => resolve(res))
                .catch(error => { return reject(error) });
        })
    }

}

module.exports.Post = Post;
module.exports.PostsRequest = PostsRequest;