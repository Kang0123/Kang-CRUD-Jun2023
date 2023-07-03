const jwt = require("jsonwebtoken");
require("dotenv").config();

//Check if token is valid
module.exports = async(request, response, next) => {
    try {

        const jwtToken = request.header("token");

        if (!jwtToken) {
            return response.status(403).send("No valid login.");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        
        request.manager = payload.manager;

        next();

    } catch (error) {
        console.error(error.message);
        return response.status(403).send("Token not valid.");
    }
}


