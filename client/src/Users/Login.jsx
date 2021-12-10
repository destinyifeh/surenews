import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Header2 from '../Header2';

class Login extends Component {


    constructor(){
        super()
        this.state={
            username:'',
            password:'',
            users:[],
        }

        this.changePassword = this.changePassword.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

  
    changeUsername(e){
        let target = e.target.value;
      
        this.setState({username:target})
    }
       changePassword(e){
        let target = e.target.value;
      
        this.setState({password:target})
    }
          
    onSubmit(e){
        e.preventDefault();
       
        let {username, password, users} = this.state;

        let checkUsername = users.map(user=>user.username);
        if(checkUsername.includes(username)){
            let loginUser = {
                username: username,
                password: password,
          }

          console.log(loginUser)
          axios.post('http://localhost:5000/admin/signin', loginUser)
          .then(res=>{
            //  console.log(res.data.username)
              if(res.data === 'Incorrect password'){
                  toast.error('Incorrect passsword')
                  this.setState({password: ''})
              }else{
                let user = res.data._id;
                
                toast.success('success')
                this.setState({
                    currentUser: sessionStorage.setItem('currentUser', JSON.stringify(res.data)),
                    userId: sessionStorage.setItem('userId', user)
                })
                
               // let {from} = this.props.location.state ;
                  //  this.props.history.push(from);
                 // let redirectTo = sessionStorage.getItem('redirectTo');
                   let redirectTo = sessionStorage.getItem('prevLocation');
                  //let redirectToDashboard = sessionStorage.getItem('loginLocation');

               /* setTimeout(()=>{
                    window.location.href='/admin/dashboard';
                 }, 1000)*/

                 if(redirectTo){
                     window.location.href = redirectTo;
 
                 }
                 

                 
              }
               
            })
          .catch(err=>{
              console.log(err.response)
          })
        }else{
            let err = 'No user found';
            console.log(err)
            toast.error('No user found');
        }
       
    }



    componentDidMount(){
        axios.get('http://localhost:5000/signup/users')
        .then(res=>{
            //console.log(res.data)
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
                    <h5 className="Register-header text-center">Login Your Admin Account</h5>
                      <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"  value={this.state.username} onChange={this.changeUsername} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={this.changePassword} className="form-control"/>
                    </div>
                  
                    <div className="form-group my-3">
                        <button className="btn btn-dark">Login as admin</button>
                    </div>
                    </form>
                    <Link className="" to="/admin/forgot-password">Forgotten Password?</Link>
                </div>
            </div>
        )
    }
}


export default Login;