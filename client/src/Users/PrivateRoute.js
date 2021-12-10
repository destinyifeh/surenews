import {Route, Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

const PrivateRoute=({component: Component, ...rest})=> {
              

         let currentUser = sessionStorage.getItem('userId');
          let currentLocation = rest.location.pathname;

               if(!currentUser && currentLocation !== '/admin/login'){
                   sessionStorage.setItem('redirectTo', currentLocation);
                  
               }
               return(<Route {...rest} render={(props)=>(
                 currentUser? <Component {...props}/> : toast.info('Unauthorized! Login to access this page') && <Redirect to='/admin/login'/>
               )}/>
               )

    }


 export default PrivateRoute;