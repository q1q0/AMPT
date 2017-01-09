# amplify-protocol

AMPLIFY - Decentralized Financial Infrastructure

# Developmeny Environment
* solidity ^0.5.16
* nodejs 12+

# Installion
```
yarn
```

# Compile
```
npx saddle compile
```

# Deploy（Rinkeb for example）

## 1. Environment Prepare

Create a .env file in the project directory as follows
```
ACCOUNT={Ethereum private key}
```

The address of the private key of Ethereum needs to have eth token on the network as the gas fee.

Take rinkeby network as example. create `~/.ethereum/rinkeby` file with Ethereum private key as content.

There will be several variables needed during deployment, we can set them via ENV vars instead of copy them all over, but you can also set them in each.

Basically, three variables are required, administrator address for cTokens and TimeLock, operator address for GovernorAlpha (Which actually can be same as the administrator address), API key for ethscan. Let's do following:

```bash
ETHSCAN_API_KEY={Etherscan Api Key}
ADMIN_ADDRESS={Administrator address}
OPERATOR_ADDRESS={Operator address}
AMPT_RECIPIENT={Initial token recipient address}
```


## 2. Deploy FaucetToken contracts

Deploy WTBC for testnet

```shell    
# Deploy
npx saddle deploy FaucetToken 100000000000000000000000000 "WBTC" 18 "WBTC"  -n rinkeby

WBTC={Deployed WBTC contract address}

# Verify on Etherscan.io上
npx saddle verify "$ETHSCAN_API_KEY" "$WBTC" FaucetToken 100000000000000000000000000 "WBTC" 18 "WBTC" -n rinkeby
```

Deploy USDT for testnet

```shell
# Deploy
npx saddle deploy FaucetToken 100000000000000000000000000 "USDT" 18 "USDT"  -n rinkeby

USDT={Deployed USDT contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$USDT" FaucetToken 100000000000000000000000000 "USDT" 18 "USDT" -n rinkeby
```

Deploy USDC for testnet
```shell
# Deploy
npx saddle deploy FaucetToken 100000000000000000000000000 "USDC" 18 "USDC"  -n rinkeby

USDC={Deployed USDC contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$USDC" FaucetToken 100000000000000000000000000 "USDC" 18 "USDC" -n rinkeby
```

Deploy DAI for testnet
```shell
# Deploy
npx saddle deploy FaucetToken 100000000000000000000000000 "DAI" 18 "DAI"  -n rinkeby

DAI={Deployed DAI contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$DAI" FaucetToken 100000000000000000000000000 "DAI" 18 "DAI" -n rinkeby
```

Deploy AMPT for testnet

```shell
# Deploy
npx saddle deploy AMPT "$AMPT_RECIPIENT"  -n rinkeby

AMPT={Deployed AMPT contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$AMPT" AMPT "$AMPT_RECIPIENT"  -n rinkeby
```

## 3. Deploy Comptroller Contract

 Update Comptroller.sol, ComptrollerG3.sol, ComptrollerG4.sol

```javascript
/**
* @notice Return the address of the AMPT token
* @return The address of AMPT
*/
function getCompAddress() public view returns (address) {
    return /*{AMPT token contract address}*/;
}
```

Deploy contract (After recompile the contracts)
```shell
npx saddle compile

# Deploy
npx saddle deploy Comptroller -n rinkeby

COMPTROLLER={Deployed Comptroller contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$COMPTROLLER" Comptroller -n rinkeby
```


## 4. Deploy InterestRate Contract

InterestRate contract is the implementation of interest rate calculation model

For example: the base interest rate is 5%, and the multipler interest rate is 12%

Deploy Contract
```shell
# Deploy
npx saddle deploy WhitePaperInterestRateModel 50000000000000000 120000000000000000 -n rinkeby

INTEREST_RATE={Deployed InterestRate contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$INTEREST_RATE" WhitePaperInterestRateModel 50000000000000000 120000000000000000 -n rinkeby
```

## 5. Deploy cTokens contract
Ctoken is the proof of deposit.

Deploy cETH Contract
```shell
npx saddle deploy CEther "$COMPTROLLER" "$INTEREST_RATE" "2000000000000000000" "AMPLIFY cETH" "cETH" "8" "$ADMIN_ADDRESS" -n rinkeby

CETH={Deployed cETH Contract Address}
```

Deploy cWBTC Contract
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "'"$WBTC"'",
  "comptroller": "'"$COMPTROLLER"'",
  "interestRateModel": "'"$INTEREST_RATE"'",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY WBTC",
  "symbol": "cWBTC",
  "decimals": "8",
  "admin": "'"$ADMIN_ADDRESS"'"
}'
```

Deploy cUSDT Contract
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "'"$USDT"'",
  "comptroller": "'"$COMPTROLLER"'",
  "interestRateModel": "'"$INTEREST_RATE"'",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY USDT",
  "symbol": "cUSDT",
  "decimals": "8",
  "admin": "'"$ADMIN_ADDRESS"'"
}'
```

