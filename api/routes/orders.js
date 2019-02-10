const express =require('express');
const router =express.Router();

router.get('/',(req,res,next)=>{

	res.status(200).json({
		message:'Get request for Order'
	});
});

router.post('/',(req,res,next)=>{
    const order={
    	productId:req.body.productId,
    	quantity:req.body.quantity
    }
	res.status(200).json({
		message:'Post request for orders',
		createdOrder:order
	});
});

router.get('/:orderId',(req,res,next)=>{
    
	res.status(200).json({
		message:'get order wit id',
	//	orderId=req.params.orderId
	});
});

router.delete('/:orderId',(req,res,next)=>{

	res.status(200).json({
		message:'delete order with id',
	//	orderId=req.params.orderId
	});
});


module.exports=router;