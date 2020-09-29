const { expect } = require('chai')
const { ethers } = require('@nomiclabs/buidler')

describe('Vesting', function () {
    let owner, user, userAddr
    let bondToken, vestingA, vestingB, vestingC, vestingRouter
    const distributedAmount = ethers.BigNumber.from(800000).mul(ethers.BigNumber.from(10).pow(18))
    const amountVestingA = ethers.BigNumber.from(300000).mul(ethers.BigNumber.from(10).pow(18))
    const amountVestingB = ethers.BigNumber.from(400000).mul(ethers.BigNumber.from(10).pow(18))
    const amountVestingC = ethers.BigNumber.from(100000).mul(ethers.BigNumber.from(10).pow(18))
    let snapshotId

    const epoch1Start = Math.floor(Date.now() / 1000) + 1000

    beforeEach(async function () {
        snapshotId = await ethers.provider.send('evm_snapshot')
        const [creator, ownerSigner, userSigner] = await ethers.getSigners()
        owner = ownerSigner
        user = userSigner
        userAddr = await user.getAddress()

        const VestingRouter = await ethers.getContractFactory('VestingRouter', creator)
        const Vesting = await ethers.getContractFactory('Vesting', creator)
        const ERC20Mock = await ethers.getContractFactory('ERC20Mock')

        bondToken = await ERC20Mock.deploy()
        vestingA = await Vesting.deploy(userAddr, bondToken.address, epoch1Start, amountVestingA)
        vestingB = await Vesting.deploy(userAddr, bondToken.address, epoch1Start, amountVestingB)
        vestingC = await Vesting.deploy(userAddr, bondToken.address, epoch1Start, amountVestingC)

        vestingRouter = await VestingRouter.deploy([vestingA.address, vestingB.address, vestingC.address], [amountVestingA, amountVestingB, amountVestingC], bondToken.address)

    })

    afterEach(async function () {
        await ethers.provider.send('evm_revert', [snapshotId])
    })

    describe('Contract checks', function () {
        it('should be deployed', async function () {
            expect(vestingA.address).to.not.equal(0)
            expect(vestingB.address).to.not.equal(0)
            expect(vestingC.address).to.not.equal(0)
            expect(bondToken.address).to.not.equal(0)
            expect(vestingRouter.address).to.not.equal(0)
        })
        it('should have if no balance', async function () {
            expect(vestingRouter.allocateVestingFunds()).to.be.revertedWith('Not enough balance.')
        })
        it('should move balance to vesting contracts', async function () {
            await bondToken.mint(vestingRouter.address, distributedAmount)
            await vestingRouter.allocateVestingFunds()
            expect(await bondToken.balanceOf(vestingA.address)).to.be.equal(amountVestingA)
            expect(await bondToken.balanceOf(vestingB.address)).to.be.equal(amountVestingB)
            expect(await bondToken.balanceOf(vestingC.address)).to.be.equal(amountVestingC)
        })
    })
})
