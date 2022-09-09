import React, {useState} from "react";
import api from "../../services/api";
import { Link } from 'react-router-dom';
import './styles.css';
import {useNavigate} from 'react-router-dom';

export default function Booking({ history }){
    const navigate = useNavigate(); 
    
    const [check_in, setCheck_in] = useState('');
    const [check_out, setCheck_out] = useState('');
    const [guest_name, setGuest_name] = useState('');
    const [guest_email, setGuest_email] = useState('');
    const [guest_phone, setGuest_phone] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
    //    const data = new FormData();
        
        const user_id = localStorage.getItem('user');
        const hostel_id = localStorage.getItem('hostel');
/*
        data.append('check_in', check_in);
        data.append('check_out', check_out);
        data.append('guest_name', guest_name);
        data.append('guest_email', guest_email);
        data.append('guest_phone', guest_phone); */
        
        const data  = {
            'check_in': check_in,
            'check_out': check_out,
            'guest_name': guest_name,
            'guest_email': guest_email,
            'guest_phone':guest_phone

        }
        await api.post('/hostel/booking', data,{
            headers:{
                user_id,
                hostel_id
            }
            
        }).catch((error)=>{
            console.log(error.response.data.info)
            alert(error.response.data.info)
        })
        
        navigate('/reservations');
    }
    
    return(
        <>
        <h3>
            <strong>Make a  booking</strong>.
        </h3>
        <form onSubmit={handleSubmit}>
            
            <label htmlFor="check_in">Check_in <span>(yyyy-mm-dd)</span></label>
            <input 
                id="check_in"
                placeholder="Entry date"
                value={check_in}
                onChange={event=>setCheck_in(event.target.value)}
            />
            
            <label htmlFor="check_out">Check_out <span>(yyyy-mm-dd)</span></label>
            <input 
                id="check_out"
                placeholder="Departure date"
                value={check_out}
                onChange={event=>setCheck_out(event.target.value)}
            />

            <label htmlFor="guest_name">Guest name</label>
            <input 
                id="guest_name"
                placeholder="Enter the name of the host"
                value={guest_name}
                onChange={event=>setGuest_name(event.target.value)}
            />

            <label htmlFor="guest_email">Guest email </label>
            <input 
                id="guest_email"
                placeholder="Inform the email"
                value={guest_email}
                onChange={event=>setGuest_email(event.target.value)}
            />

            <label htmlFor="guest_phone">Guest phone </label>
            <input 
                id="guest_phone"
                placeholder="inform the phone number"
                value={guest_phone}
                onChange={event=>setGuest_phone(event.target.value)}
            />

            
            <button  type="submit" className="btn" >Confirm reservation</button>
            <Link to='/dashboard'>Cancel</Link>
        </form>

        </>
    )
}