import React from 'react'
import filesize from 'filesize'
import {
  Container,
  Description,
  JustifiedArea,
  LoadingAnimationContainer,
  Rule,
  SubDescription,
  SubTitle,
  Title,
} from './elements'
import FilesList from './FilesList/index'
import {withOvermind} from '@muggle/hooks'


class StorageManagementModal extends React.Component {
  render() {
    const { state: store, actions: signals } = this.props.overmind

    const isLoading = store.uploadedFiles === null
    const isEmpty = !isLoading && store.uploadedFiles.length === 0

    return (
      <Container>
        <JustifiedArea>
          <Title>Storage Management</Title>
          <SubTitle>
            Used {filesize(store.usedStorage)}
            {' / '}
            Total {filesize(store.maxStorage)}
          </SubTitle>
        </JustifiedArea>
        <Description>
          This is where you can manage your uploaded files.
        </Description>
        <Rule/>
        {!isEmpty && !isLoading && (
          <FilesList
            files={store.uploadedFiles}
            deleteFile={signals.files.deletedUploadedFile}
            deleteFiles={files =>
              files.map(id => signals.files.deletedUploadedFile({ id }))
            }
            addFilesToSandbox={files =>
              files.map(signals.files.addedFileToSandbox)
            }
            addFileToSandbox={signals.files.addedFileToSandbox}
          />
        )}
        {isEmpty && (
          <SubDescription>You have no uploaded files.</SubDescription>
        )}
        {isLoading && <LoadingAnimationContainer/>}
      </Container>
    )
  }
}

export default withOvermind(StorageManagementModal)
