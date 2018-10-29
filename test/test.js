const Ships = artifacts.require('../contracts/Ships.sol');

const assertRevert = async (promise) => {
  try {
    await promise;
    assert.fail('Expected revert not received');
  } catch (error) {
    const revertFound = error.message.search('revert') >= 0;
    assert(revertFound, `Expected "revert", got ${error} instead`);
  }
}

const web3abi = require('web3-eth-abi');
const web3 = Ships.web3;

contract('Ships', function([owner, user, user2, user3]) {
  let ships;

  before('setting up for tests', async function() {
    ships = await Ships.new();
  });

  it('getting prefix parent', async function() {
    // galaxies
    assert.equal(await ships.getPrefix(0), 0);
    assert.equal(await ships.getPrefix(255), 255);
    // stars
    assert.equal(await ships.getPrefix(256), 0);
    assert.equal(await ships.getPrefix(65535), 255);
    // planets
    assert.equal(await ships.getPrefix(1245952), 768);
  });

  it('setting dns domain', async function() {
    assert.equal(await ships.dnsDomains(0), "urbit.org");
    assert.equal(await ships.dnsDomains(1), "urbit.org");
    assert.equal(await ships.dnsDomains(2), "urbit.org");
    // only owner can do this.
    await assertRevert(ships.setDnsDomains("new1", "new2", "new3", {from:user}));
    await ships.setDnsDomains("new1", "new2", "new3");
    assert.equal(await ships.dnsDomains(0), "new1");
    assert.equal(await ships.dnsDomains(1), "new2");
    assert.equal(await ships.dnsDomains(2), "new3");
  });
});
