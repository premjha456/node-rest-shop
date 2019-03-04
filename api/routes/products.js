const express =require('express');
const router =express.Router();
const multer =require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController =require('../controller/products');


const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/')
  },
  filename:function(req,file,ch){
    ch(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
  }
});

const fileFilter =(req,file,cb)=>{

  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {cb(null,true);}
    else{
      cb(null,true);
    }
};

const upload=multer({
  storage:storage,
  limits:{
    fileSize:1024*1024*5
  },
  fileFilter:fileFilter
});

router.get('/',ProductController.get_all_products);

router.post('/',checkAuth,upload.single('productImage'),ProductController.create_new_product);

router.get('/:productId',ProductController.get_single_product);

router.patch('/:productId',checkAuth,ProductController.update_single_product);

router.delete('/:productId',checkAuth,ProductController.delete_single_products);

module.exports=router;