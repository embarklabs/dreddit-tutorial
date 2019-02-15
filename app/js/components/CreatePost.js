import React, { Component } from 'react';
import EmbarkJS from 'Embark/EmbarkJS';
import DReddit from 'Embark/contracts/Dreddit';

export class CreatePost extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      topic: '',
      content: '',
      loading: false
    };
  }

  handleChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  async createPost(event) {
    event.preventDefault();
    
    this.setState({
      loading: true
    });

    const ipfsHash = await EmbarkJS.Storage.saveText(JSON.stringify({
      topic: this.state.topic,
      content: this.state.content
    }));

    const accounts = await web3.eth.getAccounts();
    const createPost = await DReddit.methods.createPost(web3.utils.toHex(ipfsHash));
    const estimate = await createPost.estimateGas();
    
    await createPost.send({from: accounts[0], gas: estimate});
    await this.props.afterPostHandler();

    this.setState({
      topic: '',
      content: '',
      loading: false
    });
  }

  render() {
    return (
      <form onSubmit={e => this.createPost(e)}>
        <div>
          <label>Topic</label>
          <input 
            type="text" 
            name="topic" 
            value={this.state.topic} 
            onChange={e => this.handleChange('topic', e)}/>
        </div>
        <div>
          <textarea 
            name="content"
            value={this.state.content}
            onChange={e => this.handleChange('content', e)}></textarea>
        </div>
        <button type="submit">Post</button>
        {this.state.loading && 
          <p>Posting...</p>
        }
      </form>
    )
  }
}
