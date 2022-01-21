import React, { useState } from 'react'
import BN from 'bn.js'

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { MinusSVG, PlusSVG } from 'assets/img/SVG'

// const, utils, types
import { ZERO, MEDIA, WETH_ADDRESS_MAINNET } from 'const'
import { formatSmart, formatAmountFull } from 'utils'
import { TokenBalanceDetails, Command } from 'types'

// Components
import TokenImg from 'components/TokenImg'
import { WrapEtherBtn, UnwrapEtherBtn } from 'components/WrapEtherBtn'
import { Spinner } from 'components/Spinner'

// DepositWidget: subcomponents
import Form from 'components/DepositWidget/Form'
import { TokenRow, RowClaimButton, RowClaimSpan } from 'components/DepositWidget/Styled'

// Hooks and reducers
import useNoScroll from 'hooks/useNoScroll'
import { TokenLocalState } from 'reducers-actions'
import { TokenSymbol } from 'components/TokenSymbol'

export interface RowProps extends Record<keyof TokenLocalState, boolean> {
  ethBalance: BN | null
  tokenBalances: TokenBalanceDetails
  onSubmitDeposit: (amount: BN, onTxHash: (hash: string) => void) => Promise<void>
  onSubmitWithdraw: (amount: BN, onTxHash: (hash: string) => void) => Promise<void>
  onClaim: Command
  onEnableToken: Command
  innerWidth?: number
  innerHeight?: number
}

const spinner = <Spinner style={{ marginRight: 7 }} />

export const Row: React.FC<RowProps> = (props: RowProps) => {
  const {
    ethBalance,
    tokenBalances,
    onSubmitDeposit,
    onSubmitWithdraw,
    onClaim,
    onEnableToken,
    innerWidth,
    highlighted,
    enabling,
    enabled,
    claiming,
    withdrawing,
    depositing,
  } = props

  const {
    address,
    addressMainnet,
    name,
    image,
    symbol,
    decimals,
    totalExchangeBalance,
    pendingWithdraw,
    claimable,
    walletBalance,
    enabled: tokenEnabled,
    override,
    disabled: tokenDisabled,
  } = tokenBalances

  const [visibleForm, showForm] = useState<'deposit' | 'withdraw' | void>()

  // Checks innerWidth
  const showResponsive = !!innerWidth && innerWidth < MEDIA.MOBILE_LARGE_PX
  useNoScroll(!!visibleForm && showResponsive)

  let className
  if (highlighted) {
    className = 'highlight'
  } else if (enabling) {
    className = 'enabling'
  } else if (visibleForm) {
    className = 'selected'
  }

  const isDepositFormVisible = visibleForm == 'deposit'
  const isWithdrawFormVisible = visibleForm == 'withdraw'
  const isWeth = addressMainnet === WETH_ADDRESS_MAINNET

  return (
    <>
      <TokenRow data-address={address} className={className} data-address-mainnet={addressMainnet}>
        <td data-label="Token">
          <TokenImg src={image} alt={name} faded={tokenDisabled} />
          <div>
            <TokenSymbol symbol={symbol} warning={override?.description} warningUrl={override?.url} />
            {name}
          </div>
        </td>
        <td
          data-label="Exchange Wallet"
          title={formatAmountFull({ amount: totalExchangeBalance, precision: decimals }) || ''}
        >
          {depositing && spinner}
          {formatSmart(totalExchangeBalance, decimals)}
        </td>
        <td
          data-label="Pending Withdrawals"
          title={formatAmountFull({ amount: pendingWithdraw.amount, precision: decimals }) || ''}
        >
          {claimable ? (
            <>
              <RowClaimButton className="success" onClick={onClaim} disabled={claiming}>
                {(claiming || withdrawing) && spinner}
                {formatSmart(pendingWithdraw.amount, decimals)}
                <RowClaimSpan className={claiming || withdrawing ? 'disabled' : 'success'}>Claim</RowClaimSpan>
              </RowClaimButton>
            </>
          ) : pendingWithdraw.amount.gt(ZERO) ? (
            <>
              {withdrawing && spinner}
              <FontAwesomeIcon icon={faClock} style={{ marginRight: 7 }} />
              {formatSmart(pendingWithdraw.amount, decimals)}
            </>
          ) : (
            <>{withdrawing && spinner}0</>
          )}
        </td>
        <td data-label="Wallet">
          {isWeth ? (
            <ul>
              <li title={ethBalance ? formatAmountFull({ amount: ethBalance, precision: decimals }) : undefined}>
                {ethBalance ? formatSmart(ethBalance, decimals) : '-'} ETH{' '}
                <WrapEtherBtn label="Wrap" className="wrapUnwrapEther" />
              </li>
              <li title={formatAmountFull({ amount: walletBalance, precision: decimals }) || undefined}>
                {(claiming || depositing) && spinner}
                {formatSmart(walletBalance, decimals) + ' '}
                WETH <UnwrapEtherBtn label="Unwrap" className="wrapUnwrapEther" />
              </li>
            </ul>
          ) : (
            <>
              {(claiming || depositing) && spinner}
              {formatSmart(walletBalance, decimals)}
            </>
          )}
        </td>
        <td data-label="Actions">
          {!tokenDisabled &&
            (enabled || tokenEnabled ? (
              <button
                type="button"
                className="withdrawToken"
                onClick={(): void => showForm('deposit')}
                disabled={isDepositFormVisible}
              >
                <PlusSVG />
              </button>
            ) : (
              <>
                <button type="button" className="enableToken" onClick={onEnableToken} disabled={enabling}>
                  {enabling ? (
                    <>
                      <Spinner />
                      Enabling
                    </>
                  ) : (
                    <>Enable Deposit</>
                  )}
                </button>
              </>
            ))}
          {!totalExchangeBalance.isZero() && (
            <button
              type="button"
              onClick={(): void => showForm('withdraw')}
              disabled={isWithdrawFormVisible}
              className="depositToken"
            >
              <MinusSVG />
            </button>
          )}
        </td>
      </TokenRow>
      {isDepositFormVisible && (
        <Form
          title={
            <span>
              Deposit <strong>{symbol}</strong> in the Exchange Wallet
            </span>
          }
          totalAmountLabel="wallet balance"
          totalAmount={walletBalance}
          inputLabel="Deposit amount"
          tokenBalances={tokenBalances}
          submitBtnLabel="Deposit"
          submitBtnIcon={faPlus}
          onSubmit={onSubmitDeposit}
          onClose={(): void => showForm()}
          responsive={showResponsive}
        />
      )}
      {isWithdrawFormVisible && (
        <Form
          title={
            <span>
              Withdraw <strong>{symbol}</strong> from the Exchange Wallet
            </span>
          }
          totalAmountLabel="Exchange wallet"
          totalAmount={totalExchangeBalance}
          inputLabel="Withdraw amount"
          tokenBalances={tokenBalances}
          submitBtnLabel="Withdraw"
          submitBtnIcon={faMinus}
          onSubmit={onSubmitWithdraw}
          onClose={(): void => showForm()}
          responsive={showResponsive}
        />
      )}
    </>
  )
}

export default Row
