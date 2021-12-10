import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './Paginate2.css';
dayjs.extend(relativeTime);


class AllPosts extends Component {

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
           axios.get('/paginated/news')
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

           render(){

               let {page, limit} = this.state;
               let data = Array.from(this.state.data);
               let currentPage = page * limit;
               let pages = Math.ceil(data.length / limit);
               let mainPosts = data.slice(currentPage, currentPage + limit)
               .map((main, index)=>{
               return(
                <div className="all-post" key={index}>
                <Link className="" to={`/news/${main.slug}`}> 
             <h5 className="card-title show-title">{main.title.substring(0, 60)}...</h5>
             </Link>
             <div className="d-flex justify-content-between">
                       <Link className=" text-success " to={`/news/${main.slug}`}>{dayjs(main.createdAt).fromNow()}</Link>
                       <Link className="text-success" to={`/news/${main.slug}`}>Readmore</Link>

                    </div>
              </div>
               )
            })

             return(
                 <div className="card card main-card ">
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


export default AllPosts;