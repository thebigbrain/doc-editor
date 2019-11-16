import React from 'react'
import * as typeformEmbed from '@typeform/embed'
import hash from '@csb/common/lib/utils/hash'
import { Container } from './elements'

export const SurveyModal = () => {
  const {state, actions} =  useOvermind()
  const initializeTypeform = (el) => {
    if (el) {
      typeformEmbed.makeWidget(el, `https://codesandbox.typeform.com/to/LYbjII?userid=${hash(state.user.id)}&ispatron=${state.isPatron}`, {
        opacity: 0,
        hideScrollbars: true,
        hideFooter: true,
        hideHeaders: true,
        onSubmit: () => {
          setTimeout(() => {
            actions.modalClosed()
          }, 3000)
        },
      })
    }
  }
  return (<Container>
    <div style={{ width: '100%', height: 500 }} ref={initializeTypeform}/>
  </Container>)
}
