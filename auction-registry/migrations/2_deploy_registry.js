// 2_deploy_registry.js
const DXTokenRegistry = artifacts.require("DXTokenRegistry");

const listName = "testlist";
const tokens = [
    "0xc778417E063141139Fce010982780140Aa0cD5Ab",//"WETH"
    "0xa9881E6459CA05d7D7C95374463928369cD7a90C",//USDT
    "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",//USDC
    "0xfb8a79916a252420c4e68014121642c1765e1b14"//AMPT
    //"0x5caE2e55002469d0676AF7e8495150B20f28ee1E",//DIA
    // "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",//DAI
    //"0xa7D1C04fAF998F9161fC9F800a99A809b84cfc9D",//Gnosis,OWL
    //"0x80Cf7016BDf286Ede100bE13a2f6A278DA7705eE",//DIA2
    //"0xE8B6B68D55C87240928Df0b5d3bEEfD586C28D03",//DIA3
]

//truffle migrate -f 2 --to 2 --network rinkeby
module.exports = async function (deployer, network, accounts) {
    const deployAccount = accounts[0];
    await deployer.deploy(DXTokenRegistry, { from: deployAccount });

    let registry = await DXTokenRegistry.deployed();

    await registry.addList(listName);

    await registry.addTokens(1, tokens);


};