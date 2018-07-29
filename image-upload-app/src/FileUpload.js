import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'

export default class FileUpload extends Component {

    constructor(props) {
      super(props);
      this.state = {
        uploadStatus: false,
        imageURL: ''
      }
      this.handleUploadImage = this.handleUploadImage.bind(this);
    }
    
    onDrop(acceptedFiles, rejectedFiles) {
      // do stuff with files...
      this.setState({
        acceptedFiles, rejectedFiles
      });
    }
    
    handleUploadImage(event) {
      event.preventDefault();
      console.log("submit: ", this.fileName.value);
  
      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      // data.append('filename', this.fileName.value);

      for (var pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
        console.log(pair[1]); 
      }
  
      fetch('http://localhost:8000/upload-s3', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          console.log("response: ", body);
          console.log("msg: ", body.message);
          this.setState({ imageURL: `${body.data.location}` });
        });
      });

      // axios.post('http://localhost:8000/upload', data)
      //   .then(function (response) {
      //     console.log("response: ", response.data);
      //     // response.json().then((body) => {
      //     //   this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      //     // });
      //     this.setState({ imageURL: `http://localhost:8000/${response.data.file}`, uploadStatus: true });
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    }
   
    render() {
        return(
          <div className="container">
              <div className="dropzone">
                <Dropzone onDrop={this.onDrop.bind(this)}>
                  <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
              </div>

              <form onSubmit={this.handleUploadImage}>
                <div className="form-group">
                    <input className="form-control"  ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
        
                <div className="form-group">
                    <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
                </div>
        
                <button className="btn btn-success" type>Upload</button>
                <img src="https://ideo-images.s3.amazonaws.com/shanka.jpg" alt="img" />
              </form>
          </div>
        )
    }
}