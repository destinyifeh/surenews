import { Component } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

class Search extends Component {
                    constructor(){
                        super()

                        this.state={
                            searches:[],
                            news:[],
                            query:'',
                            searchFound: false,
                            searchNotFound: false,
                            loading: false,
                        }

                        this.changeQuery = this.changeQuery.bind(this);
                        this.onSearch = this.onSearch.bind(this);

                    }



                    changeQuery(e){
                        this.setState({query: e.target.value})
                        let query = e.target.value;
                        if(query === ''){
                            this.setState({searchNotFound: false, searchFound: false, searches: false})
                        }
                    }


            componentDidMount(){
                axios.get('http://localhost:5000/paginated/news')
                .then(res=>{
                    console.log(res.data)
                    this.setState({news: res.data})
                })
                .catch(err=>console.log(err.response))
            }


             onSearch(e){
                 e.preventDefault();
                  let {query, news} = this.state;

                  let checkTitle = news.filter(search=>search.title.toLowerCase().includes(query) || search.title.toUpperCase().includes(query.toUpperCase()));

                   if(checkTitle.length > 0){
                       console.log(checkTitle)
                       let success = 'News exist';
                       console.log(success)
                       

                    this.setState({
                        searches: checkTitle, 
                       // query: ''  ,
                       searchNotFound: false,
                       })
                    

                      setTimeout(()=>{
                        this.setState({ searchFound: true, })
                        toast.success(`Search results for ${query} found`)

                   }, 5000)


                   this.setState({
                   
                    loading: true,
                    
                    })
                    
                     
                     setTimeout(()=>{
                           this.setState({loading: false})
                      }, 5000)

                  
                   }else{
                    let info = 'News does not exist';
                    console.log(info)
                    this.setState({ loading: true, searchFound: false, searches: ''})
                     
                    setTimeout(()=>{
                        this.setState({searchNotFound: true})
                        toast.info(`Search results for ${query} not found`)

                   }, 5000)

                   
                   setTimeout(()=>{
                    this.setState({loading: false})
                 }, 5000)
                   
               
                    return false;
                   }

                 
             }
             
           
       

    render(){
              let searches = Array.from(this.state.searches)
              let {searchFound, searchNotFound, query} = this.state;
        return(
            <div>
         <form className="search" onSubmit={this.onSearch}>
       <div className="input-group my-4 ">
           <input className="form-control" type="search"  value={this.state.query} onChange={this.changeQuery} placeholder="To search, type and hit the enter key..."/>
           
         </div>
         </form> 
           
         <h5 className="text-center">{this.state.loading ? <p className="loading text-success mt-3"> Loading search result...</p> : ''}</h5>
         <h5 className="text-center">{searchFound ? `Search results for ${query} found`: ''}</h5>
         <h5 className="text-center">{searchNotFound ? `Search results for ${query} not found`: ''}</h5>
         {this.state.loading? '' :
         <div className="col-sm-6 mx-auto main-card">
           {searches.map((search, index)=>{
               return(
                   <div className="all-post" key={index}>
               <Link className="text-center" to={`/news/${search.slug}`} ><h5 className="card-title">{search.title.substring(0, 60)}...</h5></Link>
               <div className="d-flex justify-content-between">
                       <Link className="text-success" to={`/news/${search.slug}`}>{dayjs(search.createdAt).fromNow()}</Link>
                       <Link className="text-success" to={`/news/${search.slug}`}>Readmore</Link>

                    </div>
            
             </div>
               )
         
           })}
        
           </div>
          }
         </div>
        )
    }
}


export default Search;