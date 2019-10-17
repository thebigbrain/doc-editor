import Tooltip from '@csb/common/lib/components/Tooltip'
import track from '@csb/common/lib/utils/analytics'
import {getSandboxName} from '@csb/common/lib/utils/get-sandbox-name'
import {ESC} from '@csb/common/lib/utils/keycodes'
import {basename} from 'path'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useSpring, animated} from 'react-spring'

import {
  Container,
  Folder,
  FolderName,
  Form,
  Name,
  NameInput,
  TemplateBadge,
  Main,
} from './elements'
import {useOvermind} from '~/overmind'

export const SandboxName = () => {
  const {
    state: {
      isLoggedIn,
      editor: {currentSandbox},
    },
    actions: {
      modalOpened,
      workspace: {sandboxInfoUpdated, valueChanged},
    }
  } = useOvermind()

  const [updatingName, setUpdatingName] = useState(false)
  const [name, setName] = useState('')

  const sandboxName = getSandboxName(currentSandbox) || 'Untitled'

  const updateSandboxInfo = () => {
    sandboxInfoUpdated()
    setUpdatingName(false)
  }

  const submitNameChange = (e) => {
    e.preventDefault()
    updateSandboxInfo()
    track('Change Sandbox Name From Header')
  }

  const handleNameClick = () => {
    setUpdatingName(true)
    setName(sandboxName)
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === ESC) {
      updateSandboxInfo()
    }
  }

  const handleBlur = () => {
    updateSandboxInfo()
  }

  const handleInputUpdate = (e) => {
    valueChanged({
      field: 'title',
      value: e.target.value,
    })

    setName(e.target.value)
  }

  const value = name !== 'Untitled' && updatingName ? name : ''

  const folderName = currentSandbox.collection
    ? basename(currentSandbox.collection.path) ||
    (currentSandbox.team ? currentSandbox.team.name : 'My Sandboxes')
    : 'My Sandboxes'

  const template = currentSandbox.customTemplate && !updatingName
  const spring = useSpring({
    opacity: updatingName ? 0 : 1,
    pointerEvents: updatingName ? 'none' : 'initial',
  })
  const {customTemplate, owned} = currentSandbox

  return (
    <Main>
      <Container>
        {!customTemplate && owned && (
          <animated.div style={spring}>
            <Folder>
              {isLoggedIn ? (
                <FolderName
                  onClick={() => modalOpened({modal: 'moveSandbox'})}
                >
                  {folderName}
                </FolderName>
              ) : (
                'Anonymous '
              )}
              /{' '}
            </Folder>
          </animated.div>
        )}
        {updatingName ? (
          <Form onSubmit={submitNameChange}>
            <NameInput
              autoFocus
              innerRef={(el) => {
                if (el) {
                  el.focus()
                }
              }}
              onKeyUp={handleKeyUp}
              onBlur={handleBlur}
              onChange={handleInputUpdate}
              placeholder={name}
              value={value}
            />
          </Form>
        ) : (
          <Name owned={owned} onClick={owned ? handleNameClick : null}>
            {sandboxName}
          </Name>
        )}
        {template ? (
          <Tooltip
            interactive
            delay={0}
            placement="bottom"
            content={
              <>
                This sandbox is a template, you can learn about templates in
                the{' '}
                <Link target="_blank" to="/docs/templates">
                  docs
                </Link>
                .
              </>
            }
          >
            <TemplateBadge color={customTemplate.color}>
              Template
            </TemplateBadge>
          </Tooltip>
        ) : null}
      </Container>
    </Main>
  )
}
