const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.json({ app: 'Hello form the server side ok!' });
});


app.post('/', (req, res) => {
    res.send('You can post to this endpoint.....');
})

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});