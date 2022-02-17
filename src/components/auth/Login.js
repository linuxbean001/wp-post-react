import React,{useState,useEffect} from 'react';
import {authService} from '../../services/authService';
import { localS } from '../../helper/localS';
import history from '../../helper/history';
import notify from '../../helper/notify';
import {Link} from 'react-router-dom';

const Login = props =>{
    const [username,setUsername] = useState('');
    const [usernameError,setUsernameError] = useState(false);
    const [password,setPassword] = useState('');
    const [passwordError,setPasswordError] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    const handleLoginSubmit=e=>{
        e.preventDefault();
        setErrorMsg('');
        if(username.trim()===''){
            return setUsernameError(true);
        }else{
            setUsernameError(false);
        }

        if(password.trim()===''){
           return setPasswordError(true);
        }else{
            setPasswordError(false);
        }
        
        console.log({username,password});
        authService.login({username,password})
        .then(res=>{
            if(res.code ==='200'){
                notify('S','Loggedin Successfully');
                const token = res.token;
                const user = {
                    user_display_name: res.user_display_name,
                    user_email: res.user_email,
                    user_firstname: res.user_firstname,
                    user_id: res.user_id,
                    user_lastname: res.user_lastname,
                    user_nicename: res.user_nicename
                }
                localS.setLocal('token',token);
                localS.setLocal('user',user);
                history.replace('/dashboard');
            }else{
                if(res.message){
                    setErrorMsg(res.message);
                }
                notify('E','Login Failed');
            }
            
        })
        .catch(err=>{
            console.log('Login error',err);
            notify('E','Login failed');
        })
    }

    useEffect(()=>{
        if(localS.getLocal('token')){
            history.replace('/dashboard');
        }
    },[])
    return(
        <div className="container">
        <div className="row pt-5 justify-content-center align-items-center">
            <div className="col-md-6">           
        <div className="card login shadow-sm">
        <div className="card-body">
            <h5 className="card-title">Login</h5>
            <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail">Username</label>
                    <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" className="form-control" id="exampleInputEmail"  placeholder="Enter Username" />
                    { usernameError && <div className="invalid-feedback">  Please enter username. </div> }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword">Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="form-control" id="exampleInputPassword" placeholder="Enter Password" />
                    { passwordError && <div className="invalid-feedback">  Please enter password. </div> }
                </div>              
                <button type="submit" className="btn btn-primary">Login</button>
                {errorMsg!=='' && <div className="invalid-feedback">{errorMsg}</div>}

            </form>
            <div>Don't have account? <Link to={'/signup'}>Create one now</Link></div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Login;