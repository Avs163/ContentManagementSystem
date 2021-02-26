const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CMS',(err) => {
    if(!err)
    console.log("successful connection of mongodb");
    else
    console.log("Error in DB conection:" + JSON.stringify(err,undefined,2));
});

module.exports = mongoose;
