const CommentRequest = require('../http_clients/commentClient').CommentRequest;
const Comment = require('../http_clients/commentClient').Comment;
const PostsRequest = require('../http_clients/postsClient').PostsRequest;
const Post = require('../http_clients/postsClient').Post;
const testData = require('./test-data.json');
const { CommentClient } = require('../http_clients/commentClient');
var expect = require('chai').expect;

/**
 * Note: Using Mocha for simplicity in reporting to the command line.
 * In a real-world scenario, these tests would report successes 
 * and failures through a frameworkd or out to something like the TestRail API.
*/

const validUserId = testData.userIds.validUserId;
const validPostTitle = testData.postData.validPostTitle;
const validPostBody = testData.postData.validPostBody;
const validPostId = testData.postIds.validPostId;
const invalidPostId = testData.postIds.invalidPostId;
const validPostTitleEdited = testData.postData.validPostTitleEdited;
const validCommentStr = testData.commentData.validCommentStr;
const validCommentName = testData.commentData.validName;
const validCommentEmail = testData.commentData.validEmail;

describe('Comments', function () {

    var currentPost;
    //Add a post as setup to ensure I have something to comment on
    before(function (done) {
        currentPost = new Post(validUserId, validPostTitle, validPostBody);
        let postsReq = new PostsRequest(currentPost, null, null);
        postsReq.addPost(currentPost)
            .then(response => {
                currentPost.id = response.body.id;
                validComment = new Comment(currentPost.id, validCommentName, validCommentEmail, validCommentStr);
                done();
            })
            .catch(error => { return error });
    });
    //For teardown, remove post I created for testing
    after(function () {
        let postsReq = new PostsRequest(currentPost, null, null);
        postsReq.removePost()
            .then(response => { })
            .catch(error => { return error });
    })

    describe('#getComments', function () {
        context('with a valid postId', function () {
            it('should return at least one comment', function (done) {
                let req = new CommentRequest(validPostId, null, null);
                req.getComments()
                    .then(response => {
                        expect(response.body).to.be.an('array').with.lengthOf.at.least(1);
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        });

        context('with an invalid postId', function () {
            it('should respond with a 404', function (done) {
                let req = new CommentRequest(invalidPostId, null, null);
                req.getComments()
                    .then(response => {
                        expect(response.status).to.be.equal(404);
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        })
    })
})