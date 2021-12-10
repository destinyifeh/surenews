import {Link} from 'react-router-dom';
function ServerError(){
     

        return(

            <div className="container my-5">
  <h1 className="">500 Server Error</h1>
    <h5 className="">Oops! Something Went Wrong</h5>
    <p>Try to refresh this page or feel free to contact us if the problem persists.</p>
    <Link to="/"><h5 className="">Back To Home</h5></Link>
              
          </div>
        )
    
}

export default ServerError;