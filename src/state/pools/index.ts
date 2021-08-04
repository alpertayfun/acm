/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/pools'
import { fetchPoolsBlockLimits, fetchPoolsTotalStaking } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
  fetchUserNextHarvests,
} from './fetchPoolsUser'
import { PoolsState, Pool } from '../types'

const initialState: PoolsState = { data: [...poolsConfig] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.id === pool.id)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.id === pool.id)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, id } = action.payload
      const index = state.data.findIndex((p) => p.id === id)

      if (index >= 0) {
        state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
      }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStaking()

  const liveData = poolsConfig.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.id === pool.id)
    const totalStaking = totalStakings.find((entry) => entry.id === pool.id)

    return {
      ...blockLimit,
      ...totalStaking,
    }
  })

  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)
  const nextHarvests = await fetchUserNextHarvests(account)

  const userData = poolsConfig.map((pool) => ({
    id: pool.id,
    allowance: allowances[pool.id],
    stakingTokenBalance: stakingTokenBalances[pool.id],
    stakedBalance: stakedBalances[pool.id],
    pendingReward: pendingRewards[pool.id],
    nextHarvest: nextHarvests[pool.id]
  }))

  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (id: number, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ id, field: 'allowance', value: allowances[id] }))
}

export const updateUserBalance = (id: number, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ id, field: 'stakingTokenBalance', value: tokenBalances[id] }))
}

export const updateUserStakedBalance = (id: number, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ id, field: 'stakedBalance', value: stakedBalances[id] }))
}

export const updateUserPendingReward = (id: number, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ id, field: 'pendingReward', value: pendingRewards[id] }))
}

export const updateUserNextHarvest = (id: number, account: string) => async (dispatch) => {
  const nextHarvest = await fetchUserNextHarvests(account)
  dispatch(updatePoolsUserData({ id, field: 'nextHarvest', value: nextHarvest[id] }))
}

export default PoolsSlice.reducer
