const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
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
});

app.use(morgan('dev'));



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
};

const getAllUser = (req, res) => {
    res.status(500).json({
        status: "Not Found",
        message: "User not found",
    })
};
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



const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter)

tourRouter
    .route('/')
    .get(getAllTour)
    .post(postTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

// userRouter('/')
//     .get(getAllUser)
//     .post(postUser)

// userRouter('/:id')
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser);



app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
