import React, { useState, useRef, useEffect } from 'react'
import { Button, Skeleton } from '@orionswap/uikit'
import BigNumber from 'bignumber.js'
import Countdown from 'react-countdown'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import { useTranslation } from 'contexts/Localization'
import { usePriceStarfieldBusd } from 'state/hooks'
import { useCountUp } from 'react-countup'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, Staked } from './styles'

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const earningsBigNumber = new BigNumber(userData.earnings)
  const starfieldPrice = usePriceStarfieldBusd()
  let earnings = 0
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceNumber(earningsBigNumber)
    earningsBusd = new BigNumber(earnings).multipliedBy(starfieldPrice).toNumber()
    displayBalance = earnings.toLocaleString()
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { t } = useTranslation()

  const { countUp, update } = useCountUp({
    start: 0,
    end: earningsBusd,
    duration: 1,
    separator: ',',
    decimals: 2,
  })
  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(earningsBusd)
  }, [earningsBusd, updateValue])

  const renderCountdown = ({hours, minutes, seconds }) => {
    return <span>{hours}:{minutes}:{seconds} {t('till harvest')}</span>
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Title>Starfield </Title>
        <Subtle>{t('EARNED')}</Subtle>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          {countUp > 0 && <Staked>~${countUp}</Staked>}
        </div>
        <Button
            disabled={!earnings || pendingTx || !userDataReady || Number(userData.nextHarvest) > Math.floor(Date.now() / 1000)}
            onClick={async () => {
              setPendingTx(true)
              await onReward()
              setPendingTx(false)
            }}
            ml="4px"
          >
            {userDataReady && Number(userData.nextHarvest) > Math.floor(Date.now() / 1000) ? 
              <Countdown date={Number(userData.nextHarvest) * 1000} renderer={renderCountdown}/> : t('Harvest')}
          </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
