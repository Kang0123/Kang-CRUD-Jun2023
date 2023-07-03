const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Get inventory manager's info
router.get("/", authorization, async (request, response) => {
    try {

        const manager = await pool.query('SELECT "Username", "Id" FROM "User" WHERE "Id" = $1', [request.manager]);
        
        response.json(manager.rows);
        
    } catch (error) {
        console.error(error.message);
        response.status(500).send("Server error.");
    }
});

module.exports = router;
