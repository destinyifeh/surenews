import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import Header2 from '../Header2';
function UpdateUser(props){
      const [user, setUser] = useState([]);
      const [email, setEmail] = useState('');
     
     const [users, setUsers] = useState([]);
      
  let changeEmail = (e) =>{
       let email = e.target.value;
       setEmail(email)
  };

  

  let onSubmit = (e) =>{
      e.preventDefault();

        if(!email){
              let err = 'You cant submit empty input';
              console.log(err)
              toast.error('You cant submit empty input');
              return false;
          }
     
      if(user.email === email){
          let err = 'Email upto date';
            console.log(err);
            toast.info('Email upto date');
            return false;
      }else{
     let checkEmail = users.map(user=>user.email);
     
         if(checkEmail.includes(email)){
            console.log(checkEmail)
            let err = 'Email already exist';
            console.log(err);
            toast.error('Email already exist');
            return false;
        }else{
            let updateAdmin = {
            email: email,
           
        }
           console.log(updateAdmin)
           axios.put('/api/user/data-update/'+props.match.params.id, updateAdmin)
           .then(res=>{
               console.log(res.data)
               toast.success('Record updated')
              setEmail(res.data.email)
           })
           .catch(err=>{
               console.log(err.response)
               toast.error('Oops! An error occur, try again')
           })
        }
      
           
      }
         
  } 
        
       
 
    
    
    useEffect(()=>{
        
       let userId = props.match.params.id;
       console.log(userId)
     
       axios.get('/api/admin/update/'+userId)
      .then(res=>{
          console.log(res.data)
          setEmail(res.data.email);
          setUser(res.data);
      })
      .catch(err=>{
          console.log(err.response)
      });

        axios.get('/signup/users')
      .then(res=>{
          console.log(res.data)
          setUsers(res.data);
         
      })
      .catch(err=>{
          console.log(err.response)
      });

    }, [props])


    return(
        <div>
          <Header2/>
                  <div className="container my-4">
                    <h5 className="Register-header text-center">Update Your Admin Account</h5>
                      <form onSubmit={onSubmit}>
                  
                     <div className="form-group">
                        <label>Email</label>
                        <input type="email"  value={email} onChange={changeEmail} className="form-control"/>
                    </div>
                   
                  
                    <div className="form-group my-3">
                        <button className="btn btn-dark">Update Admin Record</button>
                    </div>
                    </form>
                    <Link className="" to="/admin/forgot-password">Forgotten Password?</Link>
                </div>
        </div>
    )
     
}



export default UpdateUser;