import React from 'react'
import styled, { ThemeConsumer } from 'styled-components'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { Heading, Card, CardBody, Button } from '@orionswap/uikit'
import { useTranslation } from 'contexts/Localization'

const StyledFarmStakingCard = styled(Card)`
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const AnnouncementCard = () => {
  const { t } = useTranslation()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Announcements')}
        </Heading>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="OrionSwap"
          theme="dark"
          options={{height: 350}}
          noHeader
          noFooter
        />
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default AnnouncementCard
