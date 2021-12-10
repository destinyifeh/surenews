import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import Header from './Header';
function Unsubscribe(){

    const [subscribers, setSubscribers] = useState([]);
     const [email, setEmail] = useState([]);
     const [query, setQuery] = useState('');

     let handleSubscriber=(e)=>{
        let query = e.target.value;
        setQuery(query);
        console.log(query)

       
     };


     let onSubmit=(e)=>{
         e.preventDefault();
       // console.log(subscribers)
         let checkSubscriber = subscribers.filter(subscriber=>subscriber.subEmail.includes(query))
         if(checkSubscriber.length > 0){
            let success = 'Email exist';
            console.log(success)
            setQuery('');
          let email = checkSubscriber;
            setEmail(email);
          
         }else{
             let error = 'No email found';
             console.log(error);
             toast.error('Email not found');
             setQuery('');
             return false;
         }
     }



     useEffect(()=>{
        axios.get('http://localhost:5000/email/subscribers')
        .then(res=>{
           console.log(res.data)
           let subscribers = res.data;
           setSubscribers(subscribers);
        })
        .catch(err=>console.log(err.response))

     },[])
   
     let handleRemove=(id)=>{
       console.log(id)

       axios.delete('http://localhost:5000/remove-mail/list/'+id)
       .then(res=>{
           console.log(res.data)
           let remove = email.filter(el=>el._id !== id)
           console.log(remove)
           setEmail(remove);
           toast.success('Unsubscribed successfully');
           setTimeout(()=>{
            window.location.href="/";
           }, 300)
       })
       .catch(err=>{
           console.log(err.response)
           toast.error('Oops! An error occur, try again')
       })
     }
     
    return(
        <div>
            <Header/>
          <div className="container my-5">
              <form className="" onSubmit={onSubmit}> 
              <div className="form-group">
              <input type="search" className="form-control" placeholder="enter your email" value={query} onChange={handleSubscriber} />

                  </div> 
              <div className="form-group mt-3">
                <button className="btn btn-success">Continue</button>  
                  </div>                     
              </form>
              </div> 

              <div className="container">
                   
                   {email.map((mail, index)=>{
                       return(
                           <div className="container d-flex justify-content-around border removal" key={index}>
                         <h5 className="text-center">Email found</h5>

                          <p className="removalEmail" >{mail.subEmail}</p>
                          <Link className="removalBtn text-danger" to="#" onClick={()=>{handleRemove(mail._id)}}>Unsubscribe</Link>

                          </div>
                       )
                   })}
              </div> 
        </div>
    )
}

export default Unsubscribe;