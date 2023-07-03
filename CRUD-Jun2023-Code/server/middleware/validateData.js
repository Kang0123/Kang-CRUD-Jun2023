// Validate if all data is correct
module.exports = (request, response, next) => {
    const {firstName, lastName, username, password} = request.body;

    if (request.path === "/register") {
        if (![firstName, lastName, username, password].every(Boolean)) {
            return response.status(401).send("Missing info.");
        }
    }  else if (request.path === "/login") {
        if (![username, password].every(Boolean)) {
            return response.status(401).send("Missing info.");
        }
    }

    next();
     
};