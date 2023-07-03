const jwt = require("jsonwebtoken");
require('dotenv').config();

// Create authentication token
function jwtGenerator(managerId) {
    const payload = {
        manager: managerId
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "24hr"})
}

module.exports = jwtGenerator;