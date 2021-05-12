import React, { Component } from 'react';
import cogoToast from 'cogo-toast';

export default class AddComment extends Component {

  constructor(props){
    super(props);
   
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        content: '',
        upvotes: 0,
        downvotes: 0
    }
  }
  
  onChangeContent(e){
      this.setState({
          content : e.target.value
      });
  }

   onSubmit(e){
     e.preventDefault();
     const comment = {
         content : this.state.content,
     }
      const jwt = localStorage.getItem("my_token");
      const post = JSON.parse(localStorage.getItem("currentPost"));
      const post_ID = post.post_ID;
      if(jwt === null){
        console.log('not logged in');
        const { hide } = cogoToast.warn('Click to login & comment', {
          onClick: () => {
            hide();
            window.location = '/login';
          },
        });
      }
      else {
        const data = {comment,post_ID}
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "auth-header": jwt
             },
            body: JSON.stringify(data)
          };
          fetch('http://localhost:3000/api/comments/add', requestOptions)
            .then(response => {
                response.json()
                .then(responseJson => {
                    const json = { type: 'comment' };
                    json.data = responseJson;
                    console.log(json);
                    this.props.actions.send(JSON.stringify(json));
                    this.setState({content : ''})
                })
            })
            .catch(err => cogoToast.error('Failed adding comment, please try again!', { hideAfter : 5 })
        .then(() => this.setState({content : ''})));
     
    
      }
    }
   
  render() {
    return (
      <div>
      <h5>Add your opinion</h5>
      <form onSubmit={this.onSubmit} >
          <div className="form-group">
            <textarea rows="3"
                required
                className="form-control"
                value={this.state.content}
                placeholder="Type a comment"
                onChange={this.onChangeContent}>
            </textarea>
          </div>
          <div className="form-group" align="right">
            <input type="submit"
                className="btn btn-dark"
                value="Post">
            </input>
          </div>
      </form>
      </div>
    );
  }
}