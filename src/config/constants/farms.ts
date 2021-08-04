import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file. On the testnet, you have to update the Starfield-bnb and bnb-busd pools
   * to pid: 2, and pid: 3
   */
  {
    pid: 0,
    lpSymbol: 'Starfield',
    lpAddresses: {
      97: '0x2F6BD2B6ACc688B14fbA499eA0082bD93A04b0CE',
      56: '0xaB5af03653349a052B49f167f4C709599C5f3844',
    },
    token: tokens.starfield,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'Starfield-BNB LP',
    lpAddresses: {
      97: '0xdfa8949999B3b066ed4Fd19Da777571036293087',
      56: '0x798A8752B39da59fba12Ab98058440a0e0990e19',
    },
    token: tokens.starfield,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xbfeE2d3726c5C544c9173Be215a642648552Cff8',
      56: '0x3eAb3dBCdA7bdb72967Bcbd6C9F811627fd51AD5',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xA2E8B8F337BA2a861Fe9942403980E0BaE574279',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd
  },
  {
    pid: 4,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x941684c5F1014730cd764A74A32C063665691bc2',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 5,
    lpSymbol: 'BTCB-ETH LP',
    lpAddresses: {
      97: '',
      56: '0x32eDE01E81E52eAd07C6CAD1Ff1b37cf041b642d',
    },
    token: tokens.btcb,
    quoteToken: tokens.eth
  },
  {
    pid: 6,
    lpSymbol: 'USDT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x370398E2D14496D67EfE73A86616a03761eF22f8',
    },
    token: tokens.usdt,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x86D96536A87bca304F272eF75C9118D84777aE40',
    },
    token: tokens.btcb,
    quoteToken: tokens.wbnb,
  }, 
  {
    pid: 8,
    lpSymbol: 'Starfield-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x9369a1f51a8acc37a005bdc22397a76a64e24ee5',
    },
    token: tokens.starfield,
    quoteToken: tokens.busd
  },
  {
    pid: 9,
    lpSymbol: 'Starfield-CAKE LP',
    lpAddresses: {
      97: '',
      56: '0xe14dce81b7e8876659411b18a9c6a57ccb9957c8',
    },
    token: tokens.starfield,
    quoteToken: tokens.cake
  }
]

export default farms
