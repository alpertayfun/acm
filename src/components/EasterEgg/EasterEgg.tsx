import React, { useState, useCallback } from 'react'
import { FallingAstronauts, FallingAstronautProps, useKonamiCheatCode } from '@orionswap/uikit'

const EasterEgg: React.FC<FallingAstronautProps> = (props) => {
  const [show, setShow] = useState(false)
  const startFalling = useCallback(() => setShow(true), [setShow])
  useKonamiCheatCode(startFalling)

  if (show) {
    return (
      <div onAnimationEnd={() => setShow(false)}>
        <FallingAstronauts {...props} />
      </div>
    )
  }
  return null
}

export default React.memo(EasterEgg)
