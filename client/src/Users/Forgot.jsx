import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header2 from '../Header2';
import { toast } from 'react-toastify';

class Forgot extends Component {
          constructor(){
              super()
               this.state={
                   email: '',
                   users:[],
                   sending: false,
               }
                this.inputRef = React.createRef();
                this.handleEmail = this.handleEmail.bind(this);
                this.onSubmit = this.onSubmit.bind(this);
          }
      
          handleEmail(e){
              let target = e.target.value;
              this.setState({email: target})
          }

        onSubmit(e){
            e.preventDefault();

            let {email, users} = this.state;
            let checkEmail = users.map(user=>user.email);
            if(checkEmail.includes(email)){
                console.log(checkEmail)
                let userEmail={
                    email: email,
                }
                console.log(userEmail)
                axios.post('http://localhost:5000/forgot/password', userEmail)
                .then(res=>{
                    console.log(res.data)
                     this.setState({
                         sending: true,
                       })
                       
                     setTimeout(()=>{
                        this.setState({
                            sending: false,
                            email:'',
                        })
                     }, 5000)
                    setTimeout(()=>{
                        toast.success('Forgot password link has been sent to your email address');
                    }, 5000)
                })
                .catch(err=>{
                    console.log(err.response)
                    this.setState({
                        sending: true,
                     
                    })
                      
                    setTimeout(()=>{
                       this.setState({
                           sending: false,
                           email:'',
                       })
                    }, 5000)
                   setTimeout(()=>{
                       toast.error('oops! An error occur, try again');
                   }, 5000)
                })
            }else{
                let err = 'Email does not exist';
                console.log(err)
                toast.error('Email does not exist');
                return false;
            }
           
        }
          

          componentDidMount(){
              this.inputRef.current.focus();
              axios.get('http://localhost:5000/signup/users')
              .then(res=>{
                  console.log(res.data)
                  this.setState({users: res.data})
              })
              .catch(err=>{
                  console.log(err.response)
              })
          }
    render(){
     
        return(

            <div>
                 <Header2/>
                <div className="container my-4">
                    <h5 className="Register-header text-center">Enter Your Admin Account Registered Email</h5>
                    {this.state.sending? <p className="text-center text-success">Email sending...</p> : ''}
                      <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={this.state.email} onChange={this.handleEmail} className="form-control" ref={this.inputRef}/>
                    </div>
                    
                  
                    <div className="form-group my-3">
                        <button className="btn btn-dark">Send Reset Link</button>
                    </div>
                    </form>
                    <Link className="" to="/admin/login">Already an admin? Login</Link>
                </div>
            </div>
        )
    }
}


export default Forgot;