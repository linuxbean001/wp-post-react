import React,{useState,useEffect} from 'react';
import Modal from '../modal/Modal';
import {postService} from '../../services/postService';
import Posts from './Posts';
import AddPost from './AddPost';
import EditPost from './EditPost';
import notify from '../../helper/notify';

const Dashboard = props =>{
    const [openModal, setOpenModal]= useState(false);
    const [openEditModal, setOpenEditModal]= useState(false);
    const [editPost,setEditPost] = useState(null);
    const [posts,setPosts]= useState(null);
    const [reset,setReset] = useState(false);

    const handleAddNewPost = post =>{
        setReset(false);
        postService.createPost(post)
        .then(res=>{            
            notify('S','Created Successfully');
            setPosts([res,...posts]);
            getAllPosts();
            setOpenModal(false);
            setReset(true);
        })
        .catch(err=>{
            console.log('add post error',err);
            notify('E','Can not create post');
        })
    }

    const handleOnEdit = p =>{        
        setOpenEditModal(true);
        setEditPost(p);
    }
    const handleUpdatePost = p =>{  
        const id = p.id; 
        delete p.id;   
        postService.updatePost(id,p)
        .then(res=>{        
            notify('S','Updated Successfully');
            setPosts(posts.map(p=> p.id===res.id?res:p));
            getAllPosts();
            setEditPost(false);
            setOpenEditModal(false);
            
        })
        .catch(err=>{
            notify('E','Updated Failed');
            console.log('update err',err);
        })
    }
    const handleOnDelete= p =>{
        if(window.confirm('Are you sure')){          
            postService.deletePost(p.id)
            .then(res=>{                
                notify('S','Deleted Successfully');
                setPosts(posts.filter(p=> p.id!==res.id));                
            })
            .catch(err=>{
                console.log('delete error r',err);
                notify('E','Deletion failed');
            })
        }        
    }


    function getAllPosts(){
        postService.getAllPosts()
        .then(res=>{           
            //setPosts(res.filter(r=> r.status==='publish'));
            setPosts(res);
        })
        .catch(err=> console.log('posts fetch error'))
    }
    useEffect(()=>{
        getAllPosts();
    },[]);
    return(
        <React.Fragment>
            <h3 className="text-center">Posts</h3>
            <button onClick={()=> setOpenModal(true)} className="btn btn-primary my-3">Create</button>
            <Modal open={openModal} title={"Add New Post"} onClose={()=> setOpenModal(false)} >
                <AddPost onSubmit={handleAddNewPost} reset={reset}/>
            </Modal>
            <Posts posts={posts} onEdit={handleOnEdit} onDelete={handleOnDelete}/>
            <Modal open={openEditModal} title={"Update Post"} onClose={()=> setOpenEditModal(false)} >
               {editPost && <EditPost onSubmit={handleUpdatePost} post={editPost}/>}
            </Modal>
        </React.Fragment>
    )
}

export default Dashboard;