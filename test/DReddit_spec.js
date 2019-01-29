const DReddit = embark.require('Embark/contracts/DReddit');

const ipfsHash = 'Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z';

config({
  contracts: {
    DReddit: {}
  }
})

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
});
