import React,{useState,useEffect} from 'react';
import {authService} from '../../services/authService';
import {localS} from '../../helper/localS';
import history from '../../helper/history';
import notify from '../../helper/notify';
import {Link} from 'react-router-dom';
const Signup = props =>{

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [first_name, setFirstname ] = useState('');
    const [last_name, setLastname ] = useState('');

    // error states
    const [errors,setErrors] = useState(null);
   
    

    const handleSignupSubmit = e =>{
        e.preventDefault();
        let errors={};

        let usernameReg = /^[0-9a-zA-Z]+$/;
        let emailReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

        if(username.trim()===''){
            errors.username="Username required";
        }else if(username.length<5){
           errors.username="Min 5 character required";
        }else if(username.length>8){
            errors.username="Max 8 character only";
        }else if(!username.match(usernameReg)){
            errors.username="Alphanumeric only";
        }


        if(email.trim()===''){
            errors.email="Email required";
        }else if(email.length>50){
            errors.email="Max 50 character only";
        }else if( !emailReg.test(email) ){
            errors.email="Invalid Email";
        }


        if(password.trim()===''){
            errors.password="Password required";
        }else if(password.length<8){
            errors.password="Min 8 character required";
        }


        if(first_name.trim()===''){
            errors.firstname="Firstname required";
        }else if(password.length>20){
            errors.firstname="Max 20 character only";
        }

        if(last_name.trim()===''){
            errors.lastname="Lastname required";
        }else if(password.length>20){
            errors.lastname="Max 20 character only";
        }

        if(Object.keys(errors).length !== 0){
            setErrors(errors);
            return ;
        }else{
            errors={};
            setErrors(null);
        }
        const role = 'author';
        const user = {
            username,
            email,
            password,
            first_name,
            last_name,
            role
        }
        console.log(user);
        authService.signup(user)
        .then(res=>{
            if(res.code === 200){
                notify('S',res.message);                
                setFirstname('');
                setLastname('');
                setUsername('');
                setEmail('');
                setPassword('');
                history.replace('/');
            }else{
                notify('E',"Registration Failed");
            }                
            console.log('signup res',res);
        })
        .catch(err=>{
            console.log('signup error',err);
            notify('E',"Registration Failed");
        })
    }

    useEffect(()=>{
        if(localS.getLocal('token')){
            history.replace('/dashboard');
        }
    },[])
    return (
        <div className="container">
        <div className="row pt-5 justify-content-center align-items-center">
            <div className="col-md-6">
            <div className="card signup p-3 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Signup</h5>
                <form onSubmit={handleSignupSubmit}>
                    <div className="form-group">                        
                        <input onChange={(e)=>setFirstname(e.target.value)} value={first_name} type="text" className="form-control" id="firstname"  placeholder="Firstname" />
                        { errors &&  errors.firstname && <div className="invalid-feedback">  {errors.firstname} </div> }
                    </div>
                    <div className="form-group">
                       
                        <input onChange={(e)=>setLastname(e.target.value)} value={last_name} type="text" className="form-control" id="lastname"  placeholder="Lastname" />
                        { errors && errors.lastname && <div className="invalid-feedback">  {errors.lastname} </div> }
                    </div>
                    <div className="form-group">
                        
                        <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" className="form-control" id="username"  placeholder="Username" />
                        { errors && errors.username && <div className="invalid-feedback">  {errors.username} </div> }
                    </div>
                    <div className="form-group">
                        
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="form-control" id="email"  placeholder="Email" />
                        { errors && errors.email && <div className="invalid-feedback">  {errors.email} </div> }
                    </div>
                    <div className="form-group">
                        
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
                        { errors && errors.password && <div className="invalid-feedback">  {errors.password} </div> }
                    </div>              
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
                <div>Already have account? <Link to={'/'}>Login</Link></div>
            </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Signup;