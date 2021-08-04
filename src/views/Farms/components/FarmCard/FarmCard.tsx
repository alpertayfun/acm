import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes, css } from 'styled-components'
import { Flex, Text, Skeleton } from '@orionswap/uikit'
import { Farm } from 'state/types'
import { provider as ProviderType } from 'web3-core'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import useStarfieldPerBlock from 'hooks/useStarfieldPerBlock'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import tokens from 'config/constants/tokens'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'


export interface FarmWithStakedValue extends Farm {
  apr?: number
  liquidity?: BigNumber
}

const AccentGradient = keyframes`  
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

const StyledCardAccent = styled.div<{ isPromotedFarm: boolean }>`
  max-width: 352px;
  margin: 0 8px 24px;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  border-radius: 32px;

  ${({ isPromotedFarm, theme }) =>
    isPromotedFarm
      ? css`
          background: linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary});
          padding: 1px 1px 3px 1px;
          background-size: 400% 400%;
          animation: ${AccentGradient} 3s ease infinite;
        `
      : `background: ${(props) => props.theme.card.background};`
    }
`

const FCard = styled.div<{ isPromotedFarm: boolean }>`
  background: ${(props) => props.theme.card.background};
  border-radius: ${({ theme, isPromotedFarm }) => (isPromotedFarm ? '31px' : theme.radii.card)};
  padding: 24px;
  text-align: left;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  provider?: ProviderType
  account?: string
  userDataReady?: boolean
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, account, userDataReady }) => {
  const { t } = useTranslation()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const starfieldPerBlock = useStarfieldPerBlock().div(10 ** tokens.starfield.decimals)
  // We assume the token name is coin pair + lp e.g. Starfield-BNB LP, LINK-BNB LP,
  // NAR-Starfield LP. The images should be Starfield-bnb.svg, link-bnb.svg, nar-Starfield.svg
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()

  const totalValueFormatted = farm.liquidity
    ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'Starfield'

  const farmAPR = farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  const depositFee = farm.depositFee && farm.depositFee.isGreaterThan(0) ? farm.depositFee.div(100).toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 }) : 0

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const isPromotedFarm = farm.token.symbol === 'Starfield'

  // TODO: Update LP pair info with analytics page when complete
  return (
    <StyledCardAccent isPromotedFarm={isPromotedFarm}>
      <FCard isPromotedFarm={isPromotedFarm}>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.poolWeight && starfieldPerBlock.times(farm.poolWeight).toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 })}
          isCommunityFarm={farm.isCommunity}
          farmImage={farmImage}
          tokenSymbol={farm.token.symbol}
        />
        {!removed && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text>{t('APR')}:</Text>
            <Text bold style={{ display: 'flex', alignItems: 'center' }}>
              {farm.apr ? (
                <>
                  <ApyButton lpLabel={lpLabel} addLiquidityUrl={addLiquidityUrl} cakePrice={cakePrice} apr={farm.apr} />
                  {farmAPR}%
                </>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          </Flex>
        )}
        <Flex justifyContent="space-between">
          <Text>{t('Earn')}:</Text>
          <Text bold>{earnLabel}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('Deposit Fee')}:</Text>
          { farm.depositFee !== null ? 
            <Text bold>{depositFee}%</Text> : 
            <Skeleton height={24} width={80}/>
          }
        </Flex>
        <CardActionsContainer farm={farm} account={account} addLiquidityUrl={addLiquidityUrl} userDataReady={userDataReady}/>
        <Divider />
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
        <ExpandingWrapper expanded={showExpandableSection}>
          <DetailsSection
            removed={removed}
            bscScanAddress={`https://bscscan.com/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`}
            infoAddress={`https://bscscan.com/address/${lpAddress}`}
            totalValueFormatted={totalValueFormatted}
            lpLabel={lpLabel}
            addLiquidityUrl={addLiquidityUrl}
          />
        </ExpandingWrapper>
      </FCard>
    </StyledCardAccent>
  )
}

export default FarmCard
