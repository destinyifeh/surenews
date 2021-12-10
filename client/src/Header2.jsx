import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Header2 extends Component {
                     constructor(){
                         super()
                         this.state={
                             inbox:[],

                          }
                     }




                componentDidMount(){
                    axios.get('/email-messages')
                    .then(res=>{
                        console.log(res.data)
                        this.setState({inbox: res.data.length})
                    })
                    .catch(err=>console.log(err.response))
                }    

                logout(){
                    sessionStorage.removeItem('currentUser');
                    sessionStorage.removeItem('logger');
                    sessionStorage.removeItem('userId');
                   
                    toast.success('You loggged Out')
                    setTimeout(()=>{
                     window.location.href = '/admin/login';

                    }, 1000)
                } 
    render(){
            let current = sessionStorage.getItem('currentUser');
            let currentUser = JSON.parse(current);
        return(

            <div className="container-fluid bg-dark p-2  admin-header">
           <ToastContainer className="text-center" position="top-center"/>
            <Link className=" text-center  " to="/admin/dashboard"><h5 className="head mb-3">Surenews Admin Dashboard</h5></Link>
               <div className="container-fluid d-flex justify-content-around">
               <ul className="nav ">
             <li className="nav-item">
             <Link className="nav-link" to="/">Home</Link>
             </li>
             {currentUser?
             <li className="nav-item">
             <Link className="nav-link" to="#" onClick={this.logout}>Logout</Link>
             </li>
             : ''  }
            

             <li className="nav-item">
             <Link className="nav-link" to="/admin/notify">
             <button type="button" className="btn btn-success">
                 Notifications <span className="badge bg-danger">3</span>
             </button>
             </Link>
             </li>
               
             <li className="nav-item">
             <Link className="nav-link" to="/admin/messages">
             <button type="button" className="btn btn-success position-relative">Inbox
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{this.state.inbox}
              <span className="visually-hidden">Unread Messages</span>
              </span>
             </button>
             </Link>
             </li>
               </ul>
               <ul className="nav">
              
             <li className="nav-item">
             <Link className="nav-link" to="/admin/dashboard" >Welcome Admin {currentUser? currentUser.username: ''}</Link>
             </li>
             <li className="nav-item">
             <Link className="nav-link" to="/admin/profile">{currentUser?'Profile' : <Link className="" to="/admin/login">Login</Link>}</Link>
             </li>
               </ul>
               </div>
               </div>
        )
    }
}

export default Header2;