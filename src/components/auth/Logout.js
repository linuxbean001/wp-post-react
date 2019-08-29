import React from 'react';
import history from '../../helper/history';
import { localS } from '../../helper/localS';
const Logout = props =>{
    const handleLogout=()=>{
        localS.removeLocal('token');
        localS.removeLocal('user');
        history.replace('/');
    }
    return(
        <span onClick={handleLogout} style={{cursor:'pointer'}}>Logout</span>
    )
}
export default Logout;