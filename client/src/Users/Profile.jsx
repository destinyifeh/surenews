import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import Header2 from '../Header2';

function Profile() {
  // eslint-disable-next-line
      const [users, setUsers] = useState([]) ;
      useEffect(()=>{
        toast.success('Welcome');
        axios.get('/signup/users')
        .then(res=>{
          let data = res.data;
           setUsers(data)
        })
        .catch(err=>{
          console.log(err.response)
        })

      }, [])

     let current = sessionStorage.getItem('currentUser');
     let currentUser = JSON.parse(current);

              const logout=()=>{
                    sessionStorage.removeItem('currentUser');
                    sessionStorage.removeItem('logger');
                    sessionStorage.removeItem('userId');
                 
                }; 

     const handleDelete = (id) =>{
       console.log(id)
       axios.delete('/user/delete/'+id)
       .then(res=>{
         console.log(res.data)
         let otherUsers = users.filter(el=>el._id !== id)
         setUsers(otherUsers)
         toast.success('Deleted')
          logout();
        window.location.href='/admin/login';
       })
       .catch(err=>{
         console.log(err.response)
       })
      
     }
       
   let myUsers = Array.from(users)
   console.log(myUsers)

  
    return(
         <div>
             <Header2/>
          
        <div className="container my-4">
        <div className="all-post">
              
             <h5 className="card-title">Username: {currentUser? currentUser.username: ''}</h5>
             
              <h5 className="card-title">Email: {currentUser? currentUser.email: ''}</h5>

             <div className="d-flex justify-content-between">
                       <Link className=" text-success " to={`/admin/edit/${currentUser._id}`}>edit</Link>
                       <Link className="text-success" to='#' onClick={()=>{handleDelete(currentUser._id)}}>delete account</Link>

                    </div>
              </div>
        </div>
        </div>
    )
   

    
}

export default Profile;