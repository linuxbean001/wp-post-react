import React from 'react';
import {Link} from 'react-router-dom';
import Logout from '../auth/Logout';
const TopNav = props =>{
    return(
       
        <nav className="navbar fixed-top navbar-dark bg-dark">
            <Link className="navbar-brand" to={'/dashboard'}>RP Blog</Link>
            <div className="ml-auto logout">             
                 <Logout />                
            </div>
        </nav>
    )
}

export default TopNav;