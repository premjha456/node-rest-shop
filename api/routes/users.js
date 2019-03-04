const express =require('express');
const router =express.Router();

const UserController=require('../controller/users');

router.post('/login',UserController.user_login);

router.post('/signup',UserController.user_signup);

router.delete('/:userId',UserController.delete_user);

module.exports=router;