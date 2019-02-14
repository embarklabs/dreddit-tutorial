import React, { Component } from 'react';
import EmbarkJS from 'Embark/EmbarkJS';
import DReddit from 'Embark/contracts/Dreddit';
import { Post } from './Post';

export class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    const totalPosts = await DReddit.methods.numPosts().call();

    let list = [];

    for (let i = 0; i < totalPosts; i++) {
      const post = DReddit.methods.posts(i).call();
      list.push(post);
    }

    list = await Promise.all(list);
    list = list.map((post, index) => {
      post.id = index;
      return post;
    });

    this.setState({ posts: list });
  }

  render() {
    return (<React.Fragment>
      {this.state.posts.map(post => {
        return (<Post 
          key={post.id}
          description={post.description}
          creationDate={post.creationDate}
          owner={post.owner}
          />)
      })}
      </React.Fragment>
    )
  }
}
