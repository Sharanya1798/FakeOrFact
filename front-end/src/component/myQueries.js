import React from 'react'
import jwt_decode from "jwt-decode";
import Navbar from './Navbar';
import ScrollToTop from "./ScrollToTop";

class myQueries extends React.Component {
  state = {
    posts: []
  };
  componentDidMount = () => {
    this.getPosts();
  };

  getPosts = () => {
    const decoded = jwt_decode(localStorage.getItem('my_token'));
    const user_ID = decoded.id; 
    const data = { "user_ID": user_ID }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/myDiscussions', requestOptions)
      .then(response => {
        response.json()
                .then(responseJson => {
                const queries  = responseJson.myPosts;
                this.setState({ posts: queries })
                console.log("Data has been received!")
                })
      })
      .catch(() => {
        alert("Error retrieving data !!");
      })
  }

  displayPosts = (posts) => {
    if(!posts.length) return null;
    
    return posts.map((post, index) => (
          <div key={index}>
          <div className="query-form">
          <li class="discussincard box-border">
              <h4 class="bigdarkgrayfont ">
                  <a class="hola" href="/postComments">{post.queryName}</a>
              </h4>
              <p class="mediumdarkgray">{post.queryDec}</p>
              <div class="discussionforum_color talentforum_username ">Contact:  {post.email}</div>
          </li>
          </div>
          </div>
    ));
  };

  render() {
    const posts = this.state.posts;
    if(!posts.length) return (<> <Navbar/><div><h2 className="text-center2">No posts yet!! Start by adding a new post</h2></div> </>);

    return(
      <>      <Navbar/>

        <div>
          <div className="container">
              <ul class="list-unstyled">
                    {this.displayPosts(posts)}
              </ul>
              </div>
        </div>
        <ScrollToTop/>
        </>
    );
  }
}
export default myQueries;