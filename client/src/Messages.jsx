import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Header2 from './Header2';

class Messages extends Component {
               
    constructor(){
        super()
        this.state={
             messages:[],
             readMail:[],
        }
    }
            
    componentDidMount(){
        axios.get('http://localhost:5000/mail-messages')
        .then(res=>{
            console.log(res.data)
            this.setState({messages: res.data})
        })
        .catch(err=>console.log(err.response))

        //read mail//
        axios.get('http://localhost:5000/read-messages')
        .then(res=>{
            console.log(res.data)
            this.setState({readMail: res.data})
        })
        .catch(err=>console.log(err.response))
    }  
       updateMessage(){

        axios.get('http://localhost:5000/mail-messages')
        .then(res=>{
            console.log(res.data)
            this.setState({messages: res.data})
        })
        .catch(err=>console.log(err.response))

        //read mail//
        axios.get('http://localhost:5000/read-messages')
        .then(res=>{
            console.log(res.data)
            this.setState({readMail: res.data})
        })
        .catch(err=>console.log(err.response))
       }

        handleDelete(id){
            console.log(id)
            axios.delete(`http://localhost:5000/delete/message/${id}`)
            .then(res=>{
                console.log(res.data)
                this.setState({messages: this.state.messages.filter(el=>el._id!==id)})
                toast.success('Message deleted')
            })
            .catch(err=>{
                console.log(err.response)
                toast.error('An error occur while deleting this message');
            })

            this.updateMessage();
        }
         render(){
             let messages = Array.from(this.state.messages);
             let readMail = Array.from(this.state.readMail);

             return(
                <div>
                <Header2/>
               <div className="container my-4">
                   <div className="row">
                       <div className="col-sm-6">
                   <h5 className="text-center my-2">Unread Emails</h5>
                   {messages.map((mess, index)=>{
                       return(
                   <div className="all-post" key={index}>
                   <Link className="" to={`/message/${mess._id}`}  ><h5 className="">Message from: {mess.messageName} email: {mess.messageMail}</h5></Link>
               <div className="d-flex justify-content-between">
                  <Link className="delete bg-danger text-white" to="#" onClick={()=>{this.handleDelete(mess._id)}}>Delete</Link>
                  <Link className="edit" to={`/message/${mess._id}`}>Read</Link>

               </div>
                   </div>
                   )
                   })}
                   </div>
                   <div className="col-sm-6">
                   <h5 className="text-center my-2">All Read Emails</h5>
                   {readMail.map((mess, index)=>{
                       return(
                   <div className="all-post" key={index}>
                   <Link className="text-dark" to={`/message/${mess._id}`}  ><h5 className="">Message from: {mess.messageName} email: {mess.messageMail}</h5></Link>
               <div className="d-flex justify-content-between">
                  <Link className="delete bg-danger text-white" to="#" onClick={()=>{this.handleDelete(mess._id)}}>Delete</Link>
                  <Link className="edit" to={`/message/${mess._id}`}>Read</Link>

               </div>
                   </div>
                   )
                   })}
                   </div>
               </div>
               </div>
           </div>
             )
         }
}


export default Messages;