import React from 'react'
import Navbar from "./Navbar";  
import jwt_decode from "jwt-decode";
import cogoToast from 'cogo-toast';

class allQueries extends React.Component {
  
  state = {
    posts: [],
    search: ''
  };
  componentDidMount = () => {
    this.getPosts();
  };

  getPosts = () => {
    const data = { "name": "FakeOrFact" }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/discussions', requestOptions)
      .then(response => {
        response.json()
                .then(responseJson => {
                const queries  = responseJson.queries;
                this.setState({ posts: queries })
                console.log("Data has been received!")
                })
      })
      .catch(() => {
        alert("Error retrieving data !!");
      })
  }

  gotoComments = ( post ) => { 
    const currentPostDetails = {post_ID: post._id, post_Name: post.queryName, post_desc: post.queryDec, email: post.email}
    localStorage.setItem("currentPost", JSON.stringify(currentPostDetails));
    window.location = "/postComments";
  }

  onDelete = (post) => {
    const data = { "post": post }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/deletePost', requestOptions)
    .then(response => {
      if(response.status == 200 ) {
        cogoToast.success('Post has been successfully deleted', { hideAfter : 5 })
        this.getPosts();
      }
    })
    .catch(() => {
      alert("Error deleting the post !!");
    })
  }

  displayPosts = (posts) => {
    if(!posts.length) return null;
    const token = localStorage.getItem('my_token')
    if(token)
    {
      const decoded = jwt_decode(token);
      if(decoded.role == "admin")
      {
        return posts.map((post, index) => (
          <div key={index}>
          <div className="query-form">
          <li class="discussincard box-border">
              <h4 class="bigdarkgrayfont ">
                  <a class="bigdarkgrayfont discussionforum_font Forum_Ques">{post.queryName}</a>
              </h4>
              <p class="mediumdarkgray">{post.queryDec}</p>
              <div class="discussionforum_color talentforum_username ">Contact:  {post.email}</div>
              <div className="row">
                <button onClick={e => this.gotoComments(post)}>View Discussion Thread</button>
                <button type="submit" onClick={ e => this.onDelete(post)} className="btn btn-primary btn-lg">Remove Post</button>
              </div>
          </li>
          </div>
          </div>
    ));
      }
    }
    
    return posts.map((post, index) => (
          <div key={index}>
          <div className="query-form">
          <li class="discussincard box-border">
              <h4 class="bigdarkgrayfont ">
                  <a class="bigdarkgrayfont discussionforum_font Forum_Ques">{post.queryName}</a>
              </h4>
              <p class="mediumdarkgray">{post.queryDec}</p>
              <div class="discussionforum_color talentforum_username ">Contact:  {post.email}</div>
              <button value={post._id} onClick={e => this.gotoComments(post)}>View Discussion Thread</button>
          </li>
          </div>
          </div>
    ));
  };

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)});
  } 

  render() {
      let filteredPosts = this.state.posts.filter(
        (post) => {
              return post.queryName.toLowerCase().indexOf(
                this.state.search.toLowerCase()) != -1 ;
        }
      );
    return(
      <>
      <Navbar/>
        <div>
          <div className="container">
            <br/>
              <input className="query-form" type="text" value = {this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search for a post" ></input>
              <ul class="list-unstyled">
                    {this.displayPosts(filteredPosts)}
              </ul>
          </div>
        </div>
        </>
    );
  }
}
export default allQueries;