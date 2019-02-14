import React, { Component } from 'react';
import EmbarkJS from 'Embark/EmbarkJS';
import dateformat from 'dateformat';

export class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      content: ''
    };
  }

  async componentDidMount() {
    const ipfsHash = web3.utils.toAscii(this.props.description);
    const data = await EmbarkJS.Storage.get(ipfsHash);
    const { topic, content } = JSON.parse(data);

    this.setState({ topic, content });
  }

  render() {
    const formattedDate = dateformat(
      new Date(this.props.creationDate * 1000),
      'yyyy-mm-dd HH:MM:ss'
    );
    return (
      <React.Fragment>
        <hr />
        <h3>{this.state.topic}</h3>
        <p>{this.state.content}</p>
        <p><small><i>created at {formattedDate} by {this.props.owner}</i></small></p>
        <button>Upvote</button>
        <button>Downvote</button>
      </React.Fragment>
    )
  }
}
