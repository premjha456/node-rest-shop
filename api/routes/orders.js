const express =require('express');
const router =express.Router();
const {mongoose} = require('../db/mongoose');
const Order = require('../models/order');


router.get('/',(req,res,next)=>{
    

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

router.post('/',(req,res,next)=>{

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

router.get('/:orderId',(req,res,next)=>{
    
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

router.delete('/:orderId',(req,res,next)=>{

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