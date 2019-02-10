const mongoose = require('mongoose');

mongoose.Promise=global.Promise;

//mongoose connection
mongoose.connect('mongodb://localhost:27017/Shop',{useNewUrlParser:true});

module.exports={mongoose};