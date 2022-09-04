const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')

const app = express();
mongoose.connect('mongodb://localhost:27017/qho');
mongoose.connection.on('connected', function () {
    console.log('=====connection successfully established=====');
   });
   mongoose.connection.on('error', function (err) {
    console.log('=====An error has occurred: ' + err);
   });
   mongoose.connection.on('disconnected', function () {
    console.log('=====Connection terminated=====');
   });

app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);



app.listen(3333);

