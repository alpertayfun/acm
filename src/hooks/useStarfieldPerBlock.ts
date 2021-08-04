import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getMasterchefContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import useWeb3 from './useWeb3'
import useRefresh from './useRefresh'

const useStarfieldPerBlock = () => {
  const [starfieldPerBlock, setStarfieldPerBlock] = useState(BIG_ZERO)
  const web3 = useWeb3()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchStarfieldPerBlock = async () => {
      const contract = getMasterchefContract(web3)
      const res = await contract.methods.StarfieldPerBlock().call()
      setStarfieldPerBlock(new BigNumber(res))
    }

    fetchStarfieldPerBlock()

  }, [starfieldPerBlock, web3, slowRefresh])

  return starfieldPerBlock
}
export default useStarfieldPerBlock
