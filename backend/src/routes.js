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
routes.get('/sessions', SessionController.show);
routes.get('/sessions-user', SessionController.index);
routes.get('/sessions-user/:user_id', SessionController.getById);
routes.delete('/sessions-user/:user_id', SessionController.removeById);
routes.put('/sessions-user/:user_id', SessionController.updateById);


routes.post('/hostel', upload.single('thumbnail'), HostelController.store);
routes.get('/hostels/breakfast/:breakfast', HostelController.indexBreakfast);
routes.get('/hostels/available/:available', HostelController.indexAvailable);
routes.get('/hostels/:hostel_id', HostelController.getById);


routes.get('/dashboard', DashboardController.show);

routes.post('/hostel/booking', BookingController.store);

module.exports = routes;