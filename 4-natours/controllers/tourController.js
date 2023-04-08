
const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)


exports.checkID = (req, res, next, val) => {
    console.log(`tour id is ${val}`);
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: 'Failed',
            message: ' Invalid Id'
        });
    };
    next()
}
exports.getAllTour = (req, res) => {
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
exports.postTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};
exports.getTour = (req, res) => {
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
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: "Success",
        data: {
            tour: "<Update tour here.....>"
        }
    });
}
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "Success",
        data: null
    })
};