Deploy cUSDC Contract
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "'"$USDC"'",
  "comptroller": "'"$COMPTROLLER"'",
  "interestRateModel": "'"$INTEREST_RATE"'",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY USDC",
  "symbol": "cUSDC",
  "decimals": "8",
  "admin": "'"$ADMIN_ADDRESS"'"
}'
```

Deploy cDAI Contract
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "'"$DAI"'",
  "comptroller": "'"$COMPTROLLER"'",
  "interestRateModel": "'"$INTEREST_RATE"'",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY DAI",
  "symbol": "cDAI",
  "decimals": "8",
  "admin": "'"$ADMIN_ADDRESS"'"
}'
```

Deploy cAMPT Contract
```shell
npx saddle -n rinkeby script token:deploy '{
  "underlying": "'"$AMPT"'",
  "comptroller": "'"$COMPTROLLER"'",
  "interestRateModel": "'"$INTEREST_RATE"'",
  "initialExchangeRateMantissa": "2.0e18",
  "name": "AMPLIFY AMPT",
  "symbol": "cAMPT",
  "decimals": "8",
  "admin": "'"$ADMIN_ADDRESS"'"
}'
```

## 6. Deploy PriceOracle
We use the Oracle anchored by uniswap in mainnet, first obtain the token price from coinbase or other exchanges, submit it to the smart contract, and use the price of uniswap as the verification.

See in the project: amplify-open-oracle

## 7. Deploy SimplePriceOracle
Simpleprice Oracle can be released for testing. It can be launched in the early stage in order to avoid Oracle attack.

```shell
# Deploy
npx saddle deploy SimplePriceOracle -n rinkeby

SIMPLE_PRICE_ORACLE={Deployed SimplePriceOracle Contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$SIMPLE_PRICE_ORACLE"  SimplePriceOracle -n rinkeby
```

* If using SimplePriceOracle, each cToken listed must has it's corresponding token price set via SimplePriceOracle contract, to do that, send transaction via etherscan.io for each cToken:

  - method: `setUnderlyingPrice`

  - Parameters

    |Parameter|Type|Comments|Sample|
    |:----|:----|:----|:----|
    |cToken|address|cToken contract address|0xd3569eC8AF83Bed92b369b83B90Ff17e27d1cdC2|
    |underlyingPriceMantissa|uint|Price for cToken corresponding token, in USD, the value need to be multiplied with `1e18`, for example, 1 USD should be `1000000000000000000`|1000000000000000000|

​    

## 8. Configure oracle address of the Comptroller.

Send transaction via Etherscan.io to call the contract method.

call _setPriceOracle to set the oracle contract address of the Comptroller

call _setMaxAsset to set the value of maxAssets to 20

call _supportMarket method to add cTokens to the token list. Each cToken needs to be added.

call _setCollateralFactor method to set the collateral factor of cToken.  Each cToken needs to be set. (This step must be executed after the oracle contract address of Comptroller has been set)


## 9. Deploy CompoundLens
CompoundLens is used for data calculation and query
```shell
# Deploy
npx saddle deploy CompoundLens -n rinkeby

COMPOUND_LENS={Deployed CompoundLens Contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$COMPOUND_LENS" CompoundLens -n rinkeby
```

## 10. Deploy Maximillion
```shell
# Deploy
npx saddle deploy Maximillion "$CETH" -n rinkeby

MAXMILLION={Deployed Maximillion contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$MAXMILLION" Maximillion "$CETH" -n rinkeby

```


## 11. Deploy Timelock Contract
Timelock is the contract for decentralized governance

```shell
# Deploy
npx saddle deploy Timelock "$ADMIN_ADDRESS" 600 -n rinkeby

TIMELOCK={Deployed Timelock Contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$TIMELOCK" Timelock "$ADMIN_ADDRESS" 600 -n rinkeby
```

## 12. Deploy GvernorAlpha Contract
GvernorAlpha is the contract of vote.
```shell
# Deploy
npx saddle deploy GovernorAlpha "$TIMELOCK" "$AMPT" "$OPERATOR_ADDRESS"  -n rinkeby

GOVERNOR_ALPHA={Deployed GvernorAlpha Contract address}

# Verify on Etherscan.io
npx saddle verify "$ETHSCAN_API_KEY" "$GOVERNOR_ALPHA" GovernorAlpha "$TIMELOCK" "$AMPT" "$OPERATOR_ADDRESS"  -n rinkeby
```

## 13. Set Timelock as the administrator of each governed contract

* This step is to set TimeLock contract as administrator for all contracts deployed
* At the early stage, setting admin when deploy contracts with a private owned account, it will be easier for debugging and adjusting
* Change admin to TimeLock at the mature stage to make everything more decentralized

Steps:

1）In each governed contract, call `_setPendingAdmin` method with the old administrator, set the timelock contract as `pendingAdmin`.

2）By calling `queueTransaction` and `executeTransaction` methods of timelock, let timelock contract invoke `_acceptAdmin` method of  governed contracts, so that it can be new administrator of governed contracts

## 14. Set  `GovernorAlpha` as the administrator of Timelock

Same as above step, use private address as admin at early step.

1）Use `queueTransaction` and `executetransaction` methods of the Timelock contract to invoke TimeLock contract's `setPendingAdmin` method

2) Invoke `_acceptAdmin` method of `GovernorAlpha` contract so that it will be admin for TimeLock contract