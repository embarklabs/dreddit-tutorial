import React, { Component } from 'react';
import { CreatePost } from './CreatePost';

export class App extends Component {

  render() {
    return (
      <React.Fragment>
        <h1>DReddit</h1>
        <CreatePost />
      </React.Fragment>
    )
  }
}
