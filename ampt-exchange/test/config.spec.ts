import {
  MultiTcrConfig,
  DexPriceEstimatorConfig,
  TheGraphApiConfig,
  InfuraProviderConfig,
  ExchangeContractConfig,
} from 'types/config'
import { Network } from 'types'

describe('Test config defaults', () => {
  it('name', () => {
    expect(CONFIG.name).toEqual('Gnosis Protocol Web')
  })

  it('logoPath', () => {
    expect(CONFIG.logoPath).toEqual('./src/assets/img/logo.svg')
  })

  it('templatePath', () => {
    expect(CONFIG.templatePath).toEqual('./src/html/index.html')
  })

  it('tcr config', () => {
    const expected: MultiTcrConfig = {
      type: 'multi-tcr',
      config: {
        lists: [
          {
            networkId: 1,
            listId: 1,
            contractAddress: '0x1854dae560abb0f399d8badca456663ca5c309d0',
          },
          {
            networkId: 4,
            contractAddress: '0xd05AFa37547cB7309aEd8dF813f20Fe3C30Dac5B',
          },
        ],
      },
    }

    expect(CONFIG.tcr).toEqual(expected)
  })

  it('dexPriceEstimator config', () => {
    const expected: DexPriceEstimatorConfig = {
      type: 'dex-price-estimator',
      config: [
        {
          networkId: 1,
          url_production: 'https://dex-price-estimator.gnosis.io',
          url_develop: 'https://price-estimate-mainnet.dev.gnosisdev.com',
        },
        {
          networkId: 4,
          url_production: 'https://dex-price-estimator.rinkeby.gnosis.io',
          url_develop: 'https://price-estimate-rinkeby.dev.gnosisdev.com',
        },
      ],
    }
    expect(CONFIG.dexPriceEstimator).toEqual(expected)
  })

  it('theGraphApi config', () => {
    const expected: TheGraphApiConfig = {
      type: 'the-graph',
      config: [
        {
          networkId: 1,
          url: 'https://api.thegraph.com/subgraphs/name/gnosis/protocol',
        },
        {
          networkId: 4,
          url: 'https://api.thegraph.com/subgraphs/name/gnosis/protocol-rinkeby',
        },
      ],
    }
    expect(CONFIG.theGraphApi).toEqual(expected)
  })

  it('defaultProviderConfig', () => {
    const expected: InfuraProviderConfig = {
      type: 'infura',
      config: {
        infuraId: '607a7dfcb1ad4a0b83152e30ce20cfc5',
        infuraEndpoint: 'wss://mainnet.infura.io/ws/v3/',
      },
    }

    expect(CONFIG.defaultProviderConfig).toEqual(expected)
  })

  it('exchangeContractConfig', () => {
    const expected: ExchangeContractConfig = {
      type: 'contractBlock',
      config: [
        { networkId: 1, blockNumber: 9340147 },
        { networkId: 4, blockNumber: 5844678 },
      ],
    }
    expect(CONFIG.exchangeContractConfig).toEqual(expected)
  })

  it('disabledTokens', () => {
    const disabledTokensArray = expect.arrayContaining([
      expect.objectContaining({
        // required field
        address: expect.any(String),
      }),
    ])

    const { [Network.Mainnet]: disabledOnMainnet, [Network.Rinkeby]: disabledOnRinkeby } = CONFIG.disabledTokens

    if (disabledOnMainnet.length) expect(disabledOnMainnet).toEqual(disabledTokensArray)
    if (disabledOnRinkeby.length) expect(disabledOnRinkeby).toEqual(disabledTokensArray)
  })
})
