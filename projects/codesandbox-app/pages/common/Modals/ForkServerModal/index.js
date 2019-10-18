import React from 'react'
import getTemplateDefinition from '@csb/common/lib/templates'
import { SignInButton } from '~/pages/common/SignInButton'
import {withOvermind} from '@muggle/hooks'

import { Container, Explanation, Heading } from '../elements'

class ForkServerModal extends React.Component {
  UNSAFE_componentWillUpdate() {
    // Which means that the user signed in in the meantime with the intention to
    // fork
    if (this.props.overmind.state.loggedIn) {
      this.props.overmind.actions.editor.forkSandboxClicked()
      this.props.overmind.actions.modalClosed()
    }
  }

  render() {
    const { store } = this.props
    const template =
      store.editor.currentSandbox && store.editor.currentSandbox.template

    const templateDefinition = getTemplateDefinition(template)
    const niceName = (
      <span style={{ color: templateDefinition.color(), fontWeight: 500 }}>
        {templateDefinition.niceName}
      </span>
    )

    return (
      <Container>
        <Heading>Fork {niceName} Sandbox</Heading>
        <Explanation>
          We execute {niceName} sandboxes in a server container. This is still
          in beta, so we require you to sign in before you can fork a {niceName}{' '}
          sandbox.
        </Explanation>

        <SignInButton style={{ marginTop: 12 }}/>
      </Container>
    )
  }
}

export default withOvermind(ForkServerModal)
