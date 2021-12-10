import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import dayjs from 'dayjs';
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton, TwitterIcon, FacebookIcon,
   WhatsappShareButton, WhatsappIcon, LinkedinIcon, TelegramShareButton, TelegramIcon, EmailShareButton, EmailIcon} from 'react-share';
import relativeTime from 'dayjs/plugin/relativeTime';
import Header from '../Header';
import Footer from '../Footer';
import Search from './Search';
dayjs.extend(relativeTime);

class Show extends Component {

             constructor(props){
             super(props)
              this.state={
                    title: '',
                    detail: '',
                    image:[],
                    commentBody: '',
                    newsComment:[],
                    createdAt: '',
                    similar:[],
                    recent:[],
                    isComment:[],
                    allowComment:'',
                    slug:'',
              
              }
               this.changeComment =  this.changeComment.bind(this);
               this.onSubmit = this.onSubmit.bind(this);

             }

               
            changeComment(e){
              this.setState({
                 commentBody: e.target.value
              })
            } 

             onSubmit(e){
               e.preventDefault();

               let newComment = {
                 commentBody: this.state.commentBody
               }
               let sendComment = async () =>{
                 try{
                  let comment = await axios.post(`http://localhost:5000/comment/news/${this.props.match.params.slug}`, newComment)
                   console.log(comment.data.comments)
                   toast.success('Comment posted')
                   this.setState({
                        commentBody: '',
                        newsComment: comment.data.comments,
                   })
                 }
                 catch(err){
                   console.log(err.response)
                   toast.error('An error occur try again')
                 }
               }
               sendComment();
             }  

             


             componentDidMount(){
                 axios.get(`http://localhost:5000/showPost/${this.props.match.params.slug}`)
                 .then(res=>{
                   console.log(res.data)
                   this.setState({
                     title: res.data.title,
                     detail: res.data.detail,
                     image: res.data.image,
                     createdAt: res.data.createdAt,
                     allowComment: res.data.allowComment,
                     isComment: res.data.comments,
                     slug:res.data.slug,
                   })
                 })
                 .catch(err=>{
                   console.log('errror:' + err.response)
                   //if no news is found //
                    if(err.response === undefined){
                      toast.error('This post might have been removed')
                      setTimeout(()=>{
                        window.location.href="/error/404";
                      }, 500)
                     
                    }else{
                      window.location.href="/error/500";

                    }
                 })

                 axios.get(`http://localhost:5000/comment/news/${this.props.match.params.slug}`)
                 .then(res=>{
                  // console.log(res.data)
                   this.setState({
                     newsComment: res.data.comments,
                     
                   })
                 })
                 .catch(err=>{console.log(err.response)})

                   //Similar news//
           axios.get(`http://localhost:5000/similar/news/${this.props.match.params.slug}`)
            .then(res=>{
            console.log(res.data)
            this.setState({similar: res.data})
           })
            .catch(err=>console.log(err.response));

            
                   //Recent news//
           axios.get(`http://localhost:5000/recent/news/${this.props.match.params.slug}`)
           .then(res=>{
           console.log(res.data)
           this.setState({recent: res.data})
          })
           .catch(err=>console.log(err.response));
            
        
       }
         


       loadData(){
     
        axios.get(`http://localhost:5000/showPost/${this.props.match.params.slug}`)
        .then(res=>{
          console.log(res.data)
          this.setState({
            title: res.data.title,
            detail: res.data.detail,
            image: res.data.image,
            createdAt: res.data.createdAt,
            allowComment: res.data.allowComment,
            isComment: res.data.comments,
          })
        })
        .catch(err=>{
          console.log('errror:' + err.response)
          //if no news is found //
           if(err.response === undefined){
             toast.error('This post might have been removed')
             setTimeout(()=>{
               window.location.href="/";
             }, 500)
            
           }
        })

        axios.get(`http://localhost:5000/comment/news/${this.props.match.params.slug}`)
        .then(res=>{
         // console.log(res.data)
          this.setState({
            newsComment: res.data.comments,
            
          })
        })
        .catch(err=>{console.log(err.response)})

           //Similar news//
           axios.get(`http://localhost:5000/similar/news/${this.props.match.params.slug}`)
            .then(res=>{
            console.log(res.data)
            this.setState({similar: res.data})
           })
            .catch(err=>console.log(err.response));

            
                   //Recent news//
           axios.get(`http://localhost:5000/recent/news/${this.props.match.params.slug}`)
           .then(res=>{
           console.log(res.data)
           this.setState({recent: res.data})
          })
           .catch(err=>console.log(err.response));
            
          
      }

       componentDidUpdate(prevProps){
         if(this.props.match.params.slug!==prevProps.match.params.slug){
          this.loadData();
         }
       }
      

    render(){
         document.title = `Surenews - ${this.state.title}`;
         let comments = Array.from(this.state.newsComment);
         let similarNews = Array.from(this.state.similar);
         let recentNews = Array.from(this.state.recent);
         let isComments = this.state.isComment.map(com=>com.commentBody);
         let images = Array.from(this.state.image);
         console.log(isComments)
        return(
            <div>

            <Header/>
            <Search/>
          <div className="container-fluid my-4">
              <div className="container show-page">
                <div className="row">
                    <div className="col-md-6">
                    <h5 className="my-2 show-title">{this.state.title}</h5>
                    <span className="">Posted on <span className="text-success">{dayjs(this.state.createdAt).format('DD/MM/YY')}</span></span>
                    {images.slice(0,1).map((image, index)=>{
                    return(
                        <div key={index}>
                        <img src={image} className="my-2 img-fluid" alt=""/>
                       </div>
                    )
                })}
                     <p className="" dangerouslySetInnerHTML={{__html:this.state.detail}}></p>

                     {images.slice(1,3).map((image, index)=>{
                    return(
                        <div key={index}>
                        <img src={image} className="my-2 img-fluid" alt=""/>
                       </div>
                    )
                })}
<div className="a2a_kit a2a_kit_size_32 a2a_default_style">
<Link className="shares text-success">Share</Link>

<Link className="a2a_button_facebook"></Link>
<Link className="a2a_button_linkedin"></Link>
<Link className="a2a_button_whatsapp"></Link>
<Link className="a2a_button_telegram"></Link>
<Link className="a2a_button_google_gmail"></Link>
<Link className="a2a_button_twitter"></Link>
<Link className="a2a_dd" to="https://www.addtoany.com/share"></Link>

</div>
<FacebookShareButton className="shares text-success">Share</FacebookShareButton>
<FacebookShareButton url={`https://surenews.herokuapp.com//news/${this.state.slug}`} quote={this.state.title}><FacebookIcon size={32} round={true}/></FacebookShareButton>
<TwitterShareButton url={`https://surenews.herokuapp.com/news/${this.state.slug}`} title={this.state.title} className="shareBtn"><TwitterIcon size={32} round={true}/></TwitterShareButton>
<LinkedinShareButton url={`https://surenews.herokuapp.com/news/${this.state.slug}`} title={this.state.title} description={this.state.detail.substring(0, 60)} source={'http://localhost:3000'} className="shareBtn"><LinkedinIcon size={32} round={true}/></LinkedinShareButton>
<WhatsappShareButton url={`https://surenews.herokuapp.com/news/${this.state.slug}`} title={this.state.title} className="shareBtn"><WhatsappIcon size={32} round={true}/></WhatsappShareButton>
<TelegramShareButton url={`https://surenews.herokuapp.com/news/${this.state.slug}`} title={this.state.title} className="shareBtn"><TelegramIcon size={32} round={true}/></TelegramShareButton>
<EmailShareButton url={`https://surenews.herokuapp.com/news/${this.state.slug}`} subject={this.state.title} body={this.state.detail.substring(0, 60)} className="shareBtn"><EmailIcon size={32} round={true}/></EmailShareButton>

                      {this.state.allowComment? 
                    <div className="mt-4">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="reply">Leave a Comment</label>
                            <textarea className="form-control" rows="5" placeholder="Your Comment here..."
                             value={this.state.commentBody} onChange={this.changeComment} />
                            </div>
                            <div className="form-group mt-3 ">
                                <button className="btn-success comment-btn">Submit Comment</button>
                            </div>
                        </form>
                    </div>
                    :<h5 className="text-center text-success mt-3">Comment closed</h5>}
                    <div className="comment-body my-4">
                        <h5 className="text-center my-3">{isComments.length > 0?'All Comments' : 'No comment yet'}</h5>
                        {comments.map((comment, index)=>{
                          return(
                        <div className="card card-body mb-2 comment-card" key={index}>
                        <span className="text-success"> {dayjs(comment.commentDate).fromNow()}</span>
                            <p className="card-text">{comment.commentBody} </p>
                            
                        </div>
                          )
                        })}
                    </div>
                    </div>
                    <div className="col-md-6">
                      
                    <h5 className="text-center mt-4">{this.state.similar.length > 0 ? 'Similar News' : 'No Similar News'}</h5>
                    <div className="card main-card">
                      {similarNews.map((similar, index)=>{
                        return(
                  <div className="all-post" key={index}>
                         <Link className="" to={`/news/${similar.slug}`} > 
                      <h5 className="card-title show-title">{similar.title.substring(0, 60)}...</h5>
                      </Link>
                      <div className="d-flex justify-content-between">
                       <Link className="text-success" to={`/news/${similar.slug}`}>{dayjs(similar.createdAt).fromNow()}</Link>
                       <Link className="text-success" to={`/news/${similar.slug}`}>Readmore</Link>

                    </div>
                  </div>
                     )
                  })}
                 
                  </div>
                    
                    <h5 className="text-center mt-4">Recent News</h5>
                    <div className="card main-card ">
                    {recentNews.map((recent, index)=>{
                        return(
                  <div className="all-post" key={index}>
                         <Link className="" to={`/news/${recent.slug}`} > 
                      <h5 className="card-title show-title">{recent.title.substring(0, 60)}...</h5>
                      </Link>
                      <div className="d-flex justify-content-between">
                       <Link className="text-success" to={`/news/${recent.slug}`}>{dayjs(recent.createdAt).fromNow()}</Link>
                       <Link className="text-success" to={`/news/${recent.slug}`}>Readmore</Link>

                    </div>
                  </div>
                     )
                  })}
                  
                 
                  </div>
                    </div>
                </div>
              </div>
             
          </div>
          <Footer/>
          </div>
        )
    }
}

export default Show;