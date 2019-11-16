import {Button} from '@csb/common/lib/components/Button'
import Input from '@csb/common/lib/components/Input'
import Margin from '@csb/common/lib/components/spacing/Margin'
import track from '@csb/common/lib/utils/analytics'
import React from 'react'

import {WorkspaceInputContainer, WorkspaceSubtitle} from '~/pages/Sandbox/Editor/Workspace/elements'

import {Error} from './elements'
import {useOvermind} from "@muggle/hooks"


export const CreateRepo = ({style,}) => {
  const {
    actions: {
      git: {repoTitleChanged, createRepoClicked},
    },
    state: {
      editor: {isAllModulesSynced},
      git: {repoTitle, error},
    },
  } = useOvermind()

  const updateRepoTitle = ({
                             target: {value: title},
                           }) => repoTitleChanged({title})
  const createRepo = () => {
    track('Export to GitHub Clicked')
    createRepoClicked()
  }

  return (
    <div style={style}>
      {!isAllModulesSynced && (
        <Error>Save your files first before exporting.</Error>
      )}

      {error && <Error>{error}</Error>}

      <WorkspaceSubtitle>Repository Name</WorkspaceSubtitle>

      <WorkspaceInputContainer>
        <Input onChange={updateRepoTitle} value={repoTitle}/>
      </WorkspaceInputContainer>

      <Margin horizontal={1} bottom={1}>
        <Button
          block
          disabled={error || !repoTitle || !isAllModulesSynced}
          onClick={createRepo}
          small
        >
          Create Repository
        </Button>
      </Margin>
    </div>
  )
}
