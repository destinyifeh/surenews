import {Component} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import Header2 from '../Header2';
import Forgot from './Forgot';

class Reset extends Component {
                constructor(props){
                    super(props)
                    this.state={
                        isValid: false,
                        password: '',
                        confirm: '',
                         
                    }
                    this.changePassword = this.changePassword.bind(this);
                    this.changeConfirm =this.changeConfirm.bind(this);
                    this.onSubmit = this.onSubmit.bind(this);
                }

                changePassword(e){
                    let target = e.target.value;
                    this.setState({password: target})
                }
                changeConfirm(e){
                    let target = e.target.value;
                    this.setState({confirm: target})
                }

 
                onSubmit(e){
                    e.preventDefault();
                      
                    let {password, confirm} = this.state;
                    if(!password || !confirm){
                        let err = 'Empty inputs detected, enter your password';
                        console.log(err)
                        toast.error('Empty input detected, enter your password');
                        
                        return false;
                    }
                    if(password.length < 4){
                        let err = 'pass mut be atleast 4 characters';
                        console.log(err)
                        toast.error('Password must be atleast 4 characters');
                        this.setState({
                            password: '',
                            confirm: '',
                        });
                        return false;
                     }
                     if(password!==confirm){
                         let err = 'Pass do not match';
                         console.log(err)
                         toast.error('Password do not match');
                         this.setState({
                            password: '',
                            confirm: '',
                        });
                         return false;
                     }  else{

                        
                     let passwordReset = {
                        password: password
                    }
                      console.log(passwordReset)

                      axios.post(`http://localhost:5000/reset-password/${this.props.match.params.token}`, passwordReset)
                      .then(res=>{
                          console.log(res.data)
                          toast.success('Success ')
                          this.props.history.push('/admin/dashboard');
                      })
                      .catch(err=>{
                          console.log(err.response)
                          toast.error('Oops: An error occur, try again')
                      })
                     }                 
                     
                }


  componentDidMount(){
      axios.get(`http://localhost:5000/reset-password/${this.props.match.params.token}`)
      .then(res=>{
          console.log(res.data)
          if(res.data === 'Password reset token is invalid or has expired'){
              toast.info('Password reset link is invalid or has expired')
              this.setState({isValid: false})
          }else{
              toast.success('You can now reset your password');
              this.setState({isValid: true})
          }
      })
      .catch(err=>{
          console.log(err.response);
      })
  }

    render(){
        if(this.state.isValid){
        return(

            <div>
                 <Header2/>
                <div className="container my-4">
                    <h5 className="Register-header text-center">Reset Your Admin Password</h5>
                      <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" value={this.state.password} onChange={this.state.changePassword} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" value={this.state.confirm} onChange={this.state.changeconFirm} className="form-control"/>
                    </div>
                  
                    <div className="form-group mt-3">
                        <button className="btn btn-dark">Reset</button>
                    </div>
                    </form>
                    <Link className="" to="/admin/login">Already an admin? Login</Link>
                </div>
            </div>
        )
      }else{
          return(
              <Forgot/>
          )
      }
    }
}


export default Reset;