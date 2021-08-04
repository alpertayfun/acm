import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'

// Addresses
import { getStarfieldAddress, getMasterChefAddress, getChainlinkOracleAddress } from 'utils/addressHelpers'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import starfieldAbi from 'config/abi/starfield.json'
import masterChef from 'config/abi/masterchef.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract(abi as unknown as AbiItem, address)
}
export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getStarfieldContract = (web3?: Web3) => {
  return getContract(starfieldAbi, getStarfieldAddress(), web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getChainlinkOracleContract = (web3?: Web3) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), web3)
}