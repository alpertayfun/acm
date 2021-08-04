import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@orionswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import Countdown from 'react-countdown'
import { usePriceStarfieldBusd } from 'state/hooks'
import CardBusdValue from '../../../Home/components/CardBusdValue'

interface FarmCardActionsProps {
  userData?: {
    nextHarvest: string
    earnings: string
  }
  pid?: number,
  userDataReady: boolean
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ pid, userData, userDataReady }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const starfieldPrice = usePriceStarfieldBusd()

  const rawEarningsBalance = account ? getBalanceNumber(new BigNumber(userData.earnings)) : 0
  const displayBalance = rawEarningsBalance.toLocaleString()
  const earningsBusd = rawEarningsBalance ? new BigNumber(rawEarningsBalance).multipliedBy(starfieldPrice).toNumber() : 0

  const renderCountdown = ({hours, minutes, seconds }) => {
    return <span>{hours}:{minutes}:{seconds} {t('till harvest')}</span>
  }

  return (
    <Flex mb="8px" justifyContent="space-between">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalance}
        {earningsBusd > 0 && <CardBusdValue value={earningsBusd} />}
      </Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx || !userDataReady || Number(userData.nextHarvest) > Math.floor(Date.now() / 1000)}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
      >
        {userDataReady && Number(userData.nextHarvest) > Math.floor(Date.now() / 1000) ? 
              <Countdown date={Number(userData.nextHarvest) * 1000} renderer={renderCountdown}/> : t('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
