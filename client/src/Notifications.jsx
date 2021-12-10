import {Component} from 'react';
//import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import {toast} from 'react-toastify';
import Header2 from './Header2';


class Notifications extends Component {
     
            constructor(){
                super()
                this.state={
                     subscribers:[],
                     mail:'',
                     copied: false,
                }

                this.handleChange = this.handleChange.bind(this);
                this.onSubmit = this.onSubmit.bind(this);
            }

          handleChange(e){
              let target = e.target.value;
              this.setState({mail: target})
              console.log(target)
          }


          onSubmit(e){
              e.preventDefault();
               
              let mailList = {
                     mail: this.state.mail,
              }
              console.log(mailList)

              axios.post('http://localhost:5000/subscribers/mailist', mailList)
              .then(res=>{
                  console.log(res.data)
                  toast.success('Subscription message sent')
                  this.setState({mail: ''})
              })
              .catch(err=>{
                  console.log(err.response)
                  toast.error('Oops! An error occur, try again')
                  this.setState({mail: ''})

              })
          }


      componentDidMount(){
         axios.get('http://localhost:5000/email/subscribers')
         .then(res=>{
            console.log(res.data)
             this.setState({subscribers: res.data})
         })
         .catch(err=>console.log(err.response))
}


       

      render(){

         document.title = 'Surenews - Admin';
         let subscribers = this.state.subscribers.map(sub=>sub.subEmail);
         //console.log(subscribers)
 return(
     <div>
      <Header2/>
      
      <div className="container-fluid dashboard">
         
      <div className="container-fluid my-5">
          <div className="row ">
          <div className="col-md-4 ">
      <h5 className="text-center" >All Subscribed Mail</h5>
        <span className="">{this.state.copied? <p className="text-center text-success">Copied email</p> : ''}</span>
        <div className="form-group">
              <label className="p-2"></label>
              <textarea className="form-control bg-light" value={subscribers.join(",")} rows="5" readOnly/>
              <CopyToClipboard text={subscribers.join(",")} onCopy={()=>this.setState({copied: true})}>
              <button className="">Copy to clipboard</button>
              </CopyToClipboard>
          </div>
          </div>
              <div className="col-md-8 create-post">
                  <h5 className="text-center" >Subscription Mail</h5>
                  

                   
      <form className="post-form" onSubmit={this.onSubmit}>
         
         
             
          <div className="form-group">
              <label className="p-2">MailList</label>
              <textarea className="form-control" value={this.state.mail} onChange={this.handleChange} rows="5" />
          </div>
          <div className="form-group mt-3">
              <button className="btn btn-dark p-2">Post mail</button>
          </div>
           </form>



             </div>
          </div>
      </div>
     </div>
      </div>
 )
}
}

export default Notifications;