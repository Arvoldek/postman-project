# JSONPlaceholder API Test Automation

> **Project:** Postman API Tests for https://jsonplaceholder.typicode.com/
> **Version:** 1.0.0
> **Last Updated:** 2026-05-28

---

## 📋 Overview

This project implements a comprehensive API test automation suite for JSONPlaceholder (a free fake API for testing) using Postman. The tests can be executed:
- Locally via Postman CLI
- In Postman application
- Automatically in GitHub Actions

---

## 🎯 Objectives

- Create maintainable API test suite for JSONPlaceholder REST API
- Ensure tests run consistently across multiple environments
- Implement CI/CD integration for automated test execution
- Follow API testing best practices and industry standards
- Generate clear, actionable test reports

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Postman](https://www.postman.com/downloads/) (optional, for manual testing)
- [Git](https://git-scm.com/) (optional, for version control)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arvoldek/postman-project.git
   cd postman-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 🏃 Running Tests

### Local Execution with Postman CLI

Run all tests with HTML report:

```bash
npm run test:html
```

Run smoke tests only:

```bash
npm run test:smoke
```

Run regression tests only:

```bash
npm run test:regression
```

Run with custom environment:

```bash
postman collection run postman/collections/jsonplaceholder.postman_collection \
  -e postman/environments/staging.postman_environment.yaml \
  --reporters cli
```

### Available npm Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests with CLI reporter |
| `npm run test:smoke` | Run smoke tests only |
| `npm run test:regression` | Run regression tests only |
| `npm run test:positive` | Run positive tests only |
| `npm run test:negative` | Run negative tests only |
| `npm run test:staging` | Run all tests against staging environment |
| `npm run test:production` | Run all tests against production environment |

---

## 🛠 Configuration

### Environment Variables

The project uses Postman environment files to manage different configurations:

| Environment | File | Base URL |
|-------------|------|----------|
| Local | `postman/environments/local.postman_environment.json` | https://jsonplaceholder.typicode.com |
| Staging | `postman/environments/staging.postman_environment.json` | https://jsonplaceholder.typicode.com |
| Production | `postman/environments/production.postman_environment.json` | https://jsonplaceholder.typicode.com |

You can create additional environments as needed by copying and modifying the existing environment files.

---

## 🔧 Test Design

### Test Case Categories

| Category | Tests | Priority |
|----------|-------|----------|
| Posts | 19 | High/Medium |
| Users | 3 | Medium |
| Comments | 3 | Medium |
| Albums/Photos | 2 | Low |
| Edge Cases | 3 | Medium/Low |
| **Total** | **30+** | - |

### Test Types

- **Positive Tests:** Verify that the API works as expected with valid inputs
- **Negative Tests:** Verify that the API handles invalid inputs and edge cases correctly
- **Smoke Tests:** Quick tests to verify basic functionality
- **Regression Tests:** Comprehensive tests to ensure no existing functionality is broken

---

## 📊 Test Coverage

### Endpoints Covered

| Resource | Endpoints | Coverage |
|----------|-----------|----------|
| Posts | GET, POST, PUT, PATCH, DELETE | 100% |
| Users | GET | 100% |
| Comments | GET | 100% |
| Albums | GET | 100% |
| Photos | GET | 100% |

### HTTP Methods Covered

- GET
- POST
- PUT
- PATCH
- DELETE

---

## 🔄 CI/CD Integration

This project uses GitHub Actions for continuous integration and automated testing.

### Workflows

1. **API Tests Workflow** (`.github/workflows/api-tests.yml`)
   - **Triggers:** Push to main branch, Pull request to main branch
   - **Features:** Auto-runs on code changes against local environment
   - **Output:** HTML reports uploaded as artifacts

2. **Manual Dispatch Workflow** (`.github/workflows/manual-dispatch.yml`)
   - **Triggers:** Manual dispatch only
   - **Inputs:**
     - `environment`: local, staging, or production
     - `test-type`: full, smoke, regression, positive, or negative
     - `iterations`: Number of test iterations (default: 1)
   - **Output:** HTML reports uploaded as artifacts

### Triggering Tests

Tests are automatically triggered on:
- Push to main branch
- Pull request to main branch

To manually trigger tests:
1. Go to the Actions tab in GitHub
2. Select the workflow you want to run
3. Click "Run workflow"
4. Select the environment and options
5. Click "Run workflow"

---

---

## 📦 Postman Collection

The main Postman collection is located at:
```
postman/collections/jsonplaceholder.postman_collection.json
```

### Collection Structure

```
JSONPlaceholder API Tests
├── Pre-request Scripts
│   └── Set Common Headers
├── Tests
│   ├── Setup
│   │   └── Before All Tests
│   ├── Posts
│   │   ├── GET
│   │   │   ├── GET All Posts
│   │   │   ├── GET Single Post
│   │   │   ├── GET Non-existent Post
│   │   │   └── GET Posts by User
│   │   ├── POST
│   │   │   ├── POST Create Valid Post
│   │   │   ├── POST Invalid Data
│   │   │   └── POST Missing Fields
│   │   ├── PUT
│   │   │   ├── PUT Update Post
│   │   │   └── PUT Non-existent Post
│   │   ├── PATCH
│   │   │   └── PATCH Partial Update
│   │   └── DELETE
│   │       ├── DELETE Existing Post
│   │       └── DELETE Non-existent Post
│   ├── Users
│   ├── Comments
│   ├── Albums
│   └── Teardown
│       └── After All Tests
└── Folders
    ├── Positive Tests
    ├── Negative Tests
    ├── Regression Tests
    └── Smoke Tests
```

---

## 🤝 Contributing

### Adding New Tests

1. Open the Postman collection in Postman
2. Add a new request to the appropriate folder
3. Add test scripts to verify the expected behavior
4. Export the collection to `postman/collections/jsonplaceholder.postman_collection.json`
5. Commit and push the changes

### Test Script Guidelines

- Use descriptive test names
- Include assertions for status codes, response structure, and data validation
- Use environment variables for configurable values
- Generate unique data for each test run when needed
- Clean up resources after tests (DELETE created posts)

### Example Test Script

```javascript
// Verify status code
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

// Verify response is array
pm.test("Response is array", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
});

// Verify response has expected length
pm.test("Response has 100 posts", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.lengthOf(100);
});

// Verify each post has required fields
pm.test("Each post has required fields", function() {
    const jsonData = pm.response.json();
    jsonData.forEach(post => {
        pm.expect(post).to.have.property('id');
        pm.expect(post).to.have.property('userId');
        pm.expect(post).to.have.property('title');
        pm.expect(post).to.have.property('body');
    });
});
```

---

## 📋 Best Practices

### Test Design

1. **Clear Naming Convention**
   - Use consistent ID format: `API-{Resource}-{Sequence}`
   - Descriptive test names
   - Include endpoint in test description

2. **Test Isolation**
   - Each test should be independent
   - Clean up resources after tests (DELETE created posts)
   - Use setup and teardown scripts

3. **Data Management**
   - Use environment variables for configuration
   - Generate unique data for each test run
   - Use fixtures for static test data

4. **Assertion Strategy**
   - Test status codes
   - Validate response structure (schema)
   - Verify data types and formats
   - Check response times

5. **Error Handling**
   - Test both positive and negative scenarios
   - Verify appropriate error messages
   - Check error response structure

### Postman Best Practices

1. **Collection Organization**
   - Use folders to group related tests
   - Add clear descriptions to requests
   - Document pre-requisites and dependencies

2. **Environment Management**
   - Use environments for different stages
   - Never hardcode URLs or credentials
   - Use variables for all configurable values

3. **Script Organization**
   - Use pre-request scripts for setup
   - Keep test scripts focused and simple
   - Extract common functions to utility scripts

---

## 🔍 Troubleshooting

### Common Issues

1. **Tests failing locally but passing in CI**
   - Check environment variables
   - Verify Node.js version matches CI
   - Ensure all dependencies are installed

2. **Slow test execution**
   - Use `--delay-request` flag to add delay between requests
   - Run tests in parallel if possible
   - Optimize test scripts

3. **Missing dependencies**
   - Run `npm install` to install all dependencies
   - Check `package.json` for required packages

### Debugging

Run tests with verbose output:
```bash
postman collection run postman/collections/jsonplaceholder.postman_collection \
  -e postman/environments/local.postman_environment.yaml \
  --verbose
```

**Note:** HTML reporter is not supported for v3 collections. For visual HTML reports, use the Postman desktop application to import the v3 collection and generate reports there. The CLI provides text-based output for automated runs.

---

## 📚 Resources

- [Postman Documentation](https://learning.postman.com/)
- [Postman CLI Documentation](https://learning.postman.com/docs/postman-cli/introduction/)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Chai Assertion Library](https://www.chaijs.com/)

---

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

For questions or issues, please open a GitHub issue.

---

*Generated by Mistral Vibe*
