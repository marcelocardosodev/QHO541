const express = require('express');
const multer = require('multer')
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const HostelController = require('./controllers/HostelController');


const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store );

routes.post('/hostels', upload.single('thumbnail'), HostelController.store);

module.exports = routes;