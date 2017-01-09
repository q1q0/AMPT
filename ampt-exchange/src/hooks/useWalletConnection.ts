import { walletApi } from 'api'
import { useEffect, useMemo } from 'react'
import { Command, Network } from 'types'
import useSafeState from './useSafeState'
import { WalletInfo } from 'api/wallet/WalletApi'

const PendingState: { pending: true; networkIdOrDefault: number } & { [K in keyof WalletInfo]: undefined } = {
  pending: true,
  isConnected: undefined,
  userAddress: undefined,
  networkId: undefined,
  networkIdOrDefault: Network.Rinkeby,
}

export const useWalletConnection = ():
  | (WalletInfo & { pending: false; networkIdOrDefault: number })
  | typeof PendingState => {
  const [walletInfo, setWalletInfo] = useSafeState<WalletInfo | null>(null)

  useEffect((): Command => {
    return walletApi.addOnChangeWalletInfo(setWalletInfo)
  }, [setWalletInfo])

  return useMemo(() => {
    return !walletInfo
      ? PendingState
      : {
          ...walletInfo,
          networkIdOrDefault: walletInfo.networkId || Network.Rinkeby,
          pending: false,
        }
  }, [walletInfo])
}
