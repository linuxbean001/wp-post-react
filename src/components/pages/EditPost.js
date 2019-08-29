import React,{useState,useEffect} from 'react';
import striptags from 'striptags';
const EditPost = props =>{
    const [id,setId] = useState(null);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [status,setStatus] = useState('publish');

    // error states
    const [errors,setErrors] = useState(null);


    const handleAddPostSubmit = e =>{
        e.preventDefault();

        let errors={};

        let titleReg = /^[0-9a-zA-Z\s]+$/;
        

        if(title.trim()===''){
            errors.title="Title required";
        }else if(title.length>50){
            errors.title="Max 50 character only";
        }else if(!title.match(titleReg)){
            errors.title="Alphanumeric only";
        }

        if(content.trim()===''){
            errors.content="Content required";
        }else if(content.length>250){
            errors.content="Max 250 character only";
        }

        if(Object.keys(errors).length !== 0){
            setErrors(errors);
            return ;
        }else{
            errors={};
            setErrors(null);
        }

        if(!id){
            alert('Id required');
            return;
        }

        const newPost = {
            id,
            title,
            content,
            status
        }
      
        props.onSubmit(newPost);       

    }
    useEffect(()=>{
        setId(props.post.id);
        setTitle(props.post.title.rendered);
        setContent(striptags(props.post.content.rendered));
        setStatus(props.post.status);
    },[props.post]);
    return(
        <div className="add_post">
             <form onSubmit={handleAddPostSubmit}>
                    <div className="form-group">                        
                        <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" className="form-control" placeholder="Title" autoFocus />
                        { errors &&  errors.title && <div className="invalid-feedback">  {errors.title} </div> }
                    </div>
                    <div className="form-group">
                    <textarea onChange={(e)=>setContent(e.target.value)} value={content} className="form-control" rows="3" placeholder="Content"></textarea>
                        {/* <input onChange={(e)=>setContent(e.target.value)} value={content} type="text" className="form-control" placeholder="Content" /> */}
                        { errors && errors.content && <div className="invalid-feedback">  {errors.content} </div> }
                    </div>
                    <div className="form-group">
                        <label htmlFor="poststatus">Status</label>
                        <select onChange={(e)=> setStatus(e.target.value)} value={status} className="form-control" id="poststatus">
                            <option value="publish">Publish</option>
                            <option value="future">Future</option>
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                            <option value="private">Private</option>                        
                        </select>
                    </div>
                                
                    <button type="submit" className="btn btn-success">Update</button>
                </form>
        </div>
    )
}

export default EditPost;