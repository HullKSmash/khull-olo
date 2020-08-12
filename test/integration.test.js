const postsReq = require('../http_clients/postsClient');
const commentReq= require('../http_clients/commentClient');

const expect = require('chai').expect;

var validUserId = 1;
var validPostTitle = 'test';
var validPostBody = 'test';
var validPostId = 1;
var invalidPostId = 101; //Found a 500 error on editing when this number is not valid
var validPostTitleEdited = 'test edited';
var validCommentStr = 'test';

describe('CommentPostIntegrationTests', function() {
    describe('#getAddedComments', function() {
        
        let currentPostId;
        
        before(function() {
            postsReq.addPost(null, validPostTitle, validPostBody, validUserId)
            .then(response => {
                currentPostId = response.body.id;
            })
            .catch(error => {return error});
        });

        /*The current post ID won't be valid on the getComments in this application's context, 
         * but normally I would use currentPostId to add the comment as well as retrieve it 
         */
        context('add a comment, then retrieve comments from that post', function() {
            it('should return at least one comment', function(done) {
                postsReq.commentOnPost(currentPostId, validCommentStr, null, null)
                .then(response => {
                    commentReq.getComments(validPostId, null, null)
                    .then(response => {
                        expect(response.body).to.be.an('array').with.lengthOf.at.least(1);
                        done();
                    })
                    .catch(error => {return done(error)});
                })       
                .catch(error => {return error});
            })
        });

        context('get comments from a deleted post', function() {
            it('should return a 404', function(done) {
                postsReq.commentOnPost(currentPostId, null, null)
                .then(response => {
                    postsReq.removePost(currentPostId, null, null)
                    .then(response => {
                        commentReq.getComments(invalidPostId, null, null)
                        .then(response => {
                            expect(response.status).to.be.equal(404);
                            done();
                        })
                        .catch(error => {return done(error)});
                    })
                    .catch(error => {return (error)});
                })
                .catch(error => {return (error)});
            })
        })
    })
})