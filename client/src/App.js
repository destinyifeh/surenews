import { Component } from "react";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Show from './News/Show';
import Home from './Home';
import Dashboard from './Dashboard';
import Edit from "./News/Edit";
import Register from "./Users/Register";
import Login from "./Users/Login";
import Forgot from "./Users/Forgot";
import Reset from "./Users/Reset";
import Notifications from './Notifications';
import Messages from './Messages';
import ReadMess from './ReadMess';
import Profile from './Users/Profile';
import UpdateUser from './Users/UpdateUser';
import PrivateRoute from './Users/PrivateRoute';
import Unsubscribe from './Unsubscribe';
import NotFoundPage from './NotFoundPage';
import ServerError from './ServerError';
import Incomplete from './Incomplete';
class App extends Component {
                
             
     
     render(){
        let userId = sessionStorage.getItem('userId');
        console.log(userId)
           let locate = window.location.pathname;
           console.log(locate)  
           if(locate !== '/admin/login' || '/' ){
            sessionStorage.setItem('prevLocation', locate);

           }   

     return(

          <div>
           <BrowserRouter>
          
           <Switch>
           <Route path='/' exact component={Home}/>
           <Route path='/admin/dashboard'>{userId? <Dashboard/>: <Redirect to="/admin/login"/>}</Route>
           <Route path='/news/:slug' component={Show}/>
           <Route path='/edit/news/:slug' component={Edit}/>
          {/* <Route path='/admin/login' component={Login}/>*/}
           <Route path='/admin/login' >{userId? <Dashboard/> : <Login/>}</Route>

           <Route path='/admin/register' component={Register}/>
           <Route path='/admin/forgot-password' component={Forgot}/>
           <Route path='/admin/reset-password/:token' component={Reset}/>
           <PrivateRoute path='/admin/notify' component={Notifications}/>
            <Route path='/admin/messages'>{userId? <Messages/> : <Redirect to="/admin/login"/>}</Route>
            <Route path='/message/:id' component={ReadMess}/>
            <PrivateRoute path='/admin/profile' component={Profile} />
            <Route path='/admin/edit/:id' component={UpdateUser}/>
            <Route path='/mail-list/unsubscribe' component={Unsubscribe}/>
            <Route path='/error/500' component={ServerError}/>
            <Route path='/error/404' component={Incomplete}/>

            <Route path='*' component={NotFoundPage}/>

           </Switch>
           </BrowserRouter>
           <ToastContainer className="text-center" position="top-center"/>
         </div>
     )
  }
}


export default App;