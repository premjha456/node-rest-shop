const {mongoose} = require('../db/mongoose');
const Product =require('../models/product');

//to get list of all products 
exports.get_all_products=(req,res,next)=>{
  
    Product.find()
    .then((doc)=>{
      var resp={
        count: doc.length,
        product: doc.map(d=>{
          return {
            productImage:d.productImage,
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
      
  }


//to add new product in database
exports.create_new_product=(req,res,next)=>{

    console.log(req.file);
    var product = new Product({
      _id:new mongoose.Types.ObjectId(),
      name:req.body.name,
      price:req.body.price,
      productImage:req.file.path
    });
  
    product
    .save()
    .then((doc)=>{
      console.log(doc);
       res.status(200).send({
        message:"Created New Product",
        createdProduct:{
          productImage:doc.productImage,
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
  
  }


  //to get a individual product from database
exports.get_single_product=(req,res,next)=>{
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
  
  }


//to update a existing product 
exports.update_single_product=(req,res,next)=>{
    var id =req.params.productId;

Product.update({_id:id},{$set:{name: req.body.newname,price: req.body.newprice}})
.then((res)=>{
  res.status(200).send(res);
})
.catch((e)=>{
  res.status(400).send(e);
});

}

// to delete a product 
exports.delete_single_products=(req,res,next)=>{
    var id =req.params.productId;
    Product.findByIdAndRemove(id)
    .then((res)=>{
      res.status(200).send(res);
    })
    .catch((e)=>{
      res.status(400).send(e)
    });
}