import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';
import './Paginate.css';


class AdminPosts extends Component {

           constructor(){
               super()
               this.state={
                   page: 0,
                   limit: 3,
                   data:[],
               }
                this.handlePageClick = this.handlePageClick.bind(this);
           }
    

           componentDidMount(){

                             //Paginated news//
           axios.get('http://localhost:5000/paginated/news')
           .then(res=>{
           console.log(res.data)
           this.setState({data: res.data})
          })
           .catch(err=>console.log(err.response));

                        


           }
   
            handlePageClick(e){
                let pageSelected = e.selected;
                this.setState({page: pageSelected})
                window.scrollTo(0, 0)
            }


            updateAfterDelete=()=>{
                setTimeout(()=>{
    
                    axios.get('http://localhost:5000/paginated/news')
                    // .then(res=>console.log(res.data))
                    .then(res=>{
                        this.setState({
                           data: res.data
                        })
                   
                    })
                     .catch(err=>{
                         console.log(err.response)
                     })
                }, 500)
            }
    
          deleteNews(slug){
              console.log('delete')
              console.log(slug)
              let sendDeleteRequest = async () => {
               try{
                 let removeNews = await axios.delete('http://localhost:5000/delete/news/'+slug)
                  console.log(removeNews)
                  this.setState({data: this.state.data.filter(otherNews=>otherNews.slug !== slug)})
                  toast.success('News deleted')
                  
                }
               catch(err){
                   console.log(err.response)
                   toast.success('An error occur while trying to delete this news')
               }
              } 
              sendDeleteRequest();
              this.updateAfterDelete();
          }


           render(){

               let {page, limit} = this.state;
               let data = Array.from(this.state.data);
               let currentPage = page * limit;
               let pages = Math.ceil(data.length / limit);
               let mainPosts = data.slice(currentPage, currentPage + limit)
               .map((main, index)=>{
                return(
                    <div className="all-post" key={index}>
                      
                       
                    <Link className="" to={`/news/${main.slug}`}  ><h5 className="">{main.title}</h5></Link>
                    <div className="d-flex justify-content-between">
                       <Link className="delete bg-danger text-white" to="#" onClick={()=>{this.deleteNews(main.slug)}}>Delete</Link>
                       <Link className="edit" to={`/edit/news/${main.slug}`}>Edit</Link>

                    </div>
                     
                    
                    </div>
                 )
            })

             return(
                 <div>

                 {mainPosts}
                 <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={0}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
                 
                 </div>
             )
           }
}


export default AdminPosts;