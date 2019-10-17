import React from 'react'

import { Container, Explanation, Heading } from '../elements'

function LiveVersionMismatch() {
  return (
    <Container>
      <Heading>Version Mismatch</Heading>
      <Explanation>
        You are running an older version of CodeSandbox. Refresh to get the
        latest version.
        <p>
          If refreshing doesn
          {'\''}t work, you can try to clear your storage and unregister the
          service worker.
        </p>
      </Explanation>
    </Container>
  )
}

export default LiveVersionMismatch
