import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, useTooltip } from '@orionswap/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import { useTranslation } from 'contexts/Localization'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  isCommunityFarm,
  farmImage,
  tokenSymbol,
}) => {

  const { t } = useTranslation()
  const tooltipContent = (
    <div>
      {t('Represents the amount of Starfield rewards each farm gets for each mined block.')}
    </div>
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
    placement: 'top-end',
    tooltipOffset: [20, 10],
  })

  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <div ref={targetRef}>
            <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
          </div>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
