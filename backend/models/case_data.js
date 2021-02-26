const mongoose = require('mongoose');

var Case_data = mongoose.model('Case_data',{
    client : {type: String},
    court : {type : String},
    case_name : {type : String},
    case_type : {type : String},
    case_number : {type : String},
    case_year : {type : String},
    case_description : {type : String},

});

module.exports = {Case_data};
