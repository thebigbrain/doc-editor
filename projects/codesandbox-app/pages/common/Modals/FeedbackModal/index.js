import React from 'react'

import Loadable from 'app/utils/Loadable'
import {useOvermind} from '@muggle/hooks'

import { Container, Heading } from '../elements'

const Feedback = Loadable(() =>
  import(/* webpackChunkName: 'feedback' */ './Feedback'),
)

function FeedbackModal() {
  const {state} = useOvermind()

  return (
    <Container>
      <Heading>Submit Feedback</Heading>

      <Feedback user={state.user} id={state.editor.currentId}/>
    </Container>
  )
}
