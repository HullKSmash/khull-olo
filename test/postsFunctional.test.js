/**
 * Functional tests for the JSONPlaceholder posts endpoint.  This represents
 * a subset of tests; a fuller list can be found in the test plan document.
 * The mocked nature of the application impacts the failure and success of 
 * several of these tests.
*/
const PostsRequest = require('../http_clients/postsClient').PostsRequest;
const Post = require('../http_clients/postsClient').Post;
const Comment = require('../http_clients/commentClient').Comment;
const testData = require('./test-data.json');
var expect = require('chai').expect;

//Test input data is maintained in an external JSON file and imported here
const validUserId = testData.userIds.validUserId;
const validPostTitle = testData.postData.validPostTitle;
const validPostBody = testData.postData.validPostBody;
const validPostId = testData.postIds.validPostId;
const invalidPostId = testData.postIds.invalidPostId;
const validCommentStr = testData.commentData.validCommentStr;
const validCommentName = testData.commentData.validCommentName;
const validCommentEmail = testData.commentData.validCommentEmail;

describe('Posts', function () {

    describe('#getPosts', function () {

        let currentPost;
        let validComment;

        //Add a post as setup for this block of tests; use that post for 
        //later interactions (some of this is mocked as adding tests is not possible
        //in this application)
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

        //After this block runs, delete the post I added as setup
        after(function (done) {
            let postsReq = new PostsRequest(currentPost, null);
            postsReq.removePost(currentPost)
                .then(response => { done() })
                .catch(error => { return done(error) });

        });

        //Get a post with a valid ID = a "happy path" case
        context('with a valid post ID', function () {
            it('should return the post I requested @regression', function (done) {
                let postsReq = new PostsRequest(currentPost, null);
                postsReq.getPosts(validPostId, null, null)
                    .then(response => {
                        expect(parseInt(response.body.id)).to.be.equal(validPostId);
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        });

        //Negative test case
        context('with an invalid post ID', function () {
            it('should return a 404 @regression', function (done) {
                let postsReq = new PostsRequest(null);
                postsReq.getPosts(invalidPostId, null, null)
                    .then(response => {
                        expect(parseInt(response.status)).to.be.equal(404);
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        });

        //In this case, I know there are exactly 100 posts and expect them all to be returned
        context('all available posts', function () {
            it('should return all available posts @regression', function (done) {
                let postsReq = new PostsRequest(null);
                postsReq.getPosts(null, null, null)
                    .then(response => {
                        expect(response.body).to.be.an('array').with.lengthOf(100);
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        });
    });

    describe('#editPost', function () {

        let currentPost;

        //Add a post and use it for editing test cases
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

        //After this block runs, delete the post I added as setup
        after(function (done) {
            let postsReq = new PostsRequest(currentPost, null);
            postsReq.removePost(currentPost.id)
                .then(response => { done() })
                .catch(error => { return done(error) });
        });

        //"Happy path" case
        context('edit title with a valid postId', function () {
            it('should return post with updated title @regression', function (done) {
                let editedPost = new Post(validUserId, validPostTitle, validPostBody);
                let postsReq = new PostsRequest(editedPost, null, null);
                postsReq.editPost(currentPost.id, editedPost)
                    .then(response => {
                        expect(response.body.title).to.be.equal(editedPost.title);
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        });

        //Negative test case
        context('edit title with an invalid postId', function () {
            it('should respond with a 404 @regression', function (done) {
                let editedPost = new Post(validUserId, validPostTitle, validPostBody);
                let postsReq = new PostsRequest(editedPost, null, null);
                postsReq.editPost(invalidPostId, editedPost)
                    .then(response => {
                        expect(response.status).to.be.equal(404);
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        });
    })

    describe('#deletePost', function () {

        let currentPost;

        //Add a post to use for this block of tests
        before(function (done) {
            currentPost = new Post(validUserId, validPostTitle, validPostBody);
            let postsReq = new PostsRequest(currentPost, null, null);
            postsReq.addPost()
                .then(response => {
                    currentPost.id = response.body.id;
                    validComment = new Comment(currentPost.id, validCommentName, validCommentEmail, validCommentStr);
                    done();
                })
                .catch(error => { return done(error) });
        });

        //After this block runs, delete the post I added as setup
        after(function (done) {
            let postsReq = new PostsRequest(currentPost, null);
            postsReq.removePost(currentPost)
                .then(response => { done() })
                .catch(error => { return done(error) });
        });

        //"Happy path" case
        describe('#deleteAPost', function () {
            context('with a valid postId', function () {
                it('should respond with a 200 @regression', function (done) { //is there a stronger assertion I can make here?
                    let postsReq = new PostsRequest(currentPost, null, null);
                    postsReq.removePost()
                        .then(response => {
                            expect(response.status).to.be.equal(200);
                            done();
                        })
                        .catch(error => { return done(error) });
                })
            });

            //Negative case
            context('with an invalid postId', function () {
                it('should respond with a 400 @regression', function (done) {
                    let invalidPost = new Post();
                    invalidPost.id = invalidPostId;
                    let postsReq = new PostsRequest(invalidPost, null, null);
                    req.removePost()
                        .then(response => {
                            expect(response.status).to.be.equal(404);
                            done();
                        })
                        .catch(error => { return done(error) });
                })
            });
        })
    })
});
