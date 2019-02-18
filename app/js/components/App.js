import React, { Component } from 'react';
import { CreatePost } from './CreatePost';
import { List } from './List';
import DReddit from 'Embark/contracts/Dreddit';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  async loadPosts() {
    const totalPosts = await DReddit.methods.numPosts().call();

    let list = [];

    for (let i = 0; i < totalPosts; i++) {
      const post = DReddit.methods.posts(i).call();
      list.push(post);
    }

    list = await Promise.all(list);
    list = list.map((post, index) => {
      post.id = index;
      post.upvotes = parseInt(post.upvotes, 10);
      post.downvotes = parseInt(post.downvotes, 10);
      return post;
    });

    this.setState({ posts: list });
  }

  render() {
    return (
      <React.Fragment>
        <h1>DReddit</h1>
        <CreatePost afterPostHandler={this.loadPosts.bind(this)}/>
        <List posts={this.state.posts}/>
      </React.Fragment>
    )
  }
}
