import React, { Component } from 'react';
import { Post } from './Post';

export class List extends Component {

  render() {
    return (<React.Fragment>
      {this.props.posts.map(post => {
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
