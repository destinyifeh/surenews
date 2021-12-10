import {Component} from 'react';
import {Link} from 'react-router-dom';


class Header extends Component {
                   constructor(){
                     super()
                     this.state={
                         isTop: false,
                         isToday: false,
                         isTrend: false,
                     }
                     this.handleTop = this.handleTop.bind(this);
                     this.handleToday = this.handleToday.bind(this);
                     this.handleTrend = this.handleTrend.bind(this);
                     this.handleHome = this.handleHome.bind(this);

                   }
         
         handleTop=()=>{
            this.setState({isTop:true, isToday: false, isTrend: false});

         };

          
         handleToday=()=>{
            this.setState({isTop:false, isToday: true, isTrend: false});

         };

          
         handleTrend=()=>{
            this.setState({isTop:false, isToday: false, isTrend: true});

         };

           handleHome=()=>{
            this.setState({isTop:false, isToday: false, isTrend: false});

         };

    render(){

        return(
            <div className="container-fluid bg-success mb-3 header-nav ">
               <Link className="header text-center " to="/"><h5 className="head ">Surenews</h5></Link>
             <ul className="nav d-flex justify-content-center">
           <li className="nav-item">
           <Link className="nav-link" to="/" onClick={this.handleHome}>Home</Link>
           </li>
           <li className="nav-item">
           <Link className="nav-link" to="/" onClick={this.handleTop}>Latest</Link>
           </li>
           <li className="nav-item">
           <Link className="nav-link" to="/" onClick={this.handleTrend}>Trending</Link>
           </li>
           <li className="nav-item">
           <Link className="nav-link" to="/" onClick={this.handleToday}>Today</Link>
           </li>
             
             </ul>
             {this.state.isToday? <p className="text-center text-white homeInfo">See the recent news below</p>: ''}
              {this.state.isTop? <p className="text-center text-white homeInfo">See the top news below</p>: ''}
             {this.state.isTrend? <p className="text-center text-white homeInfo">See the trending news below</p>: ''}

            </div>
        )
    }
}

export default Header;