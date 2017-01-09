# Auction Registry

## General

AMPT auction platform token registry

## Devevelopment Env

* nodejs 12+
* truffle

## Configuration

Create `.env` with following infomation:

```
privatekey_ropsten={ETH Private Key}
address_ropsten={ETH Address}

privatekey_rinkeby={ETH Private Key}
address_rinkeby={ETH Address}

privatekey_mainnet={ETH Private Key}
address_mainnet={ETH Address}

infura_v3_apikey={infura.io project id}
```

## Deploy Script

truffle migrate --network ropsten

truffle migrate --network rinkeby

truffle migrate --network mainnet

## Deployed Hash

* Rinkeby
* AMPT -  0xfb8a79916a252420c4e68014121642c1765e1b14
* AMPT Gnosis ID: 51
* Registry - 0xa3D07E354E5Fe5B1C6243f041d3e68a353d00d32

