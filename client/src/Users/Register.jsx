import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Header2 from '../Header2';

class Register extends Component {
                 constructor(){
                     super()
                     this.state={
                         username:'',
                         email:'',
                         password:'',
                         confirm:'',
                         users:[],
                     }

                     this.changeConfirm = this.changeConfirm.bind(this);
                     this.changeEmail = this.changeEmail.bind(this);
                     this.changePassword = this.changePassword.bind(this);
                     this.changeUsername = this.changeUsername.bind(this);
                     this.onSubmit = this.onSubmit.bind(this);
                 }

               
                 changeEmail(e){
                     let target = e.target.value;
                   
                     this.setState({email:target})
                 }
                    changeUsername(e){
                     let target = e.target.value;
                   
                     this.setState({username:target})
                 }

                 changePassword(e){
                    let target = e.target.value;
                  
                    this.setState({password:target})
                }

                changeConfirm(e){
                    let target = e.target.value;
                  
                    this.setState({confirm:target})
                }




                onSubmit(e){
                    e.preventDefault();
                     let{username, email, password, confirm, users} = this.state;
                     
                     let checkUsername = users.map(user=>user.username);
                     let checkEmail = users.map(user=>user.email);

                     if(!username || !email || !password || !confirm){
                        let err = 'You cannot submit empty input';
                        console.log(err);
                        toast.error('You cannot submit an empty input')
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
                     }
                     if(checkUsername.includes(username)){
                         let err = 'username exist';
                         console.log(err);
                         toast.error('Username already exist');
                         this.setState({
                            password: '',
                            confirm: '',
                        });
                         return false;
                     }
                     if(checkEmail.includes(email)){
                        let err = 'Email exist';
                        console.log(err);
                        toast.error('Email already exist')
                        this.setState({
                            password: '',
                            confirm: '',
                        });
                        return false;
                    }
                     else{
                    let user = {
                        username: username,
                        email:email,
                        password:password,
                        confirm:confirm
                    }
                    console.log(user)
                     axios.post('/admin/signup', user)
                     .then(res=>{
                         console.log(res.data)
                         this.setState({
                            password: '',
                            confirm: '',
                            username: '',
                            email: '',
                        })
                        toast.success('success');
                        setTimeout(()=>{
                         this.props.history.push('/admin/dashboard');
                        }, 100)
                     })
                     .catch(err=>{
                         console.log(err.response)
                         this.setState({
                            password: '',
                            confirm: '',
                            username: '',
                            email: '',
                        })
                     })
                 }
                }

              componentDidMount(){
                  axios.get('/signup/users')
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
                    <h5 className="Register-header text-center">Signup For Admin Account</h5>
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Username</label>
                        <input type="text" value={this.state.username} onChange={this.changeUsername} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={this.state.email} onChange={this.changeEmail} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={this.changePassword} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" value={this.state.confirm} onChange={this.changeConfirm} className="form-control"/>
                    </div>
                    <div className="form-group my-3">
                        <button className="btn btn-dark">Register as admin</button>
                    </div>
                    </form>
                    <Link className="" to="/admin/login">Already an admin? Login</Link>
                </div>
            </div>
        )
    }
}


export default Register;