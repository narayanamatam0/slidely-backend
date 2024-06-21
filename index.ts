import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.send(true);
});

// Endpoint to submit a new form
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    data.submissions.push(newSubmission);
    fs.writeFileSync('db.json', JSON.stringify(data, null, 2));

    res.sendStatus(200);
});

// Endpoint to read a specific form by index
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string, 10);
    const data = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    if (index >= 0 && index < data.submissions.length) {
        res.json(data.submissions[index]);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
