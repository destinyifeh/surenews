import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

class Footer extends Component {

            constructor(){
                super()
                this.state={
                    messageBody: '',
                    messageName: '',
                    messageMail: '',
                    sending: false,
                    success: false,
                    error: false,
                }

                this.handleMessageBody = this.handleMessageBody.bind(this)
                this.handleMessageMail = this.handleMessageMail.bind(this)
                this.handleMessageName = this.handleMessageName.bind(this)
                this.onSubmit = this.onSubmit.bind(this);

            }


            handleMessageBody=(e)=>{
                 let target = e.target.value;
             
                this.setState({
                    messageBody: target
                })
                if(target){
                    this.setState({
                        error: false,
                        success: false,
                    })
                   }
            }

            handleMessageMail=(e)=>{
                let target = e.target.value;
            
               this.setState({
                   messageMail: target
               })
               if(target){
                this.setState({
                    error: false,
                    success: false,
                })
               }
           }

           handleMessageName=(e)=>{
            let target = e.target.value;
        
           this.setState({
               messageName: target,
               
           })
           if(target){
            this.setState({
                error: false,
                success: false,
            })
           }
           console.log(target)
       }


       onSubmit(e){
           e.preventDefault();
           let {messageBody, messageMail, messageName} = this.state;
           let messages = {
               messageBody: messageBody,
               messageMail: messageMail,
               messageName: messageName
           }
           console.log(messages)
           
           if(!messageBody || !messageMail || !messageName){
               let err = 'you cant submit empty input';
               console.log(err)
               toast.error('You cant submit an empty input')
               return false;
           }  else{
              
               axios.post('https://surenews.herokuapp.com/email-messages', messages)
               .then(res=>{
                   console.log(res.data)
                   this.setState({
                            messageBody: '',
                            messageName: '',
                            messageMail: '',
                            sending: true,
                   })
                   let success = 'Messages posted';
                   console.log(success);
                    setTimeout(()=>{
                        this.setState({sending: false, success: true})
                        toast.success('Message sent')
                    }, 5000)
                  
                 
               })
               
              .catch(err=>{
                  console.log(err.response)
                  this.setState({
                    messageBody: '',
                    messageName: '',
                    messageMail: '',
                    sending: true,
               })

               setTimeout(()=>{
                this.setState({sending: false, error: true})
                toast.error('oops! message not sent')
            }, 5000)
              })
           }  
        
        }

    render(){
          
        return(

            <div className="container-fluid footer p-2">
                        <div className="row my-3">
                            <div className="col-sm-6">
                        <ul className="nav d-flex justify-content-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="">Home</Link>
                                </li>
                                
                                  <li className="nav-item">
                                <Link className="nav-link" to="">Disclaimer</Link>
                                </li>
                                  <li className="nav-item">
                                <Link className="nav-link" to="">Privacy Policy</Link>
                                </li>
                        </ul>
                        <h5 className="text-center mt-2">About Us</h5>
                         <p>We are number one platform for news update. We give both domestic and international news update</p>
                        </div>
                        <div className="col-sm-6">
                            <h5 className="text-center mt-2">Contact Us</h5>
                            {this.state.sending ? <p className="text-center text-success">Message sending... </p>: '' }
                           {this.state.success ? <p className="text-center text-success message">Message sent </p>: '' }
                           {this.state.error ? <p className="text-center text-success message">Oops! Message not sent, try again </p>: '' }

                    <form className="contact-form" onSubmit={this.onSubmit}>
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" value={this.state.messageName} onChange={this.handleMessageName} placeholder="Enter your name"/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" value={this.state.messageMail} onChange={this.handleMessageMail} placeholder="Enter your email"/>
                    </div>
                    <div className="form-group mt-2">
                        <textarea className="form-control" value={this.state.messageBody} onChange={this.handleMessageBody} placeholder="Your message...." rows="3"/>
                    </div>
                    <div className="form-group mt-3">
                     <button className="btn btn-success">Send</button> 
                    </div>
                </form>
                </div>
                 </div>
                <p className="text-center mt-5"> surenews &copy; 2021. All rights reserved</p>
            </div>
        )
    }
}

export default Footer;