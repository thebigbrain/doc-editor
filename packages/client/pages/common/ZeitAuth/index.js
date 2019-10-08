import React from 'react'
import Centered from '@codesandbox/common/lib/components/flex/Centered'
import { newSandboxUrl, protocolAndHost, signInUrl } from '@codesandbox/common/lib/utils/url-generator'
import { Title } from 'app/components/Title'

// eslint-disable-next-line import/no-default-export
export default class ZeitSignIn extends React.PureComponent {
  getMessage = () => {
    if (this.state.redirect) {
      document.location.href = newSandboxUrl()
      return 'Redirecting to sandbox page'
    }
    if (this.state.error) {
      return `Something went wrong while signing in: ${this.state.error}`
    }
    if (this.state.jwt) return 'Signing in...'
    if (this.state.jwt == null) {
      setTimeout(() => {
        document.location.href = signInUrl()
      }, 2000)
      return 'Redirecting to sign in page...'
    }

    return 'Hey'
  }

  constructor(props) {
    super(props)

    // eslint-disable-next-line no-unused-vars
    const [_, code] = document.location.search.match(/\?code=(.*)/)

    if (code) {
      if (window.opener) {
        if (window.opener.location.origin === window.location.origin) {
          window.opener.postMessage(
            {
              type: 'signin',
              data: {
                code,
              },
            },
            protocolAndHost(),
          )
        }
        return
      }
      this.state = {
        redirect: '/',
      }
      return
    }

    this.state = {
      error: 'no message received',
    }
  }

  render() {
    return (
      <Centered horizontal vertical>
        <Title>{this.getMessage()}</Title>
      </Centered>
    )
  }
}
