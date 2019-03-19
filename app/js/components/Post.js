import React, { Component } from 'react';
import EmbarkJS from 'Embark/EmbarkJS';
import DReddit from 'Embark/contracts/DReddit';
import dateformat from 'dateformat';

const BALLOT = {
  NONE: 0,
  UPVOTE: 1,
  DOWNVOTE: 2
};

export class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      content: '',
      upvotes: this.props.upvotes,
      downvotes: this.props.downvotes,
      canVote: true,
      submitting: false
    };
  }

  async componentDidMount() {
    const ipfsHash = web3.utils.toAscii(this.props.description);
    const data = await EmbarkJS.Storage.get(ipfsHash);
    const { topic, content } = JSON.parse(data);
    const canVote = await DReddit.methods.canVote(this.props.id).call();

    this.setState({ topic, content, canVote });
  }

  async vote(ballot) {
    const accounts = await web3.eth.getAccounts();
    const vote = DReddit.methods.vote(this.props.id, ballot);
    const estimate = await vote.estimateGas();

    this.setState({ submitting: true });

    await vote.send({from: accounts[0], gas: estimate + 1000});

    this.setState({
      upvotes: this.state.upvotes + (ballot == BALLOT.UPVOTE ? 1 : 0),
      downvotes: this.state.downvotes + (ballot == BALLOT.DOWNVOTE ? 1 : 0),
      canVote: false,
      submitting: false
    });
  }

  render() {
    const formattedDate = dateformat(
      new Date(this.props.creationDate * 1000),
      'yyyy-mm-dd HH:MM:ss'
    );
    const disabled = this.state.submitting || !this.state.canVote;
    return (
      <React.Fragment>
        <hr />
        <h3>{this.state.topic}</h3>
        <p>{this.state.content}</p>
        <p><small><i>created at {formattedDate} by {this.props.owner}</i></small></p>
        {this.state.upvotes} <button onClick={e => this.vote(BALLOT.UPVOTE)} disabled={disabled}>Upvote</button>
        &nbsp;{this.state.downvotes} <button onClick={e => this.vote(BALLOT.DOWNVOTE)} disabled={disabled}>Downvote</button>
      </React.Fragment>
    )
  }
}