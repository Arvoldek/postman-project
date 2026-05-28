// Test scripts for Comments resource
// These scripts can be referenced from Postman collection test tabs
// or used as utility functions

/**
 * Test GET all comments response
 * @param {Object} pm - Postman test context
 */
function testGetAllComments(pm) {
    pm.test("Status code is 200", function() {
        pm.response.to.have.status(200);
    });

    pm.test("Response is array", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('array');
    });

    pm.test("Response has comments", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.lengthOf.at.least(1);
    });

    pm.test("Each comment has required fields", function() {
        const jsonData = pm.response.json();
        jsonData.forEach(comment => {
            pm.expect(comment).to.have.property('id');
            pm.expect(comment).to.have.property('postId');
            pm.expect(comment).to.have.property('name');
            pm.expect(comment).to.have.property('email');
            pm.expect(comment).to.have.property('body');
        });
    });
}

/**
 * Test GET comments by post ID response
 * @param {Object} pm - Postman test context
 */
function testGetCommentsByPost(pm) {
    pm.test("Status code is 200", function() {
        pm.response.to.have.status(200);
    });

    pm.test("Response is array", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('array');
    });

    pm.test("All comments belong to specified post", function() {
        const jsonData = pm.response.json();
        const postId = pm.request.url.query.get('postId');
        jsonData.forEach(comment => {
            pm.expect(comment.postId).to.equal(Number(postId));
        });
    });
}

/**
 * Test GET single comment response
 * @param {Object} pm - Postman test context
 */
function testGetSingleComment(pm) {
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
        pm.expect(jsonData).to.have.property('postId');
        pm.expect(jsonData).to.have.property('name');
        pm.expect(jsonData).to.have.property('email');
        pm.expect(jsonData).to.have.property('body');
    });
}

module.exports = {
    testGetAllComments,
    testGetCommentsByPost,
    testGetSingleComment
};
