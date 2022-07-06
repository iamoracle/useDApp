import { ChainId } from '../../../constants'
import { Dispatch } from 'react'
import { BlockNumberChanged } from './reducer'
import { providers } from 'ethers'

export function subscribeToNewBlock(
  provider: providers.BaseProvider | providers.Web3Provider | undefined,
  chainId: ChainId | undefined,
  dispatch: Dispatch<BlockNumberChanged>,
  isActive: boolean
) {
  if (provider && chainId !== undefined && isActive) {
    const update = (blockNumber: number) => dispatch({ chainId, blockNumber })
    provider.on('block', update)

    provider.getBlockNumber().then(
      (blockNumber) => update(blockNumber),
      (err) => {
        console.error(err)
      }
    )

    return () => {
      provider.off('block', update)
    }
  }

  return () => undefined
}
