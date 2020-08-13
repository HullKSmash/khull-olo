const PostsRequest = require('../http_clients/postsClient').PostsRequest;
const Post = require('../http_clients/postsClient').Post;
const CommentReq = require('../http_clients/commentClient').CommentRequest;
const Comment = require('../http_clients/commentClient').Comment;
const testData = require('./test-data.json');
const { CommentRequest } = require('../http_clients/commentClient');
const expect = require('chai').expect;

const validUserId = testData.userIds.validUserId;
const validPostTitle = testData.postData.validPostTitle;
const validPostBody = testData.postData.validPostBody;
const validPostId = testData.postIds.validPostId;
const invalidPostId = testData.postIds.invalidPostId;
const validPostTitleEdited = testData.postData.validPostTitleEdited;
const validCommentStr = testData.commentData.validCommentStr;
const validCommentName = testData.commentData.validName;
const validCommentEmail = testData.commentData.validEmail;

describe('CommentPostIntegrationTests', function () {
    describe('#getAddedComments', function () {

        var validComment;
        var currentPost;

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

        /*The current post ID won't be valid on the getComments in this application's context, 
         * but normally I would use currentPostId to add the comment as well as retrieve it 
         */
        context('add a comment, then retrieve comments from that post', function () {
            it('should return the comment I posted', function (done) {
                let commentReq = new CommentRequest(currentPost.id, null, null);
                let postsReq = new PostsRequest(null, null);
                postsReq.commentOnPost(validComment)
                    .then(response => {
                        commentReq.getComments(validComment.postId)
                            .then(response => {
                                expect(response.body).to.be.an('array').with.lengthOf.at.least(1);//make a stronger assertion here
                                done();
                            })
                            .catch(error => { return done(error) });
                    })
                    .catch(error => { return error });
            })
        });

        context('get comments from a deleted post', function () {
            it('should return a 404', function (done) {
                let commentReq = new CommentRequest(currentPost.id, null, null);
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