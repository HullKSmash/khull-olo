const req = require ('../http_clients/postsClient');
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
var invalidPostId = 101; //Found a 500 error on editing when this number is not valid
var validPostTitleEdited = 'test edited';

describe('GetPosts', function() {
    let currentPostId;
    //Add a post as setup for this block of tests
    before(function() {
        req.addPost(null, validPostTitle, validPostBody, validUserId)
        .then(response => {
            currentPostId = parseInt(response.body.id);
        })
        .catch(error => {return error});
    })
    //After this block runs, delete the post I added as setup
    after(function() {
        req.removePost(currentPostId, null, null)
        .then(response => {})
        .catch(error => {return error});

    })

    describe('#getSinglePost()', function() {
        context('with a valid post ID', function() {
            it('should return the post I requested', function(done) {
                 req.getPosts(validPostId, null, null)
                .then(response => {
                    expect(parseInt(response.body.id)).to.be.equal(validPostId);
                    done();
                })
                .catch(error => {return done(error)}); 
            })
        });

        context('with an invalid post ID', function() {
            it('should return a 404', function(done) {
                req.getPosts(invalidPostId, null, null)
                .then(response => {
                    expect(parseInt(response.status)).to.be.equal(404);
                    done();
                })
                .catch(error => {return done(error)});
            })
        });
    });

    describe('#getAllPosts', function() {
        context('all available posts', function() {
            it('should return at least one post', function(done) {
                req.getPosts(null, null, null)
                .then(response => {
                    expect(response.body).to.be.an('array').with.lengthOf.at.least(1);
                    done();
                })
                .catch(error => {return done(error)});
            })
        })
    });
})

/* Would have tests around maximum number of results returned and/or pagination of large volume of results.
 * These aren't supported by this project and a static number of results exists, but a production application 
 * would need to address this. 
 */

//Edit post
//In this context, the application doesn't actually make the requested change, despite confirmation
//In a real application, I would verify that the returned body contained my changes instead of just 
//  checking the status code
describe('EditPost', function() {
    let currentPostId;
    //Set up: add a post to edit and capture its ID (note that this doesn't work here because the 
    // application does not add a post)
    // Here, I use the known valid and invalid data points in lieu of being able to capture and verify data
    before(function() {
        req.addPost(null, validPostTitle, validPostBody, validUserId)
        .then(response => {
            currentPostId = parseInt(response.body.id);
        })
        .catch(error => {return error});
    })
    //After this block runs, delete the post I added as setup
    after(function() {
        req.removePost(currentPostId, null, null)
        .then(response => {})
        .catch(error => {return error});

    })

    describe('#editAPost', function() {
        context('edit title with a valid postId', function() {
            it('should respond with a 200', function(done) {
                req.editPost(validPostId, null, validPostTitleEdited)
                .then(response => {
                    expect(response.status).to.be.equal(200);
                    done();
                })
                .catch(error => {return done(error)});
            })
        });
        //This test case throws a 500
        context('edit title with an invalid postId', function() {
            it('should respond with a 404', function(done) {
                req.editPost(invalidPostId, null, validPostTitleEdited)
                .then(response => {
                    expect(response.status).to.be.equal(404);
                    done();
                })
                .catch(error => {return done(error)});
            })
        });
    })
})

//Delete post
describe('DeletePost', function() {
    describe('#deleteAPost', function() {
        context('with a valid postId', function() {
            it('should respond with a 200', function(done) {
                req.removePost(validPostId, null, null)
                .then(response => {
                    expect(response.status).to.be.equal(200);
                    done();
                })
                .catch(error => {return done(error)});
            })
        });

        context('with an invalid postId', function() {
            it('should respond with a 400', function(done) {
                req.removePost(invalidPostId, null, null)
                .then(response => {
                    expect(response.status).to.be.equal(404);
                    done();
                })
                .catch(error => {return done(error)});
            })
        });
    })
})

//Comment on post
