const express =require('express');
const router =express.Router();
const {mongoose} = require('../db/mongoose');
const Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');


// to handle get request for all products
router.get('/',checkAuth,(req,res,next)=>{
    

    Order.find()
    .populate('product')
    .then((docs)=>{
    	var resp={
    		count: docs.length,
            orders: docs.map((doc)=>{
            return{
        	_id: doc._id,
        	product: doc.product,
        	quantity: doc.quantity,
        	request:{
        		type: 'GET',
        		url: 'http://localhost:8000/orders/'+doc._id
        	}
           }
        })
    	
    	}
    	res.status(200).send(resp);
    })
    .catch((e)=>{
    	res.status(400).send(e);
    })
});

// to handle post request for add new order
router.post('/',checkAuth,(req,res,next)=>{

	const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity:req.body.quantity,
      product:req.body.productId
	});

	order.save()
	.then((result)=>{
		res.status(200).send({
          message: "Created new order",
          createdOrder:{
          	product: result.product,
          	quantity: result.quantity,
          	_id: result._id
          },
          request:{
          	type: 'GET',
          	url: 'http://localhost:8000/orders/'+result._id
          }

			});
	})
	.catch((e)=>{
		console.log(e);
		res.status(400).send(e);

	})
});


// to handle get request fora single order
router.get('/:orderId',checkAuth,(req,res,next)=>{
    
    const id=req.params.orderId;
	Order.findById(id)
	.populate('product')
    .then((docs)=>{
    	
    	res.status(200).send(docs);
    })
    .catch((e)=>{
    	res.status(400).send(e);
    })
});


// to handle delete request for a single order
router.delete('/:orderId',checkAuth,(req,res,next)=>{

    const id=req.params.orderId;
    Order.findByIdAndRemove(id)
    .then((docs)=>{
    	
    	res.status(200).send(docs);
    })
    .catch((e)=>{
    	res.status(400).send(e);
    })
});

module.exports=router;