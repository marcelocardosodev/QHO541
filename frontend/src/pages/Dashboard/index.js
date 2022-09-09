import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
//import { async } from 'q';

export default function DashBoard(){
    const [hostels, setHostels] = useState([]);
   useEffect(() =>{
        async function loadHostel(){
            const user_id = localStorage.getItem('user');
            await api.get('/dashboard',{
                headers:{user_id}
            }).then(response => 
                setHostels(response.data));
            
           // setHostels(response.data);
        }

        loadHostel();
        
    
    }, []);
    return (
        <>
          <h3>
            <strong>Hostels</strong>
          </h3>
          <ul className ="hostel-list">
              {hostels.map(hostel => (
                  <li key={hostel._id}>
                    
                    <header style={{backgroundImage : 'url('+hostel.thumbnail_url+')'}}/>
                      <strong>{hostel.company}</strong>
                      <span>{hostel.location}</span>
                      <span>{hostel.breakfast ? "Breackfast" : ""}</span>
                      <span>{hostel.available ? "" : "Not available"}</span>
                     <span>{hostel.price? `R$:${hostel.price}` : "Gratis"}</span>
                     <Link to ='/detail' onClick={localStorage.setItem('hostel', hostel._id)}>detail</Link>
                  </li>
              ))}
          </ul> 
         <Link to='/new'>
            <button className ="btn">Register new hostel</button> 
         </Link>
        </>

    )
}