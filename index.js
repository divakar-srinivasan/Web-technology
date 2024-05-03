var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/mydb");

var db = mongoose.connection;
db.on('error', () => {
    console.log('error');
});
db.once('open', () => {
    console.log('connect to db');
});

app.post('/save', (req, res) => {
    var name = req.body.name;
    var password = req.body.password;

    var data = {
        "name": name,
        "password": password
    };

    db.collection("users").insertOne(data, (err) => {
        if (err) {
            throw err;
        }
        console.log("Inserted user Successfully");
    });

    return res.redirect("signup.html");
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect("index.html");
});

app.listen(3000);

console.log("listening on port http://localhost:3000");

