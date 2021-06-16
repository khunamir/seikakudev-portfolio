const express = require('express');
const sendMail = require('./mail.js');
const app = express();
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/views'));

// Configuring our data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/email', (req, res) => {

    const {name, email, subject, text} = req.body;

    sendMail(name, email, subject, text, function(err, data) {
        if (err) {
            res.status(500).send("internal error");
        } else {
            res.send('OK');
        }
    });
    
});

app.listen(port, () => {
    console.log("Express server listening on port " + port);
});

