import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@orionswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import AnnouncementCard from 'views/Home/components/AnnouncementCard'
import StarfieldStats from 'views/Home/components/StarfieldStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'

const Frame = styled.div`
  background-image: url('/images/main-bg.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/rocket-riding.svg');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 150px;
  height: 250px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/orion-bg.svg'), url('/images/orion-bg2.svg');
    background-position: left center, right center;
    height: 210px;
    padding-top: 0;
    margin-right: 25px;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Frame>
      <Page>
        <Hero>
          <img src='/images/title-block.svg' alt='OrionSwap' width='400px'/>
          <Text>{t('The newest and most reliable AMM on the Binance Smart Chain!')}</Text>
        </Hero>
        <div>
          <Cards>
            <FarmStakingCard />
            <AnnouncementCard/>
          </Cards>
          <Cards>
            <StarfieldStats />
            <TotalValueLockedCard />
          </Cards>
        </div>
      </Page>
    </Frame>
  )
}

export default Home
