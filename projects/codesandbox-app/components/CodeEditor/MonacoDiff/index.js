import React from 'react'

import MonacoReactComponent from '../Monaco/MonacoReactComponent'
import defineTheme from '../Monaco/define-theme'

import {CodeContainer, Container} from '../Monaco/elements'
import getSettings from '../Monaco/settings'
import getMode from '../Monaco/mode'


export default class MonacoDiff extends React.Component {
  editor
  monaco
  sizeProbeInterval // eslint-disable-line no-undef
  settings
  resizeEditor = () => {
    this.forceUpdate(() => {
      this.editor.layout()
    })
  }

  constructor(props) {
    super(props)

    this.settings = props.settings
  }

  setDiff = async (
    originalCode,
    modifiedCode,
    title,
  ) => {
    const mode = (await getMode(title, this.monaco)) || 'typescript'
    const originalModel = this.monaco.editor.createModel(originalCode, mode)
    const modifiedModel = this.monaco.editor.createModel(modifiedCode, mode)

    this.editor.setModel({
      original: originalModel,
      modified: modifiedModel,
    })
  }

  configureEditor = async (editor, monaco) => {
    this.editor = editor
    this.monaco = monaco

    await this.setDiff(
      this.props.originalCode,
      this.props.modifiedCode,
      this.props.title || '',
    )

    window.addEventListener('resize', this.resizeEditor)

    this.resizeEditor()
    this.sizeProbeInterval = setInterval(this.resizeEditor.bind(this), 3000)
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (
      this.props.originalCode !== nextProps.originalCode ||
      this.props.modifiedCode !== nextProps.modifiedCode
    ) {
      this.setDiff(
        nextProps.originalCode,
        nextProps.modifiedCode,
        nextProps.title,
      )
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEditor)
    clearInterval(this.sizeProbeInterval)
  }

  render() {
    return (
      <Container>
        <CodeContainer>
          <MonacoReactComponent
            diffEditor
            theme="CodeSandbox"
            editorWillMount={defineTheme}
            editorDidMount={this.configureEditor}
            options={getSettings(this.settings)}
          />
        </CodeContainer>
      </Container>
    )
  }
}
