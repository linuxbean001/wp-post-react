import React from 'react';
import Post from './Post';

const Posts = props =>{
    const posts = props.posts;
    return posts ? (
        <div className="posts">
            <div className="card-columns">
                {
                    posts.map(post=>(
                        <Post post={post} key={post.id} onEdit={(p)=>props.onEdit(p)} onDelete={(p)=>props.onDelete(p)}/>
                    ))
                }
                
            </div>
        </div>
    ) : (
        <div className="d-flex justify-content-center">
        <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        </div>
        )
}

export default Posts;