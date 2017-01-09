# amplify-open-oracle
Amplify Oracle Contracts

## Dev Env

* solidity 0.6.12+
* nodejs 12+

## Installation

```
yarn install
```

## Compile
```
yarn run compile
```

## Publish Contracts

Create a `.env` file at source root folder with following contents:

 ```shell

# Private key of ETH account for publishing
ACCOUNT=
# Etherscan API key
ETHERSCAN_API_KEY=XXXX

 ```

 Publish `OpenOraclePriceData` contract:

 ```shell

npx saddle deploy OpenOraclePriceData -n rinkeby
npx saddle verify "{Etherscan Api Key}" "{发布的OpenOraclePriceData合约}" OpenOraclePriceData -n rinkeby

 ```

Publish  UniswapAnchoredView contract:

Construct function of contract  `UniswapAnchoredView`  is a little bit complicate, show as below:

```js
    constructor(OpenOraclePriceData priceData_,
                address reporter_,
                uint anchorToleranceMantissa_,
                uint anchorPeriod_,
                TokenConfig[] memory configs) UniswapConfig(configs) public {
        // constructor logic
    }
```

Within the above function:

1.  `priceData_ `: Contract address of `OpenOraclePriceData` published in above step
2.  `reporter_` : Reporter address for prices
3.  `anchorToleranceMantissa_ `: Allowed tolerance compare to unisawp price, need to be times by `2e18`
4.  `anchorPeriod_ `:  The minimum duration for price report
5.  `configs`: Tokens supported by the contract, array of objects


The `configs` array element defined as following:
```js
[{cToken,underlying,symbolHash,baseUnit,priceSource,fixedPrice,uniswapMarket,isUniswapReversed}]
```
Within the above definitions:
1.  `cToken `: cToken address
2.  `underlying`:  Address for token represented by cToken
3.  `symbolHash` : Token symbol in keccak 256 encoding
4.  `baseUnit` : Base unit for token, such as `1e18`, `1e6` and etc.
5.  `priceSource `: Source of prices, 0 for ETH, 1 for USD, 2 for external submit
6.  `fixedPrice` : Price fixed
7.  `uniswapMarket`  : uniswap transaction pair address
8.  `sUniswapReversed`: Is uniswap transaction pair reversed `token0` and `token` or not

Publish sample:

```shell
npx saddle deploy UniswapAnchoredView 0x6F43f72C302908f8C6C9d5161486Ba91f88A816C 0x7D146890fE0c0Be9373FEA61e4037d0D44452148 "2000000000000000000" 1800 '[["0x300B1DcFD0DbF2d75e373E6ba9b92698094754CF","0x0000000000000000000000000000000000000000","0xaaaebeba3810b1e6b70781f14b2d72c1cb89c0b2b320c43bb67ff79f562f5ff4","1000000000000000000",2,0,"0xefB21979F4a63CFB55c90359988F70c977Ce7c26",true],["0x36A95Ba35257E9c30E9dC4912a5f554F90ba8e5d","0x1C31dd7D5F21e8Ad29AeD941b1A07cFEb5401C44","0xa5e92f3efb6826155f1f728e162af9d7cda33a574a1153b58f03ea01cc37e568","1000000000000000000",2,0,"0x36c6d02a968f4a027ba0935fe77ea07f79aa350d",false],["0x3A807A7c37075071192D78A202b80Cf22aa66069","0x2709fb45C130e57936e4653AF7260c0E89A74167","0xd6aca1be9729c13d677335161321649cccae6a591554772516700f986f942eaa","1000000000000000000",1,1000000,"0x0000000000000000000000000000000000000000",false],["0x5fE229759d6594759EDC7b373240a27A9a8Bb9d3","0x89dd864F2E37dC67c6C53beD68c72F87083dED20","0x8b1a1d9c2b109e527c9134b25b1a1833b16b6594f92daa9f6d9b7a6024bce9d0","1000000000000000000",1,1000000,"0x0000000000000000000000000000000000000000",false],["0x04798A994119691162e0ee359D484E2CA2Ab9f49","0xf77a17A537eF19f2a90417E2d095F180De2c93e9","0xe98e2830be1a7e4156d656a7505e65d08c67660dc618072422e9c78053c261e9","1000000000000000000",2,0,"0xefe612fcfe13e90fbeb00799d2d5da13c0e766a7",false]]' -n rinkeby
```

## Setup Oracle

* Submit transaction via etherscan.io, invoke `Comptroller` contract method
* Invoke `_setPriceOracle` method, use the just published `UniswapAnchoredView` contract address as the parameter


