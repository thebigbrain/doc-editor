import React from 'react'

import { Button } from '@csb/common/lib/components/Button'

import { ButtonContainer } from './elements'
import {useOvermind} from "@muggle/hooks"

function AddVersion({ children }) {
  const {actions: signals} = useOvermind()

  return (
    <div style={{ position: 'relative' }}>
      <ButtonContainer>
        <Button
          block
          small
          onClick={() =>
            signals.modalOpened({
              modal: 'searchDependencies',
            })
          }
        >
          {children}
        </Button>
      </ButtonContainer>
    </div>
  )
}

export default AddVersion
