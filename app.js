const express = require('express');
var app=express();

app.use((req,res,next)=>{
	res.status(200).json({

		message:'Itworks'
	});
});

module.exports=app;