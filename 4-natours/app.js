const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.json());

// app.get('/', (req, res) => {
//     res.json({ app: 'Hello form the server side ok!' });
// });


// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint.....');
// })


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)
// get
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours: tours
        }
    })
})
// post
app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    });
});
console.log(tours)
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});