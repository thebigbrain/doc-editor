import * as React from 'react'
import Margin from '@csb/common/lib/components/spacing/Margin'
import { Button } from '@csb/common/lib/components/Button'

import AutosizeTextArea from '@csb/common/lib/components/AutosizeTextArea'
import Input from '@csb/common/lib/components/Input'
import { useOvermind } from '@muggle/hooks'

import { EmojiButton } from './elements'

const pushToAirtable = () => {};

export default function(props) {
  const { actions } = useOvermind()
  const [state, updateState] = React.useState({
    feedback: '',
    email: (props.user || {}).email,
    emoji: null,
    loading: false,
  })

  function setState(partial) {
    return updateState(Object.assign({}, state, partial))
  }

  const onChange = e => {
    setState({ [e.target.name]: e.target.value })
  }

  const onSubmit = evt => {
    const { id, user } = props
    const { feedback, emoji, email } = state
    evt.preventDefault()

    setState({ loading: true }, () => {
      pushToAirtable({
        sandboxId: id,
        feedback,
        emoji,
        username: (user || {}).username,
        email,
      })
        .then(() => {
          setState(
            {
              feedback: '',
              emoji: null,
              loading: false,
            },
            () => {
              actions.modalClosed()

              actions.notificationAdded({
                message: `Thanks for your feedback!`,
                type: 'success',
              })
            },
          )
        })
        .catch(e => {
          actions.notificationAdded({
            message: `Something went wrong while sending feedback: ${
              e.message
              }`,
            type: 'error',
          })

          setState({ loading: false })
        })
    })
  }

  const setHappy = () => {
    setState({ emoji: 'happy' })
  }

  const setSad = () => {
    setState({ emoji: 'sad' })
  }

  const { feedback, emoji, email } = state
  return (
    <form onSubmit={onSubmit}>
      <AutosizeTextArea
        css={`
            width: 100%;
          `}
        name="feedback"
        value={feedback}
        onChange={onChange}
        placeholder="What are your thoughts?"
        minRows={3}
        required
      />
      {!props.user && (
        <Margin top={0.5}>
          <Input
            css={`
                width: 100%;
              `}
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email if you wish to be contacted"
          />
        </Margin>
      )}

      <Margin
        top={0.5}
        css={`
            display: flex;
            align-items: center;
          `}
      >
        <EmojiButton
          type="button"
          active={emoji === 'happy'}
          onClick={setHappy}
        >
            <span role="img" aria-label="happy">
              😊
            </span>
        </EmojiButton>

        <EmojiButton
          type="button"
          active={emoji === 'sad'}
          onClick={setSad}
        >
            <span role="img" aria-label="sad">
              😞
            </span>
        </EmojiButton>

        <div
          css={`
              flex: 1;
            `}
        >
          <Button
            disabled={state.loading}
            small
            css={`
                float: right;
              `}
          >
            {state.loading ? 'Sending...' : 'Submit'}
          </Button>
        </div>
      </Margin>
    </form>
  )
}
