const PORT = process.env.PORT || 3000;

const spoopDB = require("spoop-db");
const db = spoopDB.createDB("teams.db");

const express = require("express");
const app = express();


app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET", "POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.get("/", (req, res) => {
    res.send("no");
    res.end();
});

app.get("/get_team_data", (req, res) => {
    res.send(db.getDB());
    res.end();
});

app.post("/add_team_data", async(req, res) => {
    await db.add({
        id: await db.autoID(),
        teamNumber: req.body.teamNumber,
        teamName: req.body.teamName
    });
    console.log("/add_team_data: body:", req.body);
    res.send(`thanks for ${req.body}`);
    res.end();
});


app.listen(PORT, function() {
    console.log(`Listening at: ${this.address()["address"]}:${PORT}`);
});