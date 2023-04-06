const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

// app.get('/', (req, res) => {
//     res.json({ app: 'Hello form the server side ok!' });
// });


// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint.....');
// })

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours: tours
        }
    })
})
console.log(tours)
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});