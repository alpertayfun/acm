import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'OrionSwap',
  description:
    'The best AMM on Binance Smart Chain! Earn Starfields through yield farming, then stake it in Galaxy Pools to earn more tokens! We charge the lowest fees for swaps and give the highest percentage you can find for liquidity providers.',
  image: 'https://OrionSwap.finance/images/orion.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home | OrionSwap',
  },
  '/farms': {
    title: 'Farms | OrionSwap',
  },
  '/pools': {
    title: 'Pools | OrionSwap',
  },
}
