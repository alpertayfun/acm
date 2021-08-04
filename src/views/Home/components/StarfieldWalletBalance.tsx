import React from 'react'
import { Text } from '@orionswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getStarfieldAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceStarfieldBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const StarfieldWalletBalance = () => {
  const { t } = useTranslation()
  const starfieldBalance = useTokenBalance(getStarfieldAddress())
  const starfieldPriceBusd = usePriceStarfieldBusd()
  const busdBalance = new BigNumber(getBalanceNumber(starfieldBalance)).multipliedBy(starfieldPriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(starfieldBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {!starfieldPriceBusd.eq(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default StarfieldWalletBalance
