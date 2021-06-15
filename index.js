const express = require('express');
const sendMail = require('./mail.js');
const app = express();
const path = require('path');

require('dotenv').config();

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

app.listen(process.env.PORT || 3000, () => {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

