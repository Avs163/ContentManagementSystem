// const express = require("express");
// var router = express.Router();
// var ObjectId = require('mongoose').Types.ObjectId;

// var{Employee} = require('../models/employee');

// router.get('/',(req,res) => {
//   Employee.find((err,docs) => {
//     if(!err){res.send(docs);}
//     else{console.log('Error in retrieving' + JSON.stringify(err,undefined,2));}
//   });
// });

// router.get('/:id',(req,res) => {
//   if(!ObjectId.isValid(req.params.id))
//   return res.status(400).send('No record with given id: $(req.params.id)');

//   Employee.findById(req.params.id,(err,doc) => {
//     if(!err){res.send(doc);}
//     else{console.log('Error in retriving Employee:' + JSON.stringfy(err,undefined,2)); }
//   });
// });

// router.post('/',(req,res) => {
//   var emp= new Employee({
//     name: req.body.name,
//     type: req.body.type,
//     mobile : req.body.mobile,
//     mail: req.body.mail,
//     address: req.body.address,
//   });
//   emp.save((err,doc) => {
//     if(!err){res.send(doc);}
//     else{ console.log('Error in Employee save' + JSON.stringify(err,undefined,2));}
//   });
// });

// router.put('/:id',(req,res) => {
//   if(!ObjectId.isValid(req.params.id))
//   return res.status(400).send(`No record with given id : ${req.params.id}`);

//   var emp = {
//     name: req.body.name,
//     type: req.body.type,
//     mobile : req.body.mobile,
//     mail: req.body.mail,
//     address: req.body.address,
//   };
//   Employee.findByIdAndUpdate(req.params.id,{ $set: emp},{new:true},(err,doc) => {
//     if(!err){res.send(doc);}
//     else {console.log('Error in Employee Update:' + JSON.stringify(err,undefined,2));}
//   });
// });

// router.delete('/:id',(req,res) => {
//   if(!ObjectId.isValid(req.params.id))
//   return res.status(400).send('No record with given id: ${req.params.id}');
//   else{console.log('Error in Employee Update:' + JSON.stringify(err,undefined,2));}
// });

// module.exports = router;
const express = require('express');
const multer = require('multer');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Case_data } = require('../models/case_data');


// configure multer to store images
// const storage = multer.diskStorage({
//   destination: (req,file,cb) => {
//       cb(null,"backend/images");
//   },
//   filename: (req,file,cb) => {
//     const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
//     const ext = file.mimetype;
//     cb(null,name + '-' + Date.now() + '.' + ext);
//   }
// });




// => localhost:3000/employees/
router.get('/', (req, res) => {
    Case_data.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Case_data.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Case_data({
        client: req.body.client,
        court: req.body.court,
        case_name: req.body.case_name,
        case_type: req.body.case_type,
        case_number: req.body.case_number,
        case_year: req.body.case_year,
        case_description: req.body.case_description
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
      client: req.body.client,
        court: req.body.court,
        case_name: req.body.case_name,
        case_type: req.body.case_type,
        case_number: req.body.case_number,
        case_year: req.body.case_year,
        case_description: req.body.case_description
    };
    Case_data.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Case_data.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;
