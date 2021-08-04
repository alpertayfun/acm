import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Flex, Heading, Skeleton, Text } from '@orionswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled(Card)`
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

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const totalLiquidity = 585
  const dailyVolume = 15

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('AMM Stats')}
        </Heading>
        {data ? (
          <>
            <Row>
              <Text>{t('Total Liquidity')}:</Text>
              <Text bold>${totalLiquidity}</Text>
            </Row>
            <Row>
              <Text>{t('24H Volume')}:</Text>
              <Text bold>${dailyVolume}</Text>
            </Row>
          </>
        ) : (
          <Skeleton height={66} />
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
