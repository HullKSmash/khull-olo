What this is:

This is a suite of a sampling of tests writte in Node.js for the following enpoints, which are implemented in a mock fashion on https://jsonplaceholder.typicode.com/ :

	•GET https://jsonplaceholder.typicode.com/posts
	•POST https://jsonplaceholder.typicode.com/posts
	•PUT https://jsonplaceholder.typicode.com/posts/{postId}
	•DELETE https://jsonplaceholder.typicode.com/posts/{postId}
	•POST https://jsonplaceholder.typicode.com/posts/{postId}/comments 
	•GET https://jsonplaceholder.typicode.com/comments?postId={postId}

Dependencies

The following dependencies must be installed in order to run these tests:

	Node and npm
		Installation details can be found here: 
		https://docs.npmjs.com/downloading-and-installing-node-js-and-npm		
	node-fetch
		https://www.npmjs.com/package/node-fetch
	Mocha
		https://mochajs.org/
	Chai
		https://www.chaijs.com/

About Mocha

The suite uses the Mocha test framework, which is documented in detail here: https://mochajs.org

As a quick overview, Mocha implements the following conventions that you'll see in the tests:

"Describe" is used to group tests together in a block with a semantic name.
"Context" is used as a descriptor for the conditions of a test or group of tests, denoted with a semantic description.
"It" is used to specify a test case, with a semantic expression of the expected behavior.

Chai expect statements are used to make assertions within test cases.

Some tests are tagged with '@regression'.  This illustrates an example of some tests that could be recommended to run as part of a recurring regression suite, compared to deeper functional tests that may be run during development of or upon changes to the endpoint under test.  (More on this below.)

How to Run the Tests

Once dependencies are installed, the tests can be executed from the khull-olo directory with the following commands:

For all tests:

	mocha

Or

	npm test

To run only regression tests:

	mocha --grep @regression

The Application Under Test

The JSONPlaceholder application is a mock application with several API endpoints exposed.  The application does not allow for creation, alteration, or removal of data on its server.  Consequently, otherwise valid requests to do so provide a mock confirmation, but the specified changes cannot be observed through subsequent requests that would normally take place in a test suite to verify those changes.  

I chose to approach testing this application as if it were a production application intended to have the capability to act on requests accordingly.  (E.g. the ability to add a post through the appropriate endpoint.)  I felt this better displayed how I would approach testing of a fully functional application.  Due to the application's limitations, many tests fail validation of data creation or alteration.

Which Tests Are Here

The tests here are a small subset of what would be considered a full test plan for these endpoints.  The limitations of this mock application's funcationality, mentioned previously, impacted which tests were feasible to implement here, as well as the lack of specifications on expected behavior around many negative tests and edge cases.  Similiarly, only functional tests are seen here.

A more robust collection of tests that would better display a full test plan can be found in the provided "Test Plan" documentation.
