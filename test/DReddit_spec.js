const DReddit = embark.require('Embark/contracts/DReddit');

const ipfsHash = 'Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z';
let accounts = [];

config({
  contracts: {
    DReddit: {}
  }
}, (err, _accounts) => {
  accounts = _accounts;
});


contract('DReddit', () => {

  it('should work', () => {
    assert.ok(true);
  });

  it('should be able to create a post and receive it via contract event', async () => {
    let receipt = await DReddit.methods.createPost(web3.utils.fromAscii(ipfsHash)).send();
    const event = receipt.events.NewPost;
    postId = event.returnValues.postId;
    assert.equal(web3.utils.toAscii(event.returnValues.description), ipfsHash);
  });

  it ('post should have correct data', async () => {
    const post = await DReddit.methods.posts(postId).call();
    assert.equal(web3.utils.toAscii(post.description), ipfsHash);
    assert.equal(post.owner, accounts[0]);
  });

  it("should not be able to vote in an unexisting post", async () => {
    const userCanVote = await DReddit.methods.canVote("123").call();
    assert.equal(userCanVote, false);
  });

  it("should be able to vote in a post if account hasn't voted before", async () => {
    const userCanVote = await DReddit.methods.canVote(postId).call();
    assert.equal(userCanVote, true);
  });

  it('should be able to vote in a post', async () => {
    const receipt = await DReddit.methods.vote(postId, 1).send();
    const Vote = receipt.events.NewVote;
    assert.equal(Vote.returnValues.owner, accounts[0]);
  });

  it('shouldn\'t be able to vote twice', async () => {
    try {
      const receipt = await DReddit.methods.vote(postId, 1).send();
      assert.fail('should have reverted before');
    } catch (error){
      assert(error.message.search('revert') > -1, 'Revert should happen');
    }
  });
});
