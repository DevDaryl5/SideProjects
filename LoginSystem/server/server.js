// npm init -y // creates json file for server
// npm i express // installs express in the server 
// nmp i nodemon -D // restarts server when change is made in server

const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express();

app.use(express.json()); //Parse all the json recived from frontend
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Sql1234!",
    database: "loginsystem"
});

app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO users (username, password) values(?,?)",
        [username, password],
        (err, result) => console.log(err))
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("Select * From users where username = ? and password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({err: err})
            }
            if (result.length > 0) {
                res.send(result)
            } else {
                res.send({ message: "Wronng username/password combination" })
            }
        })
})

app.listen(3001, () => {
    console.log("running server")
});