// Test scripts for Posts resource
// These scripts can be referenced from Postman collection test tabs
// or used as utility functions

/**
 * Test GET all posts response
 * @param {Object} pm - Postman test context
 */
function testGetAllPosts(pm) {
    pm.test("Status code is 200", function() {
        pm.response.to.have.status(200);
    });

    pm.test("Response time is less than 500ms", function() {
        pm.expect(pm.response.responseTime).to.be.below(500);
    });

    pm.test("Response is array", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('array');
    });

    pm.test("Response has posts", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.lengthOf.at.least(1);
    });

    pm.test("Each post has required fields", function() {
        const jsonData = pm.response.json();
        jsonData.forEach(post => {
            pm.expect(post).to.have.property('id');
            pm.expect(post).to.have.property('userId');
            pm.expect(post).to.have.property('title');
            pm.expect(post).to.have.property('body');
        });
    });
}

/**
 * Test GET single post response
 * @param {Object} pm - Postman test context
 */
function testGetSinglePost(pm) {
    pm.test("Status code is 200", function() {
        pm.response.to.have.status(200);
    });

    pm.test("Response is object", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('object');
    });

    pm.test("Response has required fields", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('id');
        pm.expect(jsonData).to.have.property('userId');
        pm.expect(jsonData).to.have.property('title');
        pm.expect(jsonData).to.have.property('body');
    });
}

/**
 * Test POST create post response
 * @param {Object} pm - Postman test context
 */
function testCreatePost(pm) {
    pm.test("Status code is 201", function() {
        pm.response.to.have.status(201);
    });

    pm.test("Response contains ID", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('id');
        pm.expect(jsonData.id).to.be.a('number');
    });

    pm.test("Response contains title", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.property('title');
        pm.expect(jsonData.title).to.equal(pm.variables.get('title'));
    });

    pm.test("Store created post ID for cleanup", function() {
        const jsonData = pm.response.json();
        pm.collectionVariables.set('createdPostId', jsonData.id);
    });
}

/**
 * Test DELETE post response
 * @param {Object} pm - Postman test context
 */
function testDeletePost(pm) {
    pm.test("Status code is 200", function() {
        pm.response.to.have.status(200);
    });

    pm.test("Verify post no longer exists", function() {
        pm.sendRequest({
            url: `${pm.variables.get('baseUrl')}/posts/${pm.variables.get('createdPostId')}`,
            method: 'GET'
        }, function(err, res) {
            pm.expect(res.code).to.equal(404);
        });
    });
}

module.exports = {
    testGetAllPosts,
    testGetSinglePost,
    testCreatePost,
    testDeletePost
};
