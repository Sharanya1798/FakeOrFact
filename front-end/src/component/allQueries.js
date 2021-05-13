import React from 'react'
import Navbar from "./Navbar";          
import ScrollToTop from "./ScrollToTop";

class allQueries extends React.Component {
  
  state = {
    posts: []
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

  displayPosts = (posts) => {
    if(!posts.length) return null;
    
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
               {/* <button type="submit" onClick={ this.gotoComments(post) } className="btn btn-primary btn-lg">View Discussions</button> */}
          </li>
          </div>
          </div>
    ));
  };

  render() {
    const { is_visible } = this.state;
    return(
      <>
      <Navbar/>
        <div>
          <div className="container">
              <ul class="list-unstyled">
                    {this.displayPosts(this.state.posts)}
              </ul>
          </div>
        </div>
        <ScrollToTop/>
        </>
    );
  }
}
export default allQueries;