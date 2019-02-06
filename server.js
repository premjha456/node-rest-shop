const express =require('express');

const productRoutes = require('./api/routes/products');
const orderRoutes= require('./api/routes/orders');

var app=express();


//any route starting with /products will be mapped to productsRoute file and the routes in that file 
app.use('/products',productRoutes);

//any route starting with /orders will be mapped to ordersRoute file and the routes in that file 
app.use('/orders',orderRoutes);


app.listen(3000,()=>{

	console.log('Started at port 3000');
});

