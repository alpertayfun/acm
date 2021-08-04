import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@orionswap/uikit'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { getFarmApr } from 'utils/apr'
import { useFarms, usePriceStarfieldBusd, useGetApiPrices } from 'state/hooks'
import { getAddress } from 'utils/addressHelpers'
import useStarfieldPerBlock from 'hooks/useStarfieldPerBlock'
import tokens from 'config/constants/tokens'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'xl' })`
  line-height: 44px;
`
const EarnAPRCard = () => {
  const { t } = useTranslation()
  const { data: farmsLP } = useFarms()
  const prices = useGetApiPrices()
  const starfieldPrice = usePriceStarfieldBusd()
  const starfieldPerBlock = useStarfieldPerBlock().div(10 ** tokens.starfield.decimals)

  const highestApr = useMemo(() => {
    const aprs = farmsLP
      // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
      .filter((farm) => farm.pid !== 0 && farm.poolWeight !== "0")
      .map((farm) => {
        if (farm.lpStakedTotalInQuoteToken && prices) {
          const quoteTokenPriceUsd = prices[getAddress(farm.quoteToken.address).toLowerCase()]
          const totalLiquidity = new BigNumber(farm.lpStakedTotalInQuoteToken).times(quoteTokenPriceUsd)
          return getFarmApr(farm.poolWeight, starfieldPerBlock, starfieldPrice, totalLiquidity)
        }
        return null
      })

    const maxApr = max(aprs)
    return maxApr?.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }, [starfieldPrice, farmsLP, prices])

  return (
    <StyledFarmStakingCard>
      <NavLink exact activeClassName="active" to="/farms" id="farm-apr-cta">
        <CardBody>
          <Heading color="contrast" scale="lg">
            Earn up to
          </Heading>
          <CardMidContent color="#7645d9">
            {highestApr ? `${highestApr}% ${t('APR')}` : <Skeleton animation="pulse" variant="rect" height="44px" />}
          </CardMidContent>
          <Flex justifyContent="space-between">
            <Heading color="contrast" scale="lg">
              in Farms
            </Heading>
            <ArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </NavLink>
    </StyledFarmStakingCard>
  )
}

export default EarnAPRCard
