import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, Skeleton, useTooltip } from '@orionswap/uikit'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface DepositFeeProps {
  depositFee: BigNumber
}

const DepositFeeWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const calculateDepositFee = (fee: BigNumber) => {
  if(fee.eq(0)) {
    return '0%'
  }

  return `${Number(fee.div(100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`
}

const DepositFee: React.FunctionComponent<DepositFeeProps> = ({ depositFee }) => {
  const displayDepositFee = depositFee ? calculateDepositFee(depositFee) : (<Skeleton width={60} />)
  
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('The % fee charged for every deposit into the farm. This is used to buy back and burn Starfield which helps increase Starfield value and farm APR.'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container>
      <DepositFeeWrapper>
        <Text>{displayDepositFee}</Text>
      </DepositFeeWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default DepositFee
