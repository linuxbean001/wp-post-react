import axios from 'axios';
import {API_URL} from '../configs/appConfig';
import {localS} from '../helper/localS';
// const token = localS.getLocal('token');
// if(token){
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localS.getLocal('token');
    if(token){
        // console.log('Token found',token);
        // console.log('config',config);
        config.headers={...config.headers,Authorization:`Bearer ${token}`}
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const  postService = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
}


async function getAllPosts(){
    try {
        const response = await axios.get(`${API_URL}/posts?_embed`);       
        return response.data;
      } catch (error) {
        console.error('get posts error',error);
      }   
}


async function createPost(post){
    try {
        const response = await axios.post(`${API_URL}/posts`,post);    
        return response.data;
      } catch (error) {
        console.error('create post error ',error);
      }    
}


async function updatePost(id,post){
    try {
        const response = await axios.put(`${API_URL}/posts/${id}`,post);     
        return response.data;
      } catch (error) {
        console.error('update post error ',error);
      }    
}


async function deletePost(id){
    try {
        const response = await axios.delete(`${API_URL}/posts/${id}`,{});      
        return response.data;
      } catch (error) {
        console.error('Post delete error ',error);
      }    
}
