const req = require('../http_clients/commentClient');
const postsReq = require('../http_clients/postsClient');
var assert = require('chai').assert;
var expect = require('chai').expect;
/**Note: Using Mocha for simplicity in reporting to the command line.
 * In a real-world scenario, these tests would report successes 
 * and failures through a frameworkd or out to something like the TestRail API.
*/

//Define test data
var validUserId = 1;
var validPostTitle = 'test';
var validPostBody = 'test';
var validPostId = 1;
var invalidPostId = 101;
var validPostTitleEdited = 'test edited';

//Get comments on a valid post
//Get comments on an invalid post

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