const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use('/products',productRoutes);
app.use('/orders', ordersRoute);

app.use((req, res, next) => {
 const error = new Error('Not Found');
 error.status = 404;
 next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        message: error.message
    });
});

module.exports = app;