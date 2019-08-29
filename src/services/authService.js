import axios from 'axios';
import {TOKEN_API_URL,API_URL} from '../configs/appConfig';

export const  authService = {
    login,
    signup
}


async function login(user){
    try {
        const response = await axios.post(`${TOKEN_API_URL}`,user);      
        return response.data;
      } catch (error) {
        console.error('Login service error',error);
      }   
}


async function signup(user){
    try {
        const response = await axios.post(`${API_URL}/users/register`,user);      
        return response.data;
      } catch (error) {
        console.error('Signup service error ',error);
      }    
}