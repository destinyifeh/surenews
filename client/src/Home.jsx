import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//import topImage from './images/ad1.jpg';
import Footer from './Footer';
import Header from './Header';
import Search from './News/Search';
import AllPosts from './AllPosts';
dayjs.extend(relativeTime);

class Home extends Component {
      constructor(props){
      super(props)
        
       this.state={
             recent:[],
             trending:[],
             news:[],
             interests:[],
             breakings:[],
             subEmail: '',
       }
         this.handleEmail = this.handleEmail.bind(this);
         this.onSubmitSub = this.onSubmitSub.bind(this)
      }

      
        handleEmail(e){
            this.setState({subEmail: e.target.value})
        }


         onSubmitSub(e){
             e.preventDefault();

               let {subEmail} = this.state;
               let subscription={
                   subEmail: subEmail,
               }
             console.log(subscription)
             if(!subEmail){
                 let err = 'Cant submit empty input';
                 console.log(err)
                 toast.error('Cant submit empty input')
                 return false;
             }else{
                 axios.post('https://surenews.herokuapp.com/subscription/email', subscription)
                 .then(res=>{
                     console.log(res.data)
                     this.setState({subEmail: ''})
                     let success = 'Subscribed';
                     console.log(success)
                     toast.success('Subscribed successfully')
                 })
                 .catch(err=>{
                     console.log(err.response)
                     toast.error('An error occur, try again')
                 })
             }
         }

             componentDidMount(){
          
                   //Recent news//
              axios.get('https://surenews.herokuapp.com/recent/news')
             .then(res=>{
                   console.log(res.data)
                   this.setState({recent: res.data})
                  })
                .catch(err=>console.log(err.response));

                
                   //Trending news//
              axios.get('https://surenews.herokuapp.com/trending/news')
              .then(res=>{
                    console.log(res.data)
                    this.setState({trending: res.data})
                   })
                 .catch(err=>console.log(err.response));

                     
                   //Top news//
              axios.get('https://surenews.herokuapp.com/news')
              .then(res=>{
                    console.log(res.data)
                    this.setState({news: res.data})
                   })
                 .catch(err=>console.log(err.response));

                      
                   //interest news//
              axios.get('https://surenews.herokuapp.com/interests/news')
              .then(res=>{
                    console.log(res.data)
                    this.setState({interests: res.data})
                   })
                 .catch(err=>console.log(err.response));

                        
                   //Breaking news//
              axios.get('https://surenews.herokuapp.com/breakings/news')
              .then(res=>{
                    console.log(res.data)
                    this.setState({breakings: res.data})
                   })
                 .catch(err=>console.log(err.response));


                

                 
            }

    render(){
                 document.title = 'Welcome to Surenews';
               let recents = Array.from(this.state.recent);
               let trendings = Array.from(this.state.trending);
               //let news = Array.from(this.state.news);
               let interests = Array.from(this.state.interests);
               let breaking = Array.from(this.state.breakings);

              /* {news.map((theNews, index)=>{
                return(
            <div className="card-body" key={index}>
               <Link className="" to={`/news/${theNews.slug}`}> 
            <h5 className="card-title">{theNews.title}</h5>
            </Link>
        </div>
        )
        })}*/


        return(
            <div className="Container-fluid Home">
                 <Header/>
                <h4 className="text-dark text-center my-4">Number One News Site</h4>
                 <div className="headline bg-success">Breaking...</div>
                <div className="tcontainer mt-3">
        <div className="ticker-wrap">
            <div className="ticker-move">
                 {breaking.map((breakNews, index)=>{
                     return (
                <div className="ticker-item" key={index}>{breakNews.title}<span className="dot">.</span></div>
                 )
                 })}
              
           </div>
        </div>
    </div>
   
      <Search/>
        
    <div className="container article my-4">
          <div className="row">
              <div className="col-sm-6 main-article  ">
                  <h5 className="text-center my-3">Top News </h5>
                 <AllPosts/>
                   
                   
                
                    
              </div>
              
              <div className="col-sm-3 center-article ">
                  <h5 className="text-center my-3">Trending News</h5>
                  
                  <div className="card main-card">
                  {trendings.map((trend, index)=>{
                          return(
                      <div className="all-post" key={index}>
                         <Link className="" to={`/news/${trend.slug}`}> 
                      <h5 className="card-title show-title">{trend.title.substring(0, 60)}...</h5>
                      </Link>
                      <div className="d-flex justify-content-between">
                       <Link className=" text-success" to={`/news/${trend.slug}`}>{dayjs(trend.createdAt).fromNow()}</Link>
                       <Link className="text-success" to={`/news/${trend.slug}`}>Readmore</Link>

                    </div>
                  </div>
                  )
                  })}
                  
                  
                  </div>
                  
              </div>
              <div className="col-sm-3 side-article">
                  <h5 className="text-center my-3">Recent News</h5>
                  <div className="card main-card">
                      {recents.map((recent, index)=>{
                          return(
                      <div className="all-post" key={index}>
                         <Link className="" to={`/news/${recent.slug}`}> 
                      <h5 className="card-title show-title">{recent.title.substring(0, 60)}...</h5>
                      </Link>
                      <div className="d-flex justify-content-between">
                       <Link className="text-success "  to={`/news/${recent.slug}`}>{dayjs(recent.createdAt).fromNow()}</Link>
                       <Link className="text-success" to={`/news/${recent.slug}`}>Readmore</Link>

                    </div>
                  </div>
                  )
                  })}
                 
                 
                  </div>
              </div>
          </div>
          <div className="row my-5 border p-3">
              <div className="col-md-4 text-center">
              <h5 className=" text-success article-header">Subscribe</h5>
              <p className="subscribe-p">Join over a thousand subscribers to get our latest gist</p>
              <form className="contact-form" onSubmit={this.onSubmitSub}>
                   
                    <div className="form-group">
                        <input type="email" className="form-control" value={this.state.subEmail} onChange={this.handleEmail} placeholder="Enter your email"/>
                    </div>
                    <div className="form-group mt-3">
                     <button className="btn btn-success my-3">Subscribe</button> 
                    </div>
                </form>
              </div>
              <div className="col-md-8 text-center ">
                  <h5 className=" my-3">Articles That Might Interest You</h5>
                  <div className="article-body">
                  <div className="card main-card">
                  {interests.map((interest, index)=>{
                          return(
                      <div className="all-post" key={index}>
                         <Link className="" to={`/news/${interest.slug}`}> 
                      <h5 className="card-title show-title">{interest.title.substring(0, 60)}...</h5>
                      </Link>
                      <div className="d-flex justify-content-between">
                       <Link className="text-success" to={`/news/${interest.slug}`}>{dayjs(interest.createdAt).fromNow()}</Link>
                       <Link className="text-success" to={`/news/${interest.slug}`}>Readmore</Link>

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

export default Home;