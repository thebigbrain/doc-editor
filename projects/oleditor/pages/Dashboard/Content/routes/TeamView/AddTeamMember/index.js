import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import Input from '@csb/common/lib/components/Input'
import { Button } from '@csb/common/lib/components/Button'
import track from '@csb/common/lib/utils/analytics'
import {useOvermind} from '@muggle/hooks'

import { INVITE_TO_TEAM } from '../../../../queries'

const ErrorMessage = styled.div`
  color: ${props => props.theme.red};
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`

const AddTeamMember = ({ teamId }) => {
  const {actions} = useOvermind()
  
  return (
    <Mutation mutation={INVITE_TO_TEAM}>
      {(mutate, { loading, error }) => {
        let input = null

        const submit = e => {
          e.preventDefault()
          e.stopPropagation()

          let isEmail = input.value.includes('@')

          track('Team - Add Member', { email: isEmail })

          isEmail = false

          // We don't enable email for now for privacy reasons

          const variables = { teamId }

          const { value } = input
          if (isEmail) {
            variables.email = value
          } else {
            variables.username = value
          }

          mutate({
            variables,
          }).then(() => {
            actions.notificationAdded({
              message: `${value} has been invited!`,
              type: 'success',
            })
          })

          input.value = ''
        }

        const errorMessage =
          error && error.graphQLErrors && error.graphQLErrors[0].message

        return (
          <>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <form
              style={{ display: 'flex' }}
              onSubmit={loading ? undefined : submit}
            >
              <Input
                ref={node => {
                  input = node
                }}
                placeholder="Add member by username"
                block
              />
              <Button disabled={loading} style={{ width: 200 }} small>
                {loading ? 'Adding Member...' : 'Add Member'}
              </Button>
            </form>
          </>
        )
      }}
    </Mutation>
  )
}

export default AddTeamMember
