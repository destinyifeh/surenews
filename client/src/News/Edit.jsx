import {Component} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5/packages/ckeditor5-build-classic';
import Header2 from '../Header2';

class Edit extends Component {
           
    constructor(props){
        super(props)
        this.state={
            title: '',
            detail: '',
            allowComment: '',
            image:[],
            news:[],
        }

         
        this.changeTitle = this.changeTitle.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.changeDetail = this.changeDetail.bind(this);
        this.allowComment = this.allowComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
       


               allowComment(e){
               
               this.setState({
                   allowComment: !this.state.allowComment
               })
               console.log(this.state.allowComment)
           }

               changeTitle(e){
               this.setState({
                   title: e.target.value
               })
           }
           changeDetail=(event, editor)=>{
               let data = editor.getData()
               this.setState({
                detail: data
            })
               console.log(data)
           }

        changeImage(e){
            if(this.maxSelectFile(e) && this.checkFileSize(e) && this.checkMimeType(e)){
            this.setState({
                image: e.target.files
            })
        }
        }


        
//upload image functions//

maxSelectFile=(e)=>{
    let files = e.target.files // create file object
        if (files.length > 3) { 
           const msg = 'Only 3 images can be uploaded at a time'
           toast.error('Only 3 images can be uploaded at a time')
           e.target.value = null // discard selected file
           console.log(msg)
          return false;
 
      }
    return true;
 
 }


 checkMimeType=(e)=>{
    //getting file object
    let files = e.target.files 
    //define message container
    let err = ''
    // list allow mime type
   const types = ['image/png', 'image/jpg', 'image/jpeg' ]
    // loop access array
    for(var i = 0; i<files.length; i++) {
     // compare file type find doesn't matach
     //eslint-disable-next-line
         if (types.every(type => files[i].type !== type)) {
         // create error message and assign to container   
         err += files[i].type+' is not a supported format\n';
         toast.error( files[i].type+' is not a supported format\n')
       }
     };
  
   if (err !== '') { // if message not same old that mean has error 
        e.target.value = null // discard selected file
        console.log(err)
         return false; 
    }
   return true;
  
  }

  checkFileSize=(e)=>{
    let files = e.target.files
    let size = 1000000  //1mb 
    let err = ""; 
    for(var i = 0; i<files.length; i++) {
    if (files[i].size > size) {
     err += files[i].type+'is too large, please pick a smaller file\n';
     toast.error(files[i].type+'is too large, please pick a smaller file\n')
   }
 };
 if (err !== '') {
    e.target.value = null
    console.log(err)
    return false
}

return true;

}






    componentDidMount(){
        axios.get(`/editNews/${this.props.match.params.slug}`)
        .then(res=>{
          console.log(res.data)
          this.setState({
            title: res.data.title,
            detail: res.data.detail,
            image: res.data.image,
           allowComment: res.data.allowComment,
          })
        })
        .catch(err=>console.log(err.response));

        axios.get('/news')
        .then(res=>{
            console.log(res.data)
            this.setState({news: res.data})
        })
        .catch(err=>console.log(err.response));

      
    }

     onSubmit(e){
         e.preventDefault();
         
         let data = new FormData();

          
          const {image, title, detail, allowComment} = this.state;
       
          for(let i=0; i < image.length; i++){
             data.append('image', image[i])
             console.log(image[i])
          }
        
          data.append('title', title)
          data.append('detail', detail)
          data.append('allowComment', allowComment)
          
        
           let sendUpdateRequest = async ()=>{
           try{
          let updateNews = await axios.put(`/updateNews/${this.props.match.params.slug}`, data)
          console.log(updateNews.data)
            toast.success('News updated')
            
            setTimeout(()=>{
                window.location.href='/admin/dashboard';
            }, 200)
                
            
           }
           catch(err){
               console.log(err.response)
               toast.error('An error occur while trying to update news');
               this.setState({
                title: '',
                detail: '',
                image: '',
               })
           }
        }
        sendUpdateRequest();
       
     }
    
     

    render(){
        return(

            <div>
                <Header2/>
                 <div className="container mt-4 edit-form">
                 <form className="post-form" onSubmit={this.onSubmit}>
                 <div className="form-group">
                     <label className="p-2">News Title {this.state.title}</label>
                     <input className="form-control" type="text" value={this.state.title} onChange={this.changeTitle}/>
                 </div>
                 <div className="form-group mt-3">
                    <label>Upload Image</label>
                    <input type="file" className="form-control" defaultValue={this.state.image} onChange={this.changeImage} multiple />
                     </div>
                     <div className="form-check form-switch mt-3">
                         
                        <input className="form-check-input" type="checkbox" id="allowComment" onChange={this.allowComment} checked={this.state.allowComment} />
                        <label className="form-check-label" htmlFor="allowComment">{this.state.allowComment ? 'Comment is on' : 'Comment is off' }</label>
                         </div>
                 <div className="form-group">
                     <label className="p-2">News Detail</label>
                     <CKEditor editor={ClassicEditor} data={this.state.detail}   onChange={this.changeDetail}/>
                 </div>
                 <div className="form-group mt-3">
                     <button className="btn btn-dark p-2">Update News</button>
                 </div>
             </form>
             </div>
            </div>
        )
    }
}

export default Edit;