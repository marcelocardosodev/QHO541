import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from  './pages/New';
import Detail from './pages/Detail'
import Booking from './pages/Booking';
import Reservations from './pages/Reservations';


export default function Routing(){
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path ="/" exact element={<Login/>}/>
                <Route path ="/dashboard" element={<Dashboard/>}/>
                <Route path ="/new" element={<New/>}/>
                <Route path ="/detail" element={<Detail/>}/>
                <Route path= "/booking" element={<Booking/>}/>
                <Route path= "/reservations" element={<Reservations/>}/>
            </Routes>
        
        </BrowserRouter>
    );
}

