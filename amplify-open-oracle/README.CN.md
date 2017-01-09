# amplify-open-oracle
Amplify预言机合约


# 开发环境
solidity 5

nodejs 10+

# 安装
```
yarn install
```

# 编译合约
```
yarn run compile
```

# 发布合约

在代码根目录创建.env文件，内容如下

 ```shell

# 用于发布的ETH账户私钥
ACCOUNT=
# Etherscan api key
ETHERSCAN_API_KEY=XXXX

 ```

 发布 OpenOraclePriceData 

 ```shell

npx saddle deploy OpenOraclePriceData -n rinkeby
npx saddle verify "{Etherscan Api Key}" "{发布的OpenOraclePriceData合约}" OpenOraclePriceData -n rinkeby

```

发布 UniswapAnchoredView 合约

UniswapAnchoredView 合约构造函数较为复杂，构造函数代码如下：

```js
    constructor(OpenOraclePriceData priceData_,
                address reporter_,
                uint anchorToleranceMantissa_,
                uint anchorPeriod_,
                TokenConfig[] memory configs) UniswapConfig(configs) public {
        // constructor logic
    }
```

其中:

1.  priceData_ ： 前面发布的OpenOraclePriceData合约地址
2.  reporter_ ： 价格的报告者地址
3.  anchorToleranceMantissa_ ： 允许偏离uniswap价格的比例，需要乘以2e18
4.  anchorPeriod_ ： 价格报告最小时间间隔
5.  configs ： 合约支持的代币，为对象数组


configs数组中对象含义如下：
```js
[{cToken,underlying,symbolHash,baseUnit,priceSource,fixedPrice,uniswapMarket,isUniswapReversed}]
```
其中：
1.  cToken ： cToken的地址
2.  underlying ： cToken对应代币的地址
3.  symbolHash ：代币符号的keccak 256编码
4.  baseUnit ： 代币的基础单位，如1e18,1e6等
5.  priceSource ： 价格来源，0锚定ETH，1锚定USD，2外部提交
6.  fixedPrice ： 锚定的价格
7.  uniswapMarket ： uniswap交易对地址
8.  isUniswapReversed ： uniswap交易对是否token0、token1倒置

发布示例：

```shell
npx saddle deploy UniswapAnchoredView 0x6F43f72C302908f8C6C9d5161486Ba91f88A816C 0x7D146890fE0c0Be9373FEA61e4037d0D44452148 "2000000000000000000" 1800 '[["0x300B1DcFD0DbF2d75e373E6ba9b92698094754CF","0x0000000000000000000000000000000000000000","0xaaaebeba3810b1e6b70781f14b2d72c1cb89c0b2b320c43bb67ff79f562f5ff4","1000000000000000000",2,0,"0xefB21979F4a63CFB55c90359988F70c977Ce7c26",true],["0x36A95Ba35257E9c30E9dC4912a5f554F90ba8e5d","0x1C31dd7D5F21e8Ad29AeD941b1A07cFEb5401C44","0xa5e92f3efb6826155f1f728e162af9d7cda33a574a1153b58f03ea01cc37e568","1000000000000000000",2,0,"0x36c6d02a968f4a027ba0935fe77ea07f79aa350d",false],["0x3A807A7c37075071192D78A202b80Cf22aa66069","0x2709fb45C130e57936e4653AF7260c0E89A74167","0xd6aca1be9729c13d677335161321649cccae6a591554772516700f986f942eaa","1000000000000000000",1,1000000,"0x0000000000000000000000000000000000000000",false],["0x5fE229759d6594759EDC7b373240a27A9a8Bb9d3","0x89dd864F2E37dC67c6C53beD68c72F87083dED20","0x8b1a1d9c2b109e527c9134b25b1a1833b16b6594f92daa9f6d9b7a6024bce9d0","1000000000000000000",1,1000000,"0x0000000000000000000000000000000000000000",false],["0x04798A994119691162e0ee359D484E2CA2Ab9f49","0xf77a17A537eF19f2a90417E2d095F180De2c93e9","0xe98e2830be1a7e4156d656a7505e65d08c67660dc618072422e9c78053c261e9","1000000000000000000",2,0,"0xefe612fcfe13e90fbeb00799d2d5da13c0e766a7",false]]' -n rinkeby
```

# 设置Oracle

通过Etherscan.io发起交易，调用Comptroller合约方法

调用_setPriceOracle方法，参数为前面发布的UniswapAnchoredView合约地址地址


