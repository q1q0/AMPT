# amplify-protocol

Amplify 去中心化银行

# 开发环境
solidity 5
nodejs 10+

# 安装
```
yarn
```

# 编译合约
```
npx saddle compile
```

# 发布合约（Rinkeb为例）

## 1. 环境准备

在代码根目录创建.env文件，内容如下
```
ACCOUNT={以太坊私钥}
```
以太坊私钥对应的地址需要在对应的网络上有ETH代币，作为发布手续费。

## 2. 发布FaucetToken，测试代币

发布测试WTBC

```shell    
# 发布
npx saddle deploy FaucetToken 100000000000000000000000000 "WBTC" 18 "WBTC"  -n rinkeby

# 在Etherscan.io上验证合约
npx saddle verify "{Etherscan Api Key}" "{发布的WBTC合约地址}" FaucetToken 100000000000000000000000000 "WBTC" 18 "WBTC" -n rinkeby
```

发布测试USDT

```shell
# 发布
npx saddle deploy FaucetToken 100000000000000000000000000 "USDT" 18 "USDT"  -n rinkeby

# 在Etherscan.io上验证合约
npx saddle verify "{Etherscan Api Key}" "{发布的USDT合约地址}" FaucetToken 100000000000000000000000000 "USDT" 18 "USDT" -n rinkeby
```

发布测试USDC
```shell
# 发布
npx saddle deploy FaucetToken 100000000000000000000000000 "USDC" 18 "USDC"  -n rinkeby

# 在Etherscan.io上验证合约
npx saddle verify "{Etherscan Api Key}" "{发布的USDC合约地址}" FaucetToken 100000000000000000000000000 "USDC" 18 "USDC" -n rinkeby
```

发布测试DAI
```shell
# 发布
npx saddle deploy FaucetToken 100000000000000000000000000 "DAI" 18 "DAI"  -n rinkeby

# 在Etherscan.io上验证合约
npx saddle verify "{Etherscan Api Key}" "{发布的DAI合约地址}" FaucetToken 100000000000000000000000000 "DAI" 18 "DAI" -n rinkeby
```

发布测试AMPT

```shell
# 发布
npx saddle deploy AMPT "{初始代币接收地址}"  -n rinkeby

# 在Etherscan.io上验证合约
npx saddle verify "{Etherscan Api Key}" "{发布的AMPT合约地址}" AMPT "{初始代币接收地址}"  -n rinkeby
```

## 3. 发布Comptroller合约

修改Comptroller.sol合约

```javascript
/**
* @notice Return the address of the AMPT token
* @return The address of AMPT
*/
function getCompAddress() public view returns (address) {
    return /*{此处修改为AMPT代币的合约地址}*/;
}
```

发布合约
```shell
# 发布
npx saddle deploy Comptroller -n rinkeby

# 在Etherscan.io上验证合约
npx saddle verify "{Etherscan Api Key}" "{发布的Comptroller合约地址}" Comptroller -n rinkeby
```


## 4. 发布InterestRate合约

InterestRate合约是利率计算模型的实现

例如：基础利率5%，加给利率12%

发布合约如下：
```shell
# 发布
npx saddle deploy WhitePaperInterestRateModel 50000000000000000 120000000000000000 -n rinkeby
# 在Etherscan.io上验证
npx saddle verify "{Etherscan Api Key}" "{发布的InterestRate合约地址}" WhitePaperInterestRateModel 50000000000000000 120000000000000000 -n rinkeby
```

## 5. 发布cToken合约
cToken使用户的存款凭证。

发布 cETH 合约
```shell
npx saddle deploy CEther "{前面发布的comptroller合约地址}" "{前面发布的InterestRate合约地址}" "2000000000000000000" "AMPLIFY cETH" "cETH" "8" "{管理员地址：可以先填入自己的地址}" -n rinkeby
```

发布 cWBTC 合约
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "{wBTC代币的地址}",
  "comptroller": "{前面发布的comptroller合约地址}",
  "interestRateModel": "{前面发布的InterestRate合约地址}",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY WBTC",
  "symbol": "cWBTC",
  "decimals": "8",
  "admin": "{管理员地址：可以先填入自己的地址}"
}'
```

发布 cUSDT 合约
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "{USDT代币的地址}",
  "comptroller": "{前面发布的comptroller合约地址}",
  "interestRateModel": "{前面发布的InterestRate合约地址}",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY USDT",
  "symbol": "cUSDT",
  "decimals": "8",
  "admin": "{管理员地址：可以先填入自己的地址}"
}'
```

