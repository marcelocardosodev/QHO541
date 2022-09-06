import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from  './pages/New';
import Detail from './pages/Detail'
import Booking from './pages/Booking';

export default function Routing(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path ="/" exact component={Login}/>
                <Route path ="/dashboard" component={Dashboard}/>
                <Route path ="/new" component={New}/>
                <Route path ="/detail" component={Detail}/>
                <Route path= "/booking" component={Booking}/>
            </Switch>
        </BrowserRouter>
    );
}

