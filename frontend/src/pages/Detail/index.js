import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function DeTail(){
    const [hostel, setHostel] = useState({});
    useEffect(() =>{
         async function loadDetailHostel(){
             const hostel_id = localStorage.getItem('hostel');
             await api.get(`/hostels/${hostel_id}`).then(response => 
                 setHostel(response.data));
             
            // setHostel(response.data);
         }
 
         loadDetailHostel();
     
     }, []);
     return (
         <>
          <div class="topnav">
            <a href="/dashboard">DashBoard</a>
            <a href="/new">New</a>
            <a href="/reservations">Reservation</a>
            <a href="/">Logout</a>
          </div>
          <h3>
            <strong>Hostel Detail</strong>
          </h3>
           <ul className ="hostel-detail">
               {
                 <li key={hostel._id}>
                 <a href= {hostel.thumbnail_url} target="_blank" rel="noreferrer" >Photo</a>
                 <spam><strong>Company: </strong>{hostel.company}</spam>
                 <span><strong>Location: </strong>{hostel.location}</span>
                 <span><strong>{hostel.breakfast ? "Breackfast free" : "No Breackfast"}</strong></span>
                 <span><strong>{hostel.available ? "Available" : "Not available"}</strong></span>
                 <span><strong>Daily value: </strong>{hostel.price? `R$:${hostel.price}` : "Gratis"}</span>
                 <span><strong>Capacity: </strong>{hostel.maximum_occupants}</span>
                
             </li>  
               }
           </ul> 
          <Link to='/booking'>
             <button className ="btn">Make a reservation</button> 
          </Link>
         </>
 
     )}
