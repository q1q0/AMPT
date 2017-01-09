# auction-frontend

AMPT Auction Platform Codes

## Development Env

* node.js 12+

## Configuration

custom.yaml
``` yaml
name: AMPT Token Sale

logoPath: './src/assets/img/logo.png'

templatePath: './src/html/index.html'

appId: 03

tcr:
  type: 'multi-tcr' # choices: multi-tcr | none
  config:
    lists:
        # 主网的代币注册合约地址
      - networkId: 1
        listId: 1
        contractAddress: '0x14a588f15a043913b30c19a80049876e4a21fafb'
        # 测试网的注册合约地址
      - networkId: 4
        listId: 1
        contractAddress: '0xa3D07E354E5Fe5B1C6243f041d3e68a353d00d32'

# Price estimation/orderbook graph
dexPriceEstimator:
  type: 'dex-price-estimator' # choices: dex-price-estimator
  config:
    - networkId: 1
      url_production: https://dex-price-estimator.gnosis.io
      url_develop: https://price-estimate-mainnet.dev.gnosisdev.com

    - networkId: 4
      url_production: https://dex-price-estimator.rinkeby.gnosis.io
      url_develop: https://price-estimate-rinkeby.dev.gnosisdev.com

# Subgraph abstraction, used for getting the last price
theGraphApi:
  type: 'the-graph' # choices: the-graph
  config:
    - networkId: 1
      url: https://api.thegraph.com/subgraphs/name/gnosis/protocol

    - networkId: 4
      url: https://api.thegraph.com/subgraphs/name/gnosis/protocol-rinkeby

# Eth node config
defaultProviderConfig:
  type: 'infura' # Choices: infura | url
  config:
    # It'll be appended to `infuraEndpoint`
    infuraId: 607a7dfcb1ad4a0b83152e30ce20cfc5
    infuraEndpoint: wss://mainnet.infura.io/ws/v3/
  #
  # Example for type `url`
  # type: 'url'
  # config:
  #   ethNodeUrl: <local eth node>

# Exchange contract config
exchangeContractConfig:
  type: 'contractBlock' # choices: contractBlock
  config:
    - networkId: 1
      blockNumber: 9340147
    - networkId: 4
      blockNumber: 5844678

# Wallet Connect
walletConnect:
  bridge: 'wss://safe-walletconnect.gnosis.io/'

disabledTokens:
  1:
    # 主网的代币注册合约中要忽略的代币
    - address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd'
  4:
    # 测试网的代币注册合约中要忽略的代币
    - address: '0x0000000000085d4780B73119b644AE5ecd22b376'
    - address: '0xBD6A9921504fae42EaD2024F43305A8ED3890F6f'
    - address: '0x784B46A4331f5c7C495F296AE700652265ab2fC6'
    - address: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
    - address: '0x0647b2c7a2a818276154b0fc79557f512b165bc1'
    - address: '0x1b642a124cdfa1e5835276a6ddaa6cfc4b35d52c'
    - address: '0x322A3346bf24363f451164d96A5b5cd5A7F4c337'
    - address: '0xd0Dab4E640D95E9E8A47545598c33e31bDb53C7c'
    - address: '0xa7D1C04fAF998F9161fC9F800a99A809b84cfc9D'
    - address: '0x5cae2e55002469d0676af7e8495150b20f28ee1e'

```


## Run

```
yarn

yarn start
```

## Publish

```
npm run build
```

Once the project has been built, map `dist` folder to outside with web server.