const express = require('express');
const multer = require('multer')
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const HostelController = require('./controllers/HostelController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');


const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store );

routes.post('/hostel', upload.single('thumbnail'), HostelController.store);
routes.get('/hostels', HostelController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/hostel/booking', BookingController.store);

module.exports = routes;