import { useEffect, useState } from 'react'

export const baseUrl = 'https://api.OrionSwap.info/api'

/* eslint-disable camelcase */

export interface ApiStatsResponse {
  updated_at: string
  total_liquidity_BNB: string;
  total_liquidity_USD: string;
  total_volume_BNB: string;
  total_volume_USD: string;
  volume_BNB: string;
  volume_USD: string;
  tx_count: number;
}

export const useGetStats = () => {
  const [data, setData] = useState<ApiStatsResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/stats`)
        const responseData = await response.json()

        setData(responseData.data)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}
