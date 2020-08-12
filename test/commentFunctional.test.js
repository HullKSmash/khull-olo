const req = require('../http_clients/commentClient');
const postsReq = require('../http_clients/postsClient');
const testData = require('./test-data.json');
var expect = require('chai').expect;

/**Note: Using Mocha for simplicity in reporting to the command line.
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

describe('GetComments', function() {
    let currentPostId;
    //Add a post as setup to ensure I have something to comment on
    //Would use this post ID if it worked
    before(function() {
        postsReq.addPost(null, validPostTitle, validPostBody, null)
        .then(response => {
            currentPostId = parseInt(response.body.id);
        })
        .catch(error => {return error});
    })
    //For teardown, remove post I created for testing
    after(function() {
        postsReq.removePost(currentPostId, null, null)
        .then(response => {})
        .catch(error => {return error});
    })

    describe('#getComments', function() {
        context('with a valid postId', function() {
            it('should return at least one comment', function(done) {
                req.getComments(validPostId, null, null)
                .then(response => {
                    expect(response.body).to.be.an('array').with.lengthOf.at.least(1);
                    done();
                })
                .catch(error => {return done(error)});
            })
        });

        context('with an invalid postId', function() {
            it('should respond with a 404', function(done) {
                req.getComments(invalidPostId, null, null)
                .then(response => {
                    expect(response.status).to.be.equal(404);
                    done();
                })
                .catch(error => {return done(error)});
            })
        })
    })
})