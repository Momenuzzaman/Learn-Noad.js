const tourRouter = require('./routes/tourRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const express = require('express');
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

// Mounting Multiple ROuters

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter)

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
