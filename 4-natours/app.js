const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log('Middleware');
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})



const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)
const getAllTour = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        result: tours.length,
        data: {
            tours: tours
        }
    });
};
const postTour = (req, res) => {
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
};
const getTour = (req, res) => {
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
};
const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: 'Failed',
            message: ' Invalid Id'
        });
    };

    res.status(200).json({
        status: "Success",
        data: {
            tour: "<Update tour here.....>"
        }
    });
}
const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: 'Failed',
            message: ' Invalid Id'
        });
    }

    res.status(204).json({
        status: "Success",
        data: null
    })
}
// get
// app.get('/api/v1/tours', getAllTour);

// specific tour 
// app.get('/api/v1/tours/:id', getTour);

// post
// app.post('/api/v1/tours', postTour);

// Update
// app.patch('/api/v1/tours/:id', updateTour);

// delete
// app.delete('/api/v1/tours/:id', deleteTour);


app.route('/api/v1/tours')
    .get(getAllTour)
    .post(postTour);

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});