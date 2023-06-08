/* eslint-disable no-undef */
const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DecentralBank', ([owner, customer]) => {
    let tether, rwd, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        // load contract
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        // tramsfer all tokens to decentralbank
        await rwd.transfer(decentralBank.address, tokens('1000000'))

        // transfer 100 mock tethers to customer
        await tether.transfer(customer, tokens('100'), { from: owner })
    })

    // kode testing disini
    describe('Mock Tether Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await tether.name()
            assert.equal(name, 'Mock Tether Token')
        })
    })

    describe('Reward Token Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('contract has tokens', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })

        describe('Yield Farming', async () => {
            it('rewards tokens for staking', async () => {
                let result

                //Check investor balance
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('100'), 'customer mock wallet balances before staking')

                //check staking for customer
                await tether.approve(decentralBank.address, tokens('100'), { from: customer })
                await decentralBank.depositTokens(tokens('100'), { from: customer })

                // check updated balance of customer
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('0'), 'customer mock wallet balances after staking 100 tokens')

                // check updated balance of decentral bank
                result = await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('100'), 'decentral bank mock wallet balances after staking for the customer')

                //Is Staking Update
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'true', 'custome staking status after staking')

                //Issue Tokens
                await decentralBank.issueTokens({ from: owner })

                //Ensure only the owner can issue tokens
                await decentralBank.issueTokens({ from: customer }).should.be.rejected

                // unstake tokens
                await decentralBank.unstakeTokens({ from: customer })

                // check unstaking balance
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), tokens('100'), 'customer mock wallet balances after unstaking tokens')

                // check updated balance of decentral bank
                result = await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('0'), 'decentral bank mock wallet balances after staking for the customer')

                //Is Staking Balance
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'false', 'custome staking status is no longer staking')
            })
        })
    })
})