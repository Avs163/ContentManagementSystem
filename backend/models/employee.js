const mongoose = require('mongoose');

var Employee = mongoose.model('Employee',{
    name : {type: String},
    type : {type : String},
    mobile : {type : String},
    mail : {type : String},
    address : {type : String}

});

module.exports = {Employee};