发布 cUSDC 合约
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "{USDC代币的地址}",
  "comptroller": "{前面发布的comptroller合约地址}",
  "interestRateModel": "{前面发布的InterestRate合约地址}",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY USDC",
  "symbol": "cUSDC",
  "decimals": "8",
  "admin": "{管理员地址：可以先填入自己的地址}"
}'
```

发布 cDAI 合约
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "{DAI代币的地址}",
  "comptroller": "{前面发布的comptroller合约地址}",
  "interestRateModel": "{前面发布的InterestRate合约地址}",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY DAI",
  "symbol": "cDAI",
  "decimals": "8",
  "admin": "{管理员地址：可以先填入自己的地址}"
}'
```

发布 cAMPT  合约
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "{AMPT代币的地址}",
  "comptroller": "{前面发布的comptroller合约地址}",
  "interestRateModel": "{前面发布的InterestRate合约地址}",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY AMPT",
  "symbol": "cAMPT",
  "decimals": "8",
  "admin": "{管理员地址：可以先填入自己的地址}"
}'
```

## 6. 设置Comptroller
通过Etherscan.io发起交易，调用合约方法

调用_setMaxAsset方法，把maxAssets设置为20

调用_supportMarket方法，把前面创建的cToken地址写入支持代币列表，每个cToken需要调用一次

调用_setCollateralFactor方法，设置各个cToken的抵押率，每个cToken需要调用一次


## 6. 发布PriceOracle预言机
如果是在主网，使用Uniswap锚定的预言机，先从Coinbase或其他交易所获取代币价格提交到智能合约，使用Uniswap交易的价格作为校验。
该部分内容在amplify-open-oracle项目

## 7. 发布SimplePriceOracle
发布SimplePriceOracle可以用于测试，也可以在前期上线是为了避免预言机攻击，先使用SimplePriceOracle
```shell
# 发布
npx saddle deploy SimplePriceOracle -n rinkeby
# 在Etherscan.io上验证
npx saddle verify "{Etherscan Api Key}" "{发布的SimplePriceOracle合约地址}"  SimplePriceOracle -n rinkeby
```

## 8. 设置Comptroller预言机
通过Etherscan.io发起交易，调用合约方法

调用_setPriceOracle，把预言机合约的地址作为参数。


## 9. 发布CompoundLens
CompoundLens是一系列数据计算和查询的方法
```shell
# 发布
npx saddle deploy CompoundLens -n rinkeby
# 在Etherscan.io上验证
npx saddle verify "{Etherscan Api Key}" "{发布的CompoundLens合约地址}" CompoundLens -n rinkeby
```

## 10. 发布Maximillion合约
```shell
# 发布
npx saddle deploy Maximillion "{前面发布的cETH合约的地址}" -n rinkeby
# 在Etherscan.io上验证
npx saddle verify "{Etherscan Api Key}" "{发布的Maximillion合约地址}" Maximillion "{前面发布的cETH合约的地址}" -n rinkeby

```


## 11. 发布 Timelock 合约
Timelock是去中心化治理的时间锁合约
```shell
# 发布
npx saddle deploy Timelock "{管理员地址：可以先填入自己的地址}" 600 -n rinkeby
# 在Etherscan.io上验证
npx saddle verify "{Etherscan Api Key}" "{发布的Timelock合约地址}" Timelock "{管理员地址：可以先填入自己的地址} 600 -n rinkeby
```

## 12. 发布 GvernorAlpha 合约
GvernorAlpha是投票合约
```shell
# 发布
npx saddle deploy GovernorAlpha "{Timelock合约地址}" "{治理代币AMPT合约地址}" "{维护人地址}"  -n rinkeby
# 在Etherscan.io上验证
npx saddle verify "{Etherscan Api Key}" "{发布的GvernorAlpha合约地址}" GovernorAlpha "{Timelock合约地址}" "{治理代币AMPT合约地址}" "{维护人地址}"  -n rinkeby
```


## 13. Timelock成为各个被治理合约的admin
1）在各个被治理合约中，用原来的管理员调用 _setPendingAdmin 方法，设置Timelock合约 （ 0x6DB4152971E5C27f4e2273edC7dC656D510c5960 ）为pendingAdmin。

2）通过timelock的 queueTransaction 和 executeTransaction方法，让timelock合约发起被治理合约的_acceptAdmin方法，接受成为被治理合约的管理员。

## 14. 设置 GvernorAlpha 为 timelock 的 admin

1）用TimeLock合约的 queueTransaction 和 executeTransaction 方法，调用自己的setPendingAdmin方法。

2）调用GvernorAlpha的 __acceptAdmin，接手成为TimeLock的admin


