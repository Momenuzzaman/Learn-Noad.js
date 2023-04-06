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
    });
});

// specific tour 
app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(tour => tour.id === id);

    if (!tour) {
        res.status(404).json({
            status: 'Failed',
            message: ' Invalid Id'
        });
    };

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});

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
        });
    });
});

app.patch('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: 'Failed',
            message: ' Invalid Id'
        });
    }

    res.status(200).json({
        status: "Success",
        data: {
            tour: "<Update tour here.....>"
        }
    })
})
console.log(tours)
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});