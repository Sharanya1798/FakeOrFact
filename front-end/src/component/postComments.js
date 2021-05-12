import React, { Component } from 'react';
import ListComments from './listComments';
import AddComment from './addComment';
import Navbar from './Navbar';

export default class Home extends Component {

  constructor(props){
    super(props);
    const sock = new WebSocket('ws://localhost:3000/api/comment');
    sock.onopen = function() {
        console.log('open');
    };

    const self = this;
    sock.onmessage = function(e) {
          const message = JSON.parse(e.data);
          const dataToSend = JSON.stringify(message);
          self.setState({ comment: dataToSend });
    };

    this.state = {
      actions : sock,
      comment : {},
    }
  }

  render() {
    const post = JSON.parse(localStorage.getItem("currentPost"));
    return (
      <>
      <Navbar/>

          <div className="query-form">
              <h5 class="bigdarkgrayfont ">
                  <a class="bigdarkgrayfont discussionforum_font Forum_Ques" >{post.post_Name}</a>
              </h5>
              <p class="mediumdarkgray">{post.post_desc}</p>
              <div class="discussionforum_color talentforum_username ">Contact:  {post.email}</div>
          </div>

      <div className="container">
          <div className="query-form">
        <br/>
        < ListComments { ... this.state }/>
        <br/>
        < AddComment { ... this.state  }/>
        </div>
      </div>
      </>
    );
  }
}