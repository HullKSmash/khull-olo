const req = require ('../http_clients/postsClient');
var assert = require('chai').assert;
var expect = require('chai').expect;
/**Note: Using assert for simplicity, especially in multi-assertion cases,
 * and writing results to a JSON file.
 * In a real-world scenario, these tests would report successes 
 * and failures through a frameworkd or out to something like the TestRail API.
*/

//import test data

//Generic case pass function
//In a real-world scenario, this would report out to something like the TestRail API
/* function passCase(functionName, caseName) {
    console.log(`PASS - ${functionName} - ${caseName}`);
}

//Generic fail function - log FAIL, function name, case, observed behavior vs expected, 
function failCase(functionName, caseName, expectedMsg, observedMsg) {
    let info = `Expected behavior: 
    ${expectedMsg}
    Observed behavior: 
    ${observedMsg}`;
    console.log(`FAIL - ${functionName} - ${caseName}`); 
}*/

//Add posts


//Get posts
function getValidPost_assertReturned(postId) {
    req.getPosts(postId, null, null)
    .then(response => {
        expect(parseInt(response.status)).to.equal(200);
        expect(response.body.id).to.equal(postId);
        //write success to a json file
    })
    .catch(error => {return error});
}

function getInvalidPost_assertNotReturned(postId) {
    req.getPosts(postId, null, null)
    .then(response => {
        expect(parseInt(response.status)).to.equal(404);
    })
    .catch(error => {return error});
}

function getAllPosts_assertReturned() {
    req.getPosts(null, null, null)
    .then(response => {
        assert.equal(parseInt(response.status), 200, 'Failure in status code on getAllPosts_assertReturned');
        expect(response.body).to.not.be.empty;
    })
    .catch(error => {return error});
}
/* Would have tests around maximum number of results returned and/or pagination of large volume of results.
 * These aren't supported by this project and a static number of results exists, but a production application 
 * would need to address this. 
 */
//Edit post

//Delete post

//Comment on post

getValidPost_assertReturned(1); //use testData.validPostId instead of hardcoding a 1 here
getAllPosts_assertReturned();

getInvalidPost_assertNotReturned(999999999999); //use testData.invalidPostId instead of hardcoding here