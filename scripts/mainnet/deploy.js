const { ethers } = require('@nomiclabs/buidler');
const { default: axios } = require('axios');

const Erc20abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

async function main() {
    const Vesting = await ethers.getContractFactory('Vesting')

    const _xyzTokenAddress = '0x41e88dc0dfa5455e64327484f1862332413520da'
    const XYZToken = await ethers.getContractAt(Erc20abi, _xyzTokenAddress);

    const startTime = 1622419200

    const owners = [
        {
            "address": "0x14B8Cb752476af917ae831973318Ad1814b622e0",
            "amount": 1_000_000
        },
        {
            "address": "0x8841e5a990f242Fdfd24413969F214b28ccC6161",
            "amount": 1_000_000
        },
        {
            "address": "0x56B35462485c2BD90EEb2B4e289Ad02ac193116C",
            "amount": 1_000_000
        },
        {
            "address": "0xA4e7918fb5F4a8c12f9513b193bE1d764d5757Dc",
            "amount": 1_000_000
        },
        {
            "address": "0x930A7CD60A633128B7c5181307781e6d033BA51a",
            "amount": 1_000_000
        },
        {
            "address": "0xDff71A881a17737b6942FE1542F4b88128eA57D8",
            "amount": 800_000
        },
        {
            "address": "0xFFFFF6E70842330948Ca47254F2bE673B1cb0dB7",
            "amount": 800_000
        },
        {
            "address": "0xB84E634c4A8DD427Ba34286F76261d6EDc135F56",
            "amount": 800_000
        },
        {
            "address": "0x285b7EEa81a5B66B62e7276a24c1e0F83F7409c1",
            "amount": 800_000
        },
        {
            "address": "0xDF013f443c1759cA4763cf17D58D9F72aB07e558",
            "amount": 1_000_000
        },
        {
            "address": "0xB3fb3aC9D68b0170506859A2c9Ee13d023A3b873",
            "amount": 1_000_000
        },
        {
            "address": "0x05cD76Cd5e6bfF09fdD59D5edDB1347Ac3dB13CA",
            "amount": 1_000_000
        },
        {
            "address": "0x703E760f02cf4bf5c9a5220EE9bBb2e57f2B25A4",
            "amount": 1_000_000
        },
        {
            "address": "0x9657B94D5d0a7C58CD2c59Ac17969e754C29eC29",
            "amount": 1_000_000
        },
        {
            "address": "0xa7d7ac8fe7e8693b5599c69cc7d4f6226677845b",
            "amount": 1_000_000
        },
        {
            "address": "0xd6605b1B24b06e33cb499a2C7ac91846dac337ce",
            "amount": 800_000
        },
        {
            "address": "0x04c6717BaE11973547CfA3b59d74936b73f13b2f",
            "amount": 800_000
        },
        {
            "address": "0x8CB36d75060233653775466518fB349987976Bf1",
            "amount": 1_000_000
        },
        {
            "address": "0x35dd607bd036EBAaCB00A5Aa328b9b8A715ADe27",
            "amount": 800_000
        },
        {
            "address": "0x91a9B4DA163a1F248C92DBd262aD3e95e042C87E",
            "amount": 1_000_000
        },
        {
            "address": "0xfA006a18F847bf45f67BCe08e2312149B254B59E",
            "amount": 800_000
        },
        {
            "address": "0x3d51eF2d5eC9a9ac75f16442cADF75436BB38844",
            "amount": 800_000
        },
        {
            "address": "0x96b7e39d2fee469d26dc088783476818d2e7fbd6",
            "amount": 800_000
        },
        {
            "address": "0xdec57E877005902cbc2fd38E6c16da2d2A18bFAC",
            "amount": 800_000
        },
        {
            "address": "0x1ad30BD3bD656c6EcA6922773D6C77Acd577af47",
            "amount": 800_000
        },
        {
            "address": "0x88b503C81A4Fb9C9c5464dd3C6835fC34B2cc85d",
            "amount": 800_000
        },
        {
            "address": "0x8a33E42CEb277C4DA1dD9098f0EC7BDa83B1f04F",
            "amount": 800_000
        },
        {
            "address": "0xad2AC929Aff2879af565D20CD5dfAAff4EAdCB94",
            "amount": 800_000
        },
        {
            "address": "0x442DCCEe68425828C106A3662014B4F131e3BD9b",
            "amount": 400_000
        },
        {
            "address": "0x7796aD38e00E3717759Ee7071067351eDd684175",
            "amount": 400_000
        },
        {
            "address": "0xA73dB69EA64315c44C970245C1f30A7bc765A7D0",
            "amount": 800_000
        },
        {
            "address": "0xbD395d7cE71aa2747673288119cE54ed03fc90EF",
            "amount": 800_000
        },
        {
            "address": "0x4F979A1f5C4AD2B583244D33F310cF3Ea0d65164",
            "amount": 800_000
        },
        {
            "address": "0xC33a19c47D3b1C7359637f983E4cC136679E0e80",
            "amount": 800_000
        },
        {
            "address": "0xaBF107de3E01c7c257e64E0a18d60A733Aad395d",
            "amount": 800_000
        },
        {
            "address": "0x30214EBf59e4293a690ae3920c0Bf5382A7fa227",
            "amount": 800_000
        },
        {
            "address": "0x483a44E5Ed038f23518F7222a97F8f3E8AcD138e",
            "amount": 800_000
        },
        {
            "address": "0xb821226CFdA369c356C1531E9a0c1906bFC5B80D",
            "amount": 800_000
        },
        {
            "address": "0x2b7E23c5f79Ca72dF79294728347abB2461AEd91",
            "amount": 800_000
        },
        {
            "address": "0x4A7998DF2Cd16815271bb6b7d3aE7EB30f50a73a",
            "amount": 800_000
        },
        {
            "address": "0xc213e5d1bA49E3069b7eD5Ce1F53ED299B966C73",
            "amount": 800_000
        },
        {
            "address": "0x731Ed355833856dC1a004354EF06E6157B657264",
            "amount": 800_000
        },
        {
            "address": "0x12f9B53e44b56774d235B6E6f183fDe8a9043065",
            "amount": 800_000
        },
        {
            "address": "0x477e0d5C6323fE7106E9fa39a5089baEcf5b0a93",
            "amount": 800_000
        },
        {
            "address": "0xF8F91925347deA28292d833EdcA578b44187d00E",
            "amount": 800_000
        },
        {
            "address": "0x5B93FF82faaF241c15997ea3975419DDDd8362c5",
            "amount": 800_000
        },
        {
            "address": "0xf2d468f382f3f7f2a08f3805d409c20c023f9300",
            "amount": 400_000
        },
        {
            "address": "0x5473580406D12E1cBD4c00B77e158FfF0CE9424e",
            "amount": 800_000
        },
        {
            "address": "0xD22886236f453E9407F54cC2706B2E9C87789702",
            "amount": 800_000
        },
        {
            "address": "0x6767A7296ea3bDe8c01A1678E0ba3BeB2917cc80",
            "amount": 800_000
        },
        {
            "address": "0x7049871039097E61b1Ae827e77aBb1C9a0B14061",
            "amount": 400_000
        },
        {
            "address": "0xB23459D001965CE4e221b8E619C3Ef3a8cBd8779",
            "amount": 600_000
        },
        {
            "address": "0x6b0321c33e56feaa911db0732a5738581e64342e",
            "amount": 800_000
        },
        {
            "address": "0x4fae31dcf3775d1cab577c755c742dcec0d8b9fc",
            "amount": 400_000
        },
        {
            "address": "0x7B01429e5ade22C5b4002F0DA287717E8aD05375",
            "amount": 400_000
        },
        {
            "address": "0x96b2245edace8d3a298f8cd72061cd0158e8ae59",
            "amount": 400_000
        },
        {
            "address": "0x31275216B146F6573Fea7ca93F0e664273241512",
            "amount": 400_000
        },
        {
            "address": "0xb953b2f5a30b9897ef58a495051b373039f033af",
            "amount": 400_000
        },
        {
            "address": "0x7cA6B4645B71f874A35Bec18F0e997E51D8d815C",
            "amount": 400_000
        },
        {
            "address": "0x80D63799b1e08a80f73FB7a83264b5c31600bF3a",
            "amount": 800_000
        },
        {
            "address": "0xa5c3A513645A9a00cB561fED40438E9DFE0D6a69",
            "amount": 1_000_000
        },
        {
            "address": "0x55F9BC681a4f45F42ec61FF8D1A273EE7aEdAe29",
            "amount": 800_000
        },
        {
            "address": "0x84E94F8032b3F9fEc34EE05F192Ad57003337988",
            "amount": 800_000
        },
        {
            "address": "0x02491D37984764d39b99e4077649dcD349221a62",
            "amount": 400_000
        },
        {
            "address": "0xe6B8Bf38ab08E7B8acEe241Aad608F9650eCe21e",
            "amount": 800_000
        },
        {
            "address": "0x72BA1965320ab5352FD6D68235Cc3C5306a6FFA2",
            "amount": 800_000
        },
        {
            "address": "0x020cA66C30beC2c4Fe3861a94E4DB4A498A35872",
            "amount": 800_000
        },
        {
            "address": "0x1b773F51235E69B0a84bB488F623681Dd0315F67",
            "amount": 1_000_000
        },
        {
            "address": "0x25468E86ED8eC296de39FcB798C7f212924443AB",
            "amount": 400_000
        },
        {
            "address": "0x48A63097E1Ac123b1f5A8bbfFafA4afa8192FaB0",
            "amount": 800_000
        },
        {
            "address": "0x4a7C6899cdcB379e284fBFD045462e751DA4C7cE",
            "amount": 800_000
        },
        {
            "address": "0x19Eb7FfDcD670Ca917110Bd032463120a5E58C8E",
            "amount": 800_000
        },
        {
            "address": "0x4Ab5E3F0b2d1604dD2002CfEcA6163802D74c6Cb",
            "amount": 800_000
        },
        {
            "address": "0xC85170886A7F34e1365E2aA04486ae8F1106F783",
            "amount": 800_000
        },
        {
            "address": "0x426442826c6DDfC3B8F3A19c1290F566e7536eE3",
            "amount": 800_000
        },
        {
            "address": "0x1668c9725e27Bf5943bBD43886E1Fb5AFe75c46C",
            "amount": 800_000
        },
        {
            "address": "0xC5243752c3639893c981c9371BCEDEa4E3c91fA5",
            "amount": 800_000
        },
        {
            "address": "0x901b157427a3DB2cfF7f25F5353d576Af0931a3C",
            "amount": 800_000
        },
        {
            "address": "0x90e5aa59a9dF2ADd394df81521DbBEd5F3c4A1A3",
            "amount": 800_000
        },
        {
            "address": "0x86d3ee9ff0983Bc33b93cc8983371a500f873446",
            "amount": 800_000
        },
        {
            "address": "0x1efEd205cAeDe27dA1135cd37A4192861a51100e",
            "amount": 800_000
        },
        {
            "address": "0x167539702B5501aADd9B0B85E53532Fd57cC71a9",
            "amount": 800_000
        },
        {
            "address": "0x50664edE715e131F584D3E7EaAbd7818Bb20A068",
            "amount": 800_000
        },
        {
            "address": "0x99BC02c239025E431D5741cC1DbA8CE77fc51CE3",
            "amount": 800_000
        },
        {
            "address": "0x16Ff03Ef98EF3884C0FA0f296e98F481A33058D5",
            "amount": 1_000_000
        },
        {
            "address": "0x9f8B31439F129EfA908f31b7D4D883Cb99259E19",
            "amount": 800_000
        },
        {
            "address": "0x19C8CdE45aC3f23a92EDC6Abad0ee3EE18940E45",
            "amount": 400_000
        },
        {
            "address": "0x51787a2C56d710c68140bdAdeFD3A98BfF96FeB4",
            "amount": 800_000
        },
        {
            "address": "0x1766255E71A11f9f9D13aBE3f2840E3f6942Aa29",
            "amount": 800_000
        },
        {
            "address": "0x0a2542a170aA02B96B588aA3AF8B09AB22a9D7ac",
            "amount": 800_000
        },
        {
            "address": "0x20f9ddFA193D0fe2f73d8b7D749B1355eF019887",
            "amount": 800_000
        },
        {
            "address": "0x67b93852482113375666a310ac292D61dDD4bbb9",
            "amount": 800_000
        },
        {
            "address": "0x9cF05154c9aA32CE3A5CF093b176C61cfc0A79D8",
            "amount": 800_000
        },
        {
            "address": "0xF5Fb27b912D987B5b6e02A1B1BE0C1F0740E2c6f",
            "amount": 800_000
        },
        {
            "address": "0xf3b044bE4Ae3539EF9C1F79bB923d6Bc9EE879A6",
            "amount": 800_000
        },
        {
            "address": "0x968a0e5603c5D4dbF24cbd7df562921d158aD19C",
            "amount": 1_000_000
        },
        {
            "address": "0xE89bD48a519706E599e6C3e8Fa41b89Ef13e3979",
            "amount": 800_000
        },
        {
            "address": "0xA17E5d5fdfB02F6Eca3F95ca46E5a547F3bA7458",
            "amount": 800_000
        },
        {
            "address": "0xA6775ae22067D71FaE76E22Fa377Cfb38f223F0D",
            "amount": 800_000
        },
        {
            "address": "0x63a9dbCe75413036B2B778E670aaBd4493aAF9F3",
            "amount": 800_000
        },
        {
            "address": "0x4a86E7eFCe5f37583E6b7c4Db88D37EFF5812685",
            "amount": 400_000
        },
        {
            "address": "0xa7FBCa21C325c67A12f485F4FCCd4AeC191C6794",
            "amount": 800_000
        },
        {
            "address": "0x384Dc72cD3357B4f15984Aa51B0915Ed2AE4AA5A",
            "amount": 800_000
        },
    ];

    let lastGasEstimateTimestamp = 0;
    let crtTimestamp;

    let gasPrice = 0;

    let currentVesting
    let startIndex = 0
    let amount
    for (let i = startIndex; i < owners.length; i++) {

        crtTimestamp = Math.floor(new Date().getTime() / 1000)
        if (crtTimestamp - lastGasEstimateTimestamp > 30) {
            const price = await axios.get('https://www.gasnow.org/api/v3/gas/price?utm_source=UniverseXYZVestingDeployer');
            gasPrice = Math.round(1.15 * price.data.data.fast);
            console.log(`got new price at ${crtTimestamp}, value: ${gasPrice}`);
            lastGasEstimateTimestamp = crtTimestamp;
        }

        if (gasPrice < 250_000_000_000) {
            const owner = owners[i];
            amount = ethers.BigNumber.from(owner.amount)
                .mul(ethers.BigNumber.from(10).pow(18))

            currentVesting = await Vesting.deploy(owner.address, _xyzTokenAddress, startTime, amount, { gasPrice: gasPrice })
            await currentVesting.deployed()

            await XYZToken.transfer(currentVesting.address, amount, { gasPrice: gasPrice })

            console.log(`Deploy vesting contract index. ${i} for ${owner.address} at ${currentVesting.address}, amount ${owner.amount.toLocaleString()}`)
        } else {
            console.log('Too expensive to deploy');
            break;
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
