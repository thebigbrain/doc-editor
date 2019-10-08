import React from 'react'

import { hooksObserver, inject } from 'app/componentConnectors'
import Loadable from 'app/utils/Loadable'

import { Container, Heading } from '../elements'

const Feedback = Loadable(() =>
  import(/* webpackChunkName: 'feedback' */ './Feedback'),
)

const FeedbackModal = ({ store }) => (
  <Container>
    <Heading>Submit Feedback</Heading>

    <Feedback user={store.user} id={store.editor.currentId}/>
  </Container>
)

export default inject('store')(hooksObserver(FeedbackModal))
