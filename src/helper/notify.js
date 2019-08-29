import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function notify(type,message){
   
    switch(type){
        case 'S':           
            toast.success(message);
            break;
        case 'E':
            toast.error(message);
            break;
        case 'W':
            toast.warn(message);
            break;
        case 'I':
            toast.info(message);
            break;
        default:
            toast(message);
            
    }
}

export default notify;