import React,{useState,useEffect} from 'react';
import AppHeader from './Header';
import AppFooter from './Footer';
import {localS} from '../../helper/localS';

import Dashboard from '../pages/Dashboard';
const AppLayout = props =>{
    const [user,setUser]= useState(null);
    useEffect(()=>{
        const user = localS.getLocal('user');
        if(user){
            setUser(user);
        }
    },[])
    return (
    <React.Fragment>
        <AppHeader />
        <div className="app-main">
            <div className="container">
                { user && <div className="user_info">
                    Welcome <strong className="user_name">{user.user_display_name}</strong>
                    </div>
                }
                <Dashboard />                
            </div>
        </div>
        <AppFooter />
    </React.Fragment>
    )
}

export default AppLayout;