import React, { Component } from 'react'
import { inject, observer } from 'app/componentConnectors'

import { Button } from '@csb/common/lib/components/Button'
import Row from '@csb/common/lib/components/flex/Row'
import Input, { TextArea } from '@csb/common/lib/components/Input'

import { Container } from '../LiveSessionEnded/elements'
import { Explanation, Heading } from '../elements'

import { Field, Label } from './elements'

class PickSandboxModal extends Component {
  state = {
    title: this.props.store.explore.pickedSandboxDetails.title || '',
    description:
      this.props.store.explore.pickedSandboxDetails.description || '',
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    })

  render() {
    const { signals, store } = this.props
    const { id } = store.explore.pickedSandboxDetails
    const { title, description } = this.state

    return (
      <Container>
        <Heading>Pick this sandbox</Heading>
        <Explanation>
          Please add a title and description to this sandbox if none exists or
          you think you have a better description for it. This title and
          description will be the ones used in the explore page.
        </Explanation>
        <form
          onSubmit={e => {
            e.preventDefault()
            signals.explore.pickSandbox({
              id,
              title,
              description,
            })
          }}
        >
          <Field>
            <Label htmlFor="title">Sandbox name</Label>
            <Input
              style={{
                width: '100%',
              }}
              value={title}
              onChange={this.onChange}
              name="title"
              id="title"
              required
            />
          </Field>
          <Field>
            <Label htmlFor="description">Sandbox Description</Label>
            <TextArea
              style={{
                width: '100%',
              }}
              value={description}
              onChange={this.onChange}
              name="description"
              id="description"
              required
              rows="3"
            />
          </Field>

          <Row justifyContent="space-around">
            <Button type="submit">
              Ship it{' '}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </Button>
            <Button danger onClick={() => signals.modalClosed()}>
              Cancel
            </Button>
          </Row>
        </form>
      </Container>
    )
  }
}

export default inject('signals', 'store')(observer(PickSandboxModal))
