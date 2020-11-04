const PORT = process.env.PORT || 3000;

// const spoopDB = require("spoop-db");
// const db = spoopDB.createDBNoId("teams.db");

const fs = require("fs");
const teams = fs.createWriteStream("teams.csv", {
    flags:'a',
    autoClose: true
});
const fsPromises = require("fs/promises");

const express = require("express");
const app = express();


app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET", "POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // res.header("Access-Control-Allow-Headers", "*");
    next();
});


app.get("/", (req, res) => {
    res.send("no");
    res.end();
});

app.get("/get_team_data", async(req, res) => {
    // res.send({
    //     data: await db.getDB()
    // });
    res.send(await fsPromises.readFile("teams.csv", "utf-8"));
    res.end();
});

app.post("/add_team_data", async(req, res) => {
    // await db.add({
    //     teamNumber: req.body.teamNumber,
    //     teamName: req.body.teamName
    // });
    const {teamNumber, teamName} = req.body;
    teams.write(`${teamNumber}, ${teamName}`);
    // console.log("/add_team_data: body:", req.body);
    res.send("thanks");
    res.end();
});


app.listen(PORT, function() {
    console.log(`Listening at: ${this.address()["address"]}:${PORT}`);
});