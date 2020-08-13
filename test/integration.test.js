/**
 * Functional tests for the integration of JSONPlaceholder comment and 
 * posts endpoints.  This represents a subset of tests; a fuller list can 
 * be found in the test plan document. The mocked nature of the application 
 * impacts the failure and success of several of these tests.
*/
const PostsRequest = require('../http_clients/postsClient').PostsRequest;
const Post = require('../http_clients/postsClient').Post;
const CommentReq = require('../http_clients/commentClient').CommentRequest;
const Comment = require('../http_clients/commentClient').Comment;
const testData = require('./test-data.json');
const expect = require('chai').expect;

//Test input data is maintained in an external JSON file and imported here
const validUserId = testData.userIds.validUserId;
const validPostTitle = testData.postData.validPostTitle;
const validPostBody = testData.postData.validPostBody;
const invalidPostId = testData.postIds.invalidPostId;
const validCommentStr = testData.commentData.validCommentStr;
const validCommentName = testData.commentData.validName;
const validCommentEmail = testData.commentData.validEmail;

describe('CommentPostIntegrationTests', function () {

    let validComment;
    let currentPost;

    describe('#getAddedComments', function () {

        //For setup, add a post that I can comment on
        before(function (done) {
            currentPost = new Post(validUserId, validPostTitle, validPostBody);
            let postsReq = new PostsRequest(currentPost, null, null);
            postsReq.addPost(currentPost)
                .then(response => {
                    currentPost.id = response.body.id;
                    validComment = new Comment(currentPost.id, validCommentName, validCommentEmail, validCommentStr);
                    done();
                })
                .catch(error => { return done(error) });
        });

        //For teardown, remove the post I created
        after(function (done) {
            let postsReq = new PostsRequest(currentPost, null);
            postsReq.removePost(currentPost)
                .then(response => { done() })
                .catch(error => { return done(error) });

        });

        /*
         * The current post ID won't be valid on the getComments in this application's context, 
         * but normally I would use currentPostId to add the comment as well as retrieve it.
         * To better demonstrate the intended function of the test, I've used validComment data. 
         */
        context('add a comment, then retrieve comment from that post', function () {
            it('should return the comment I posted @regression', function (done) {
                let commentReq = new CommentReq(currentPost.id, null, null);
                let postsReq = new PostsRequest(null, null);
                postsReq.commentOnPost(validComment)
                    .then(response => {
                        commentReq.getComments(validComment.postId)
                            .then(response => {
                                expect(response.body.title).to.be.equal(validComment.title);
                                expect(response.body.name).to.be.equal(validComment.name);
                                expect(response.body.email).to.be.equal(validComment.email);
                                expect(response.body.body).to.be.equal(validComment.body);
                                done();
                            })
                            .catch(error => { return done(error) });
                    })
                    .catch(error => { return done(error) });
            })
        });

        //A negative test case
        context('get comments from a deleted post', function () {
            it('should return a 404 @regression', function (done) {
                let commentReq = new CommentReq(currentPost.id, null, null);
                let postsReq = new PostsRequest(currentPost, null, null);
                postsReq.commentOnPost(validComment)
                    .then(response => {
                        postsReq.removePost(currentPost.id)
                            .then(response => {
                                commentReq.getComments(invalidPostId)
                                    .then(response => {
                                        expect(response.status).to.be.equal(404);
                                        done();
                                    })
                                    .catch(error => { return done(error) });
                            })
                            .catch(error => { return done(error) });
                    })
                    .catch(error => { return done(error) });
            })
        })
    })
})