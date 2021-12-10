import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header2 from './Header2';


class ReadMess extends Component {
         
       constructor(props){
           super(props)

           this.state={
                   messageMail: '',
                   messageName: '',
                   messageBody: '',
           }
       }
            

       componentDidMount(){
           axios.get(`https://surenews.herokuapp.com/message/${this.props.match.params.id}`)
            .then(res=>{
                console.log(res.data)
                this.setState({
                    messageBody: res.data.messageBody,
                    messageName: res.data.messageName,
                    messageMail: res.data.messageMail
                })
            })
       }

       

         render(){
             return(
                <div>
                <Header2/>
               <div className="container col-sm-6 my-4">
                   <h5 className="text-center">Email Full Detail</h5>
                   <div className="all-post">
                   <p>{this.state.messageBody}</p>
               <div className="d-flex justify-content-between">
                  <Link className="delete bg-danger text-white" to="/admin/messages" >Go back to inbox</Link>
                  <Link className="edit" to="/admin/dashboard">Go back to dashboard</Link>

               </div>
                   </div>
               </div>
           </div>
             )
         }
}


export default ReadMess;