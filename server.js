const express =require('express');
var app=express();
const bodyParser=require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes= require('./api/routes/orders');

app.use('/uploads',express.static('uploads'));
//TO PARSE BODY INTO PROPER JSON BODY
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//to avoid cors[CROSS ORIGIN RESOURSE SHARING]
// app.use((req,res,next)=>{
// 	res.header('Access-Control-Allow-Origin','*');
// 	res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');

//    if (req.method ==='OPTIONS') {
//    	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,PATCH');
//     return res.status(200).json({});
//    }
// });

//any route starting with /products will be mapped to productsRoute file and the routes in that file 
app.use('/products',productRoutes);

//any route starting with /orders will be mapped to ordersRoute file and the routes in that file 
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
   
   const error= new Error('Not Found');
   error.status=404;
   next(error);
});

app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		message:error.message,
		status:error.status
	});
});

app.listen(8000,()=>{

	console.log('Started at port 8000');
});

