import React, { Component } from 'react';
import { CreatePost } from './CreatePost';
import { List } from './List';

export class App extends Component {

  render() {
    return (
      <React.Fragment>
        <h1>DReddit</h1>
        <CreatePost />
        <List />
      </React.Fragment>
    )
  }
}
