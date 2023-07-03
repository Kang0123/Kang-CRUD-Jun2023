// connect to PostgreSQL database
// bash 
//     psql -U postgres
//     Password!123
//     \l (see databases)
//     /c CRUDJun2023 (connect to database)
//     \dt (see tables/relations)
//     \x (expanded display)

// start ExpressJS backend server
// terminal
//     route into server directory
//     npx nodemon index

// start React/Node frontend site
// terminal
//     route into frontend, src directory
//     npm start

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const authorization = require("./middleware/authorization");

app.use(cors());
app.use(express.json());


const characterLimit = 100;

//Routes//


//Create account and/or log in
app.use("/auth", require("./routes/jwtAuth"));


//Dashboard route
app.use("/dashboard", require("./routes/dashboard"));


//Manager Route - view my Items
app.use("/managerMyItems", require("./routes/managerMyItems"));


//View all Items
app.get("/allItems", async(request, response) => {
    try {
        const allItems = await pool.query('SELECT * FROM "Item"');

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


//Manager - create Item
app.post("/createItem", async(request, response) => {
    try {

        const{userId, itemName, description, quantity} = request.body;

        const newItem = await pool.query(
            'INSERT INTO "Item" ("UserId", "Item Name", "Description", "Quantity") VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, itemName, description, quantity]
            );

        response.json(newItem.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});


//Manager - select Item
app.get("/managerSpecificItem/:itemId", async (request, response) => {
    try {
        const {itemId} = request.params;
        const specificItem = await pool.query('SELECT * FROM "Item" WHERE "Id" = $1', [itemId]);

        response.json(specificItem.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});


//Manager - edit Item
app.put("/editItem/:itemId", async(request, response) => {
    try {
        const {itemId} = request.params;
        const {itemName, description, quantity} = request.body;
        const updateDetails = await pool.query('UPDATE "Item" SET "Item Name" = $1, "Description" = $2, "Quantity" = $3 WHERE "Id" = $4', [itemName, description, quantity, itemId]);

        const specificItem = await pool.query('SELECT * FROM "Item" WHERE "Id" = $1', [itemId]);
        response.json(specificItem.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});


//Manager - delete Item
app.delete("/deleteItem/:itemId", async(request, response) => {
    try {
        const {itemId} = request.params;
        const deleteItem = await pool.query('DELETE FROM "Item" WHERE "Id" = $1', [itemId]);

        response.json("Item deleted.");
    } catch (error) {
        console.error(error.message);
    }
});



//Start server - listening
app.listen(5000, () => {
    console.log("Server started on port 5000");
});