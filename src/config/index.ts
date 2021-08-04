import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const BASE_URL = 'https://orionswap.finance'
export const BASE_SWAP_URL = 'https://swap.orionswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_SWAP_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_SWAP_URL}/#/pool`
export const BASE_BSC_SCAN_URL = 'https://bscscan.com'
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
