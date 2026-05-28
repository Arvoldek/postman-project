// Test scripts for Users resource
// These scripts can be referenced from Postman collection test tabs
// or used as utility functions

/**
 * Test GET all users response
 * @param {Object} pm - Postman test context
 */
function testGetAllUsers(pm) {
    pm.test("Status code is 200", function() {
        pm.response.to.have.status(200);
    });

    pm.test("Response is array", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.be.an('array');
    });

    pm.test("Response has users", function() {
        const jsonData = pm.response.json();
        pm.expect(jsonData).to.have.lengthOf.at.least(1);
    });

    pm.test("Each user has required fields", function() {
        const jsonData = pm.response.json();
        jsonData.forEach(user => {
            pm.expect(user).to.have.property('id');
            pm.expect(user).to.have.property('name');
            pm.expect(user).to.have.property('username');
            pm.expect(user).to.have.property('email');
        });
    });
}

/**
 * Test GET single user response
 * @param {Object} pm - Postman test context
 */
function testGetSingleUser(pm) {
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
        pm.expect(jsonData).to.have.property('name');
        pm.expect(jsonData).to.have.property('username');
        pm.expect(jsonData).to.have.property('email');
    });
}

/**
 * Test GET non-existent user response
 * @param {Object} pm - Postman test context
 */
function testGetNonExistentUser(pm) {
    pm.test("Status code is 404", function() {
        pm.response.to.have.status(404);
    });
}

module.exports = {
    testGetAllUsers,
    testGetSingleUser,
    testGetNonExistentUser
};
