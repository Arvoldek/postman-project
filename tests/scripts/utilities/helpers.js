// Helper functions for test automation

/**
 * Parse JSON response safely
 * @param {Object} response - Postman response object
 * @returns {Object|Array|null} Parsed JSON or null if invalid
 */
function safeJsonParse(response) {
    try {
        return response.json();
    } catch (e) {
        console.error('Error parsing JSON:', e);
        return null;
    }
}

/**
 * Get nested property from object using dot notation
 * @param {Object} obj - Source object
 * @param {string} path - Dot-separated path to property
 * @returns {*} Property value or undefined
 */
function getNestedProperty(obj, path) {
    return path.split('.').reduce((acc, part) => {
        if (acc === null || acc === undefined) return undefined;
        return acc[part];
    }, obj);
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is empty
 */
function isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge multiple objects deeply
 * @param {...Object} objects - Objects to merge
 * @returns {Object} Merged object
 */
function deepMerge(...objects) {
    const result = {};
    for (const obj of objects) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    result[key] = deepMerge(result[key] || {}, obj[key]);
                } else {
                    result[key] = obj[key];
                }
            }
        }
    }
    return result;
}

/**
 * Convert object to query string
 * @param {Object} params - Query parameters
 * @returns {string} Query string
 */
function toQueryString(params) {
    return Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

/**
 * Wait for a specified amount of time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after the delay
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} initialDelay - Initial delay in ms
 * @returns {Promise} Promise that resolves with function result or rejects after max retries
 */
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 100) {
    let retries = 0;
    let delay = initialDelay;

    while (retries < maxRetries) {
        try {
            return await fn();
        } catch (error) {
            retries++;
            if (retries >= maxRetries) {
                throw error;
            }
            await sleep(delay);
            delay *= 2; // Exponential backoff
        }
    }
}

/**
 * Check if two objects are deeply equal
 * @param {Object} obj1 - First object
 * @param {Object} obj2 - Second object
 * @returns {boolean} True if objects are deeply equal
 */
function deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Filter object properties by prefix
 * @param {Object} obj - Source object
 * @param {string} prefix - Property prefix to filter by
 * @returns {Object} Filtered object
 */
function filterByPrefix(obj, prefix) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && key.startsWith(prefix)) {
            result[key] = obj[key];
        }
    }
    return result;
}

module.exports = {
    safeJsonParse,
    getNestedProperty,
    isEmpty,
    deepClone,
    deepMerge,
    toQueryString,
    sleep,
    retryWithBackoff,
    deepEqual,
    filterByPrefix
};
