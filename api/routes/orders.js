const express =require('express');
const router =express.Router();
const checkAuth = require('../middleware/check-auth');
const OrderController =require('../controller/orders.js');

router.get('/',checkAuth,OrderController.orders_get_all);

router.post('/',checkAuth,OrderController.orders_create_new);

router.get('/:orderId',checkAuth,OrderController.orders_get_one);

router.delete('/:orderId',checkAuth,OrderController.orders_delete);

module.exports=router;