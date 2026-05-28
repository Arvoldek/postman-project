// Common test utility functions
// These functions can be used across multiple test files

/**
 * Verify HTTP status code
 * @param {Object} pm - Postman test context
 * @param {number} expectedStatus - Expected status code
 */
function verifyStatusCode(pm, expectedStatus) {
    pm.test(`Status code is ${expectedStatus}`, function() {
        pm.response.to.have.status(expectedStatus);
    });
}

/**
 * Verify response is JSON
 * @param {Object} pm - Postman test context
 */
function verifyJsonResponse(pm) {
    pm.test("Response is JSON", function() {
        pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
    });
}

/**
 * Verify response time is within acceptable range
 * @param {Object} pm - Postman test context
 * @param {number} maxTime - Maximum acceptable response time in ms
 */
function verifyResponseTime(pm, maxTime = 500) {
    pm.test(`Response time is less than ${maxTime}ms`, function() {
        pm.expect(pm.response.responseTime).to.be.below(maxTime);
    });
}

/**
 * Verify object has all required properties
 * @param {Object} pm - Postman test context
 * @param {Object} obj - Object to check
 * @param {string[]} requiredProps - Array of required property names
 */
function verifyRequiredProperties(pm, obj, requiredProps) {
    requiredProps.forEach(prop => {
        pm.test(`Object has property: ${prop}`, function() {
            pm.expect(obj).to.have.property(prop);
        });
    });
}

/**
 * Verify array contains objects with required properties
 * @param {Object} pm - Postman test context
 * @param {Array} arr - Array of objects to check
 * @param {string[]} requiredProps - Array of required property names
 */
function verifyArrayOfObjects(pm, arr, requiredProps) {
    pm.test("Response is array", function() {
        pm.expect(arr).to.be.an('array');
    });

    pm.test("Array is not empty", function() {
        pm.expect(arr).to.have.lengthOf.at.least(1);
    });

    arr.forEach((item, index) => {
        pm.test(`Item ${index} has all required properties`, function() {
            requiredProps.forEach(prop => {
                pm.expect(item).to.have.property(prop);
            });
        });
    });
}

/**
 * Log request and response information for debugging
 * @param {Object} pm - Postman test context
 */
function logRequestResponse(pm) {
    console.log('Request URL:', pm.request.url.toString());
    console.log('Request Method:', pm.request.method);
    console.log('Request Headers:', pm.request.headers);
    console.log('Request Body:', pm.request.body ? pm.request.body.raw : 'None');
    console.log('Response Status:', pm.response.code);
    console.log('Response Headers:', pm.response.headers);
    console.log('Response Body:', pm.response.text());
}

/**
 * Generate a random string
 * @param {number} length - Length of random string
 * @returns {string} Random string
 */
function generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Generate a random UUID
 * @returns {string} Random UUID
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = {
    verifyStatusCode,
    verifyJsonResponse,
    verifyResponseTime,
    verifyRequiredProperties,
    verifyArrayOfObjects,
    logRequestResponse,
    generateRandomString,
    generateUUID
};
