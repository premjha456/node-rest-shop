const express =require('express');
const router =express.Router();
const {mongoose} = require('../db/mongoose');

const Product =require('../models/product');

//to get list of all products 
router.get('/',(req,res,next)=>{
  
  Product.find()
  .then((doc)=>{
    var resp={
      count: doc.length,
      product: doc.map(d=>{
        return {
          name: d.name,
          price: d.price,
          _id:d._id,
          request:{
            type:'GET',
            url:'http://localhost:8000/products/'+d._id
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

//to add new product in database
router.post('/',(req,res,next)=>{

  var product = new Product({
    _id:new mongoose.Types.ObjectId(),
    name:req.body.name,
    price:req.body.price
  });

  product
  .save()
  .then((doc)=>{
    console.log(doc);
     res.status(200).send({
      message:"Created New Product",
      createdProduct:{
        name: doc.name,
        price:doc.price,
        _id:doc._id,
        request:{
          type:'GET',
          url:'http://localhost:8000/products/'+doc._id
        }
      }
     });  
   },
    (e)=>{
      console.log(e);
    res.status(400).send(e);
  });

});


//to get a individual product from database
router.get('/:productId',(req,res,next)=>{
  const id=req.params.productId;

  Product.findById(id)
  .then((product)=>{
    if (!product) {
    return console.log('Id not found');
  }
    console.log(product);
    res.send(product);
  })
  .catch((e)=>{
    res.status(400).send(e);
    console.log(e);
  })

});


router.patch('/:productId',(req,res,next)=>{
  	  var id =req.params.productId;

    Product.update({_id:id},{$set:{name: req.body.newname,price: req.body.newprice}})
    .then((res)=>{
      res.status(200).send(res);
    })
    .catch((e)=>{
      res.status(400).send(e);
    });

});


router.delete('/:productId',(req,res,next)=>{
  var id =req.params.productId;
  Product.findByIdAndRemove(id)
  .then((res)=>{
    res.status(200).send(res);
  })
  .catch((e)=>{
    res.status(400).send(e)
  });
	});

module.exports=router;