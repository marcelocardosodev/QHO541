import React, {useState, useMemo} from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api.js';
import './styles.css';


export default function New({ history }){
   const [thumbnail,setThumbnail] = useState(null);
   const [company, setCompany] = useState('');
   const [location, setLocation ] = useState('');
   const [price, setPrice ] = useState('');
   const [breakfast, setBreakfast ] = useState('');
   const [available, setAvailable ] = useState('');
   const [maximum_occupants, setMaximum_occupants ] = useState('');

   const preview = useMemo(() => {
       return thumbnail ? URL.createObjectURL(thumbnail) : null;
   },[thumbnail])
    
    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('location', location);
        data.append('price', price);
        data.append('breakfast', breakfast);
        data.append('available', available);
        data.append('maximum_occupants', maximum_occupants);

         await api.post('/hostel', data,{
            headers : {user_id}
        });

        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage : `url(${preview})`}} 
                className={thumbnail ? 'has-thumbnail' : ''}
                >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>
            <label htmlFor="company">Company</label>
            <input 
                id="company"
                placeholder="Hostel owner company"
                value={company}
                onChange={event=>setCompany(event.target.value)}
            />
            
            <label htmlFor="location">Location</label>
            <input 
                id="location"
                placeholder="Hostel location"
                value={location}
                onChange={event=>setLocation(event.target.value)}
            />

            <label htmlFor="price">Daily rate</label>
            <input 
                id="price"
                placeholder="Amount charged per day"
                value={price}
                onChange={event=>setPrice(event.target.value)}
            />

            <label htmlFor="breakfast">Breakfast <span>(true or false)</span></label>
            <input 
                id="breakfast"
                placeholder="Has breackfast"
                value={breakfast}
                onChange={event=>setBreakfast(event.target.value)}
            />

            <label htmlFor="available">Available <span>(true or false)</span></label>
            <input 
                id="available"
                placeholder="Is available"
                value={available}
                onChange={event=>setAvailable(event.target.value)}
            />

            <label htmlFor="maximum_occupants">Occupants</label>
            <input 
                id="maximum_occupants"
                placeholder="Maximum number of occupants"
                value={maximum_occupants}
                onChange={event=>setMaximum_occupants(event.target.value)}
            />
            <button  type="submit" className="btn" >Register</button>
        </form>
        
    )
}