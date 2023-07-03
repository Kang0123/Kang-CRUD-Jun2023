const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Get logged in inventory manager's personal items
router.get("/", authorization, async (request, response) => {

    const characterLimit = 100;

    try {

        const allItems = await pool.query('SELECT * FROM "Item" WHERE "UserId" = $1', [request.manager]);

        var tempDescription = "";
        for (var i = 0; i < allItems.rows.length; i++) {
            tempDescription = allItems.rows[i]["Description"];
            if (tempDescription != null && tempDescription.length > characterLimit) {
                allItems.rows[i]["Description"] = tempDescription.substring(0, characterLimit) + "...";
            }
        }

        response.json(allItems.rows);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;