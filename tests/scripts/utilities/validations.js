// Validation functions for API responses

/**
 * Validate that a value matches an expected type
 * @param {Object} pm - Postman test context
 * @param {*} value - Value to validate
 * @param {string} expectedType - Expected type (e.g., 'string', 'number', 'boolean', 'array', 'object')
 * @param {string} fieldName - Name of the field being validated
 */
function validateType(pm, value, expectedType, fieldName) {
    pm.test(`${fieldName} is of type ${expectedType}`, function() {
        switch (expectedType) {
            case 'string':
                pm.expect(value).to.be.a('string');
                break;
            case 'number':
                pm.expect(value).to.be.a('number');
                break;
            case 'boolean':
                pm.expect(value).to.be.a('boolean');
                break;
            case 'array':
                pm.expect(value).to.be.an('array');
                break;
            case 'object':
                pm.expect(value).to.be.an('object').and.not.be.an('array');
                break;
            default:
                throw new Error(`Unsupported type: ${expectedType}`);
        }
    });
}

/**
 * Validate that a string matches a regex pattern
 * @param {Object} pm - Postman test context
 * @param {string} value - String to validate
 * @param {RegExp} pattern - Regular expression pattern
 * @param {string} fieldName - Name of the field being validated
 */
function validatePattern(pm, value, pattern, fieldName) {
    pm.test(`${fieldName} matches pattern ${pattern}`, function() {
        pm.expect(value).to.match(pattern);
    });
}

/**
 * Validate that a string is a valid email address
 * @param {Object} pm - Postman test context
 * @param {string} value - Email to validate
 * @param {string} fieldName - Name of the field being validated
 */
function validateEmail(pm, value, fieldName) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    pm.test(`${fieldName} is a valid email address`, function() {
        pm.expect(value).to.match(emailPattern);
    });
}

/**
 * Validate that a string is a valid URL
 * @param {Object} pm - Postman test context
 * @param {string} value - URL to validate
 * @param {string} fieldName - Name of the field being validated
 */
function validateUrl(pm, value, fieldName) {
    try {
        new URL(value);
        pm.test(`${fieldName} is a valid URL`, function() {
            pm.expect(true).to.be.true;
        });
    } catch (e) {
        pm.test(`${fieldName} is a valid URL`, function() {
            pm.expect(false).to.be.true;
        });
    }
}

/**
 * Validate that a number is within a range
 * @param {Object} pm - Postman test context
 * @param {number} value - Number to validate
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @param {string} fieldName - Name of the field being validated
 */
function validateRange(pm, value, min, max, fieldName) {
    pm.test(`${fieldName} is between ${min} and ${max}`, function() {
        pm.expect(value).to.be.at.least(min).and.at.most(max);
    });
}

/**
 * Validate that a string has minimum length
 * @param {Object} pm - Postman test context
 * @param {string} value - String to validate
 * @param {number} minLength - Minimum length
 * @param {string} fieldName - Name of the field being validated
 */
function validateMinLength(pm, value, minLength, fieldName) {
    pm.test(`${fieldName} has minimum length of ${minLength}`, function() {
        pm.expect(value).to.have.lengthOf.at.least(minLength);
    });
}

/**
 * Validate that a string has maximum length
 * @param {Object} pm - Postman test context
 * @param {string} value - String to validate
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Name of the field being validated
 */
function validateMaxLength(pm, value, maxLength, fieldName) {
    pm.test(`${fieldName} has maximum length of ${maxLength}`, function() {
        pm.expect(value).to.have.lengthOf.at.most(maxLength);
    });
}

/**
 * Validate that a string contains a substring
 * @param {Object} pm - Postman test context
 * @param {string} value - String to validate
 * @param {string} substring - Substring to check for
 * @param {string} fieldName - Name of the field being validated
 */
function validateContains(pm, value, substring, fieldName) {
    pm.test(`${fieldName} contains '${substring}'`, function() {
        pm.expect(value).to.include(substring);
    });
}

/**
 * Validate that a string starts with a prefix
 * @param {Object} pm - Postman test context
 * @param {string} value - String to validate
 * @param {string} prefix - Prefix to check for
 * @param {string} fieldName - Name of the field being validated
 */
function validateStartsWith(pm, value, prefix, fieldName) {
    pm.test(`${fieldName} starts with '${prefix}'`, function() {
        pm.expect(value).to.startWith(prefix);
    });
}

/**
 * Validate that a string ends with a suffix
 * @param {Object} pm - Postman test context
 * @param {string} value - String to validate
 * @param {string} suffix - Suffix to check for
 * @param {string} fieldName - Name of the field being validated
 */
function validateEndsWith(pm, value, suffix, fieldName) {
    pm.test(`${fieldName} ends with '${suffix}'`, function() {
        pm.expect(value).to.endWith(suffix);
    });
}

/**
 * Validate that an array contains at least N items
 * @param {Object} pm - Postman test context
 * @param {Array} array - Array to validate
 * @param {number} minItems - Minimum number of items
 * @param {string} fieldName - Name of the field being validated
 */
function validateArrayMinLength(pm, array, minItems, fieldName) {
    pm.test(`${fieldName} has at least ${minItems} items`, function() {
        pm.expect(array).to.have.lengthOf.at.least(minItems);
    });
}

/**
 * Validate that an array contains exactly N items
 * @param {Object} pm - Postman test context
 * @param {Array} array - Array to validate
 * @param {number} exactItems - Exact number of items
 * @param {string} fieldName - Name of the field being validated
 */
function validateArrayLength(pm, array, exactItems, fieldName) {
    pm.test(`${fieldName} has exactly ${exactItems} items`, function() {
        pm.expect(array).to.have.lengthOf(exactItems);
    });
}

/**
 * Validate that a value is one of a set of allowed values
 * @param {Object} pm - Postman test context
 * @param {*} value - Value to validate
 * @param {Array} allowedValues - Array of allowed values
 * @param {string} fieldName - Name of the field being validated
 */
function validateOneOf(pm, value, allowedValues, fieldName) {
    pm.test(`${fieldName} is one of [${allowedValues.join(', ')}]`, function() {
        pm.expect(value).to.be.oneOf(allowedValues);
    });
}

/**
 * Validate that a date string is in ISO 8601 format
 * @param {Object} pm - Postman test context
 * @param {string} value - Date string to validate
 * @param {string} fieldName - Name of the field being validated
 */
function validateISODate(pm, value, fieldName) {
    const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    pm.test(`${fieldName} is in ISO 8601 format`, function() {
        pm.expect(value).to.match(isoDatePattern);
    });
}

/**
 * Validate that a value is a valid UUID
 * @param {Object} pm - Postman test context
 * @param {string} value - UUID to validate
 * @param {string} fieldName - Name of the field being validated
 */
function validateUUID(pm, value, fieldName) {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    pm.test(`${fieldName} is a valid UUID`, function() {
        pm.expect(value).to.match(uuidPattern);
    });
}

module.exports = {
    validateType,
    validatePattern,
    validateEmail,
    validateUrl,
    validateRange,
    validateMinLength,
    validateMaxLength,
    validateContains,
    validateStartsWith,
    validateEndsWith,
    validateArrayMinLength,
    validateArrayLength,
    validateOneOf,
    validateISODate,
    validateUUID
};
