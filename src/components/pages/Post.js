import React,{useState,useEffect} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';
import {API_URL} from '../../configs/appConfig';
const Post = props =>{
    const post = props.post;
    const [author,setAuthor] =useState(null);       
    
    useEffect(()=>{
        if(post){
            axios.get(`${API_URL}/users/${post.author}`)
            .then(res=>{            
                setAuthor(res.data);            
            })
            .catch(err=>{
                console.log('Single post data fetch error',err);
            })
        }
        
    },[post])

    return(
        <div className="card post shadow-sm">
            <div className="card-header post-header">
            <h5 className="card-title">{post.title.rendered}</h5>
                <div  className="post-actions">
                    <i onClick={()=>{props.onEdit(post)}} className="fa fa-pencil mx-2"></i>
                    <i onClick={()=>props.onDelete(post)} className="fa fa-trash-o"></i>
                </div>
            </div>           
                <div className="card-body">
               
                <p className="card-text" dangerouslySetInnerHTML={{__html:post.content.rendered}}></p>
            
                <blockquote className="blockquote mb-0">                    
                    <footer className="blockquote-footer">
                        <small className="author_name">
                            By {author && author.name}                            
                        </small>
                    </footer>
                </blockquote>
                <p className="card-text"><small className="text-muted">Last updated <Moment fromNow>{post.modified_gmt}</Moment></small></p>
                
            </div>
            {/* <div className="card-footer">                
                <small className="text-muted post-status">Status: {post.status}</small>
            </div> */}
        </div>
    )
}

export default Post;