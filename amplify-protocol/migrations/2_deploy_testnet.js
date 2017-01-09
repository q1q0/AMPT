const Comptroller = artifacts.require("Comptroller");


//truffle migrate --network mainnet
//truffle migrate --network rinkeby
//truffle migrate -f 2 --to 2 --network ropsten
//truffle migrate -f 2 --to 2 --network rinkeby
//truffle migrate -f 2 --to 2 --network mainnet

module.exports = async function (deployer, network, accounts) {

    let deployAccount = accounts[0];;

    //Deploy Comptroller
    await deployer.deploy(Comptroller, { from: deployAccount });

};

