import React, { Component } from 'react'
import { isEmpty, sortBy } from 'lodash-es'
import filesize from 'filesize'
import { Button } from '@csb/common/lib/components/Button'
import DeleteFileButton from '../DeleteFileButton/index'
import AddFileToSandboxButton from '../AddFileToSandboxButton/index'
import { Body, Buttons, CheckBox, FileRow, HeaderTitle, StatBody, Table } from './elements'

const someSelected = obj =>
  Object.keys(obj).filter(key => obj[key] === true) && !isEmpty(obj)

class FilesList extends Component {
  state = {}

  toggleCheckbox = (e, id) => {
    this.setState(state => ({
      [id]: !state[id],
    }))
  }

  getSelection = () => {
    const selectedIds = Object.keys(this.state)
    const selected = this.props.files.filter(file =>
      selectedIds.includes(file.id),
    )
    return selected
  }

  render() {
    const {
      files,
      deleteFile,
      addFileToSandbox,
      deleteFiles,
      addFilesToSandbox,
    } = this.props
    return (
      <div css={{ margin: '0 2rem' }}>
        {someSelected(this.state) ? (
          <Buttons>
            <Button small onClick={() => deleteFiles(Object.keys(this.state))}>
              Delete all selected
            </Button>
            <Button
              small
              onClick={() => addFilesToSandbox(this.getSelection())}
            >
              Add all selected to project
            </Button>
          </Buttons>
        ) : null}
        <Table>
          <thead>
          <tr
            css={`
                height: 3rem;
              `}
          >
            <HeaderTitle
              css={`
                  padding-left: 1rem;
                  max-width: 20px;
                `}
            />
            <HeaderTitle>File</HeaderTitle>
            <HeaderTitle>Size</HeaderTitle>
            <HeaderTitle/>
            <HeaderTitle/>
            <HeaderTitle/>
          </tr>
          </thead>
          <Body>
          {sortBy(files, 'name').map((f, i) => (
            <FileRow index={i} key={f.id}>
              <td>
                <CheckBox
                  name={f.id}
                  onClick={e => this.toggleCheckbox(e, f.id)}
                  selected={this.state[f.id]}
                />
              </td>
              <td
                css={`
                    max-width: 100;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  `}
                title={f.name}
              >
                <a target="_blank" rel="noreferrer noopener" href={f.url}>
                  {f.name}
                </a>
              </td>
              <td>{filesize(f.objectSize)}</td>
              <StatBody
                css={`
                    padding: 0.55rem 0.5rem;
                    cursor: pointer;
                  `}
              >
                <AddFileToSandboxButton
                  url={f.url}
                  name={f.name}
                  onAddFileToSandbox={addFileToSandbox}
                />
              </StatBody>
              <StatBody
                css={`
                    padding: 0.55rem 0.5rem;
                    cursor: pointer;
                  `}
              >
                <DeleteFileButton id={f.id} onDelete={deleteFile}/>
              </StatBody>
            </FileRow>
          ))}
          </Body>
        </Table>
      </div>
    )
  }
}

export default FilesList
