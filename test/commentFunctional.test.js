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

    let currentPostWithComments;
    let currentPostWithoutComments;

    //Setup: add a post to comment on and one to have no comments
    before(function (done) {
        currentPostWithComments = new Post(validUserId, validPostTitle, validPostBody);
        let postsReq = new PostsRequest(null, null);
        postsReq.addPost(currentPostWithComments)
            .then(response => {
                currentPostWithComments.id = response.body.id;
                validComment = new Comment(currentPostWithComments.id, validCommentName, validCommentEmail, validCommentStr);
                postsReq.commentOnPost(validComment)
                .then(response => {});

                currentPostWithoutComments = new Post(validUserId, validPostTitle, validPostBody);
                postsReq.addPost(currentPostWithoutComments)
                    .then(response => {
                        currentPostWithoutComments.id = response.body.id;
                        done();
                    })
                    .catch(error => { return done(error) });
            })
            .catch(error => { return done(error) });
    });

    //For teardown, remove post I created for testing
    after(function () {
        let postsReq = new PostsRequest(null, null);
        postsReq.removePost(currentPostWithComments.id)
            .then(response => { })
            .catch(error => { return error });
    })

    //In a real application, I would use the post ID that I created during setup and know exactly how many
    //comments it should have.  That won't work here, so some tests fail or pass purely as a result of this 
    //functional limitation.
    describe('#getComments', function () {
        context('from a valid post that has a comment', function () {
            it('should return one comment @regression', function (done) {
                let commentReq = new CommentRequest(validPostId, null, null);
                commentReq.getComments()
                    .then(response => {
                        expect(response.body).to.be.an('array').with.lengthOf(1);//update to get the comment I added
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        });

        context('with an invalid postId', function () {
            it('should respond with a 404 @regression', function (done) {
                let commentReq = new CommentRequest(invalidPostId, null, null);
                commentReq.getComments()
                    .then(response => {
                        expect(response.status).to.be.equal(404);
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        })

        context('from a valid post that has no comments', function () {
            it('should return an empty array @regression', function (done) {
                let commentReq = new CommentRequest(currentPostWithoutComments.id, null, null);
                commentReq.getComments(currentPostWithoutComments.id)
                    .then(response => {
                        expect(response.body).to.be.an('array').with.lengthOf(0);
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        })

        context('requesting XML response', function() {
            it('should return XML content type', function(done) {
                let reqHeader = {"Accept": "Application/XML"};
                let commentReq = new CommentRequest(validPostId, reqHeader, null);
                commentReq.getComments(validPostId)
                    .then(response => {
                        console.log(response.headers.get('content-type'));
                        expect(response.headers.get('content-type')).to.be.equal('application/xml; charset=utf-8');
                        done();
                    })
                    .catch(error => { return done(error) });
            })
        })
    })
})