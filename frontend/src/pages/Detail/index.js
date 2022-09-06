import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function DeTail(){
    const [hostel, setHostel] = useState({});
    useEffect(() =>{
         async function loadDetailHostel(){
             const hostel_id = localStorage.getItem('hostel');
             const response = await api.get(`/hostels/${hostel_id}`).then(response => 
                 setHostel(response.data));
             
             setHostel(response.data);
         }
 
         loadDetailHostel();
     
     }, []);
     return (
         <>
           <ul className ="hostel-detail">
               {
                 <li key={hostel._id}>
                 <header style={{ backgroundImage : `url(${hostel.thumbnail_url})`}}/>
                 <strong>{hostel.company}</strong>
                 <span>{hostel.location}</span>
                 <span>{hostel.breakfast ? "Breackfast" : ""}</span>
                 <span>{hostel.available ? "" : "Not available"}</span>
                <span>{hostel.price? `R$:${hostel.price}` : "Gratis"}</span>
                
             </li>  
               }
           </ul> 
          <Link to='/booking'>
             <button className ="btn">Make a reservation</button> 
          </Link>
         </>
 
     )}
