const express = require('express');
const multer = require('multer')
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const HostelController = require('./controllers/HostelController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const GuestController = require('./controllers/GuestController');


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
routes.put('/hostels/:hostel_id', HostelController.updateById);
routes.delete('/hostels/:hostel_id', HostelController.removeById);

routes.post('/guest', GuestController.store);
routes.get('/guest', GuestController.show);
routes.get('/guest-email/:email', GuestController.index);
routes.get('/guest-id/:guest_id', GuestController.getById);
routes.delete('/guest-email/:email', GuestController.removeByEmail);
routes.put('/guest-id/:guest_id', GuestController.updateById);


routes.get('/dashboard', DashboardController.show);

routes.post('/hostel/booking', BookingController.store);
routes.put('/hostel/booking/:booking_id', BookingController.updateBooking);
routes.get('/hostel/booking/', BookingController.showBookings);
routes.delete('/hostel/booking/:booking_id', BookingController.removeBooking);

module.exports = routes;