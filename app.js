const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var app = express();
var app_case_data = express();
var app_case_controller = require('./backend/routes/case_controller.js')
var Controller = require('./backend/routes/controller.js')

const postsRoutes = require("./backend/routes/posts.js")
const app_post = express();


app_post.use(bodyParser.json());
app_post.use(bodyParser.urlencoded({extended: false}));
app_post.use("/images",express.static(path.join("backend/images")));
app_post.use('/api/posts',postsRoutes);
app_post.listen(4100, () => console.log('Server started at port 4100'));
// window.global = window;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.listen(3000, () => console.log('Server started at port 3000'));
mongoose.connect("mongodb+srv://Kakashi:OzOwe6yO0oy7Sooh@uchiha.plfl7.mongodb.net/CMS?retryWrites=true&w=majority")
.then(() => {
  console.log('Finally X-X');
})
.catch(() => {
  console.log('Oh boy:(');
});


app.use('/employees',Controller);
app.use(cors( {origin: 'http://localhost:4200/'}));






app_case_data.use(bodyParser.json());
app_case_data.use(bodyParser.urlencoded({extended: false}));
app_case_data.listen(4000, () => console.log('Server started at port 4000'));
mongoose.connect("mongodb+srv://Kakashi:OzOwe6yO0oy7Sooh@uchiha.plfl7.mongodb.net/CMS?retryWrites=true&w=majority")
.then(() => {
  console.log('Finally X-X');
})
.catch(() => {
  console.log('Oh boy:(');
});

app_case_data.use('/case_data',app_case_controller);
app_case_data.use(cors( {origin: 'http://localhost:4200/'}));







// app.use("/images",express.static(path.join("backend/images")));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
   "Origin,X-Requested-With,Content-Type,Accept");
   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
   next();
});

module.exports = app;
