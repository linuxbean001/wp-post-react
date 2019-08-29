import React from 'react';

const Modal = props =>{

    return( 
        <React.Fragment>     
        <div className={"modal fade"+(props.open?' show ':'')}       
        tabIndex="-1" 
        role="dialog"         
        aria-hidden={!props.open}
        style={{display:props.open?"block":"none"}}
        >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">{props.title}</h5>
                <button onClick={()=> props.onClose()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {props.children}
            </div>
          
            </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default Modal;