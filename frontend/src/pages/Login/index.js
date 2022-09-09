import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import api from "../../services/api";

export default function Login(){
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  
  async function handleSubmit(event){
    event.preventDefault();

    const response = await api.post('/sessions', {email})
    .catch((error) =>{
      console.log(error.response.data)
      alert("error " + error.response.data.error);
    })
    
    const {_id} = response.data;

    console.log(_id);

    localStorage.setItem('user', _id);

    navigate('/dashboard');
    
  }
    
    
    return (
        

        <>
        
        
        <p>
        Rent <strong>rooms</strong> for people and generate extra <strong>money</strong>.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>E-mail *</label>
          <input 
          type= "email" 
          id="email" 
          placeholder='Your best e-mail'
          value={email}
          onChange={event => setEmail(event.target.value)}
          />

          <button className='btn' type='submit'>Sig in</button>
        
        </form>
        
      
        
        </>
    )
}