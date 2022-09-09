import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import moment from 'moment';
//import { async } from 'q';

export default function Reservations(){
    const formatDate = 'YYYY-MM-DD'
    const [bookings, setBookings] = useState([]);
   useEffect(() =>{
        async function loadBooking(){
            
            await api.get('/hostel/booking/',{
                
            }).then(response => 
                setBookings(response.data));
          
           
        }

        loadBooking();

        
    
    }, []);
    return (
        <>

        <div class="topnav">
            <a href="/dashboard">DashBoard</a>
            <a href="/new">New</a>
            <a class="active" href="/reservations">Reservation</a>
            <a href="/">Logout</a>
          </div>
          <h3>
            <strong>Reservations</strong>.
          </h3>
          <ul className ="booking-list">
              {bookings.map(booking => (
                
                  <li key={booking._id}>
                    
                      <span><strong>Company : </strong>{booking.hostel.company}</span> 
                      <span><strong>Guest : </strong>{booking.guest.guest_name}</span> 
                      <span><strong>Check in : </strong>{moment(booking.check_in).format(formatDate)}</span>
                      <span><strong>Chec out : </strong>{moment(booking.check_out).format(formatDate)}</span>
                      <span><strong>Created : </strong>{moment(booking.date).format(formatDate)}</span>
                      <span><strong>Made by : </strong>{booking.user.email}</span>  
                      
                      
                      <span></span>
                     <span></span>
                     
                  </li>
              ))}
          </ul> 
         <Link to='/dashboard'>
            <button className ="btn">Come back</button> 
         </Link>
        </>

    )
}