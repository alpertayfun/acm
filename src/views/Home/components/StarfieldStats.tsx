import React from 'react'
import { Card, CardBody, Heading, Text } from '@orionswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useStarfieldPerBlock from 'hooks/useStarfieldPerBlock'
import { useTranslation } from 'contexts/Localization'
import { getStarfieldAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'

import CardValue from './CardValue'

const StyledStarfieldStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const StarfieldStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getStarfieldAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const starfieldPerBlock = useStarfieldPerBlock();
  const starfieldDecimals = 10 ** tokens.starfield.decimals

  return (
    <StyledStarfieldStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Starfield Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Total Starfield Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Starfield Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New Starfield/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={starfieldPerBlock.div(starfieldDecimals).toNumber()} />
        </Row>
      </CardBody>
    </StyledStarfieldStats>
  )
}

export default StarfieldStats
