const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

let managers = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-managers', (req, res) => {
    res.json(managers);
});

app.post('/submit-manager', (req, res) => {
    const newManager = {
        id: Date.now(),
        enterprise: req.body.enterprise,
        fullName: req.body.fullName,
        certificate: req.body.certificate,
        extraCertificates: req.body.extraCertificates,
        contacts: req.body.contacts
    };

    managers.push(newManager);
    res.json({ success: true, managers: managers });
});

app.listen(PORT, () => {
    console.log(`Сервер: http://localhost:${PORT}`);
});