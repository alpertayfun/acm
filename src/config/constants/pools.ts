import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    id: 0,
    stakingToken: tokens.starfield,
    earningToken: tokens.starfield,
    contractAddress: {
      97: '0x0c873F865791869fD7F9067142c67AFb7Bd3D792',
      56: '0xFc4D8B845931cBBCa2FE545a874022ebAC1d0b8B',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '24',
    sortOrder: 1,
    isFinished: false,
    isPromoted: true,
  },
]

export default pools
