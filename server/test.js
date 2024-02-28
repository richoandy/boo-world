const axios = require('axios');
var expect = require('expect.js');

// API test approach to save time
// another approach is to use postman as a centralized automated test suite

(async () => {
    // start the app.js before running this in other terminal

    const response = await axios.post('http://localhost:3000/user/sign-up', {
        username: 'username-test',
        password: 'password-test'
    })

    expect(response.data.username).eql('username-test');
    expect(response.data.password).to.not.eql('password-test');

    // write more tests for other routes here
})();