import React from 'react'
// import Files from 'embed/components/Files'
import QRCode from 'qrcode.react'
import { getSandboxName } from '@codesandbox/common/lib/utils/get-sandbox-name'
import track from '@codesandbox/common/lib/utils/analytics'
import { Button } from '@codesandbox/common/lib/components/Button'
import { sandboxUrl } from '@codesandbox/common/lib/utils/url-generator'
import Title from './Title'
import {withOvermind} from '@doce/hooks'

import {
  ButtonContainer,
  FilesContainer,
  Inputs,
  LinkName,
  PaddedPreference,
  ShareOptions,
  SideTitle,
  Wrapper,
} from './elements'

import {
  BUTTON_URL,
  getButtonHTML,
  getButtonMarkdown,
  getEditorUrl,
  getEmbedUrl,
  getIframeScript,
  VIEW_OPTIONS,
} from './getCode'

class ShareView extends React.Component {
  state = {
    view: VIEW_OPTIONS[0],
    testsView: false,
    defaultModule: null,
    autoResize: false,
    hideNavigation: false,
    isCurrentModuleView: false,
    fontSize: 14,
    initialPath: '',
    useCodeMirror: false,
    enableEslint: false,
    expandDevTools: false,
  }
  handleChange = e => this.setState({ message: e.target.value })
  handleSend = () => {
    if (this.state.message !== '') {
      this.toggle()
      this.props.sendMessage(this.state.message)
      this.setState({ message: '' })
    }
  }
  setEditorView = () => this.setState({ showEditor: true, showPreview: false })
  setPreviewView = () =>
    this.setState({ showEditor: false, showPreview: true })
  setMixedView = () => this.setState({ showEditor: true, showPreview: true })
  setDefaultModule = id => this.setState({ defaultModule: id })
  clearDefaultModule = () => this.setState({ defaultModule: null })
  setAutoResize = (autoResize) => {
    this.setState({ autoResize })
  }
  setHideNavigation = (hideNavigation) => {
    this.setState({ hideNavigation })
  }
  setUseCodeMirror = (useCodeMirror) => {
    this.setState({ useCodeMirror })
  }
  setEnableEslint = (enableEslint) => {
    this.setState({ enableEslint })
  }
  setIsCurrentModuleView = (isCurrentModuleView) => {
    this.setState({ isCurrentModuleView })
  }
  setExpandDevTools = (expandDevTools) => {
    this.setState({ expandDevTools })
  }
  setFontSize = (fontSize) => [this.setState({ fontSize })]
  setTestsView = (testsView) => {
    this.setState({ testsView })
  }
  setInitialPath = ({ target }) => {
    const initialPath = target.value
    this.setState({ initialPath })
  }
  setView = (view) => {
    this.setState({ view })
  }
  select = function select(event) {
    event.target.select()
  }
  toggle = (key) => {
    this.setState(state => ({ [key]: !state[key] }))
  }

  componentDidMount() {
    track('Share Modal Opened', {})
  }

  render() {
    const sandbox = this.props.overmind.state.editor.currentSandbox
    const { mainModule } = this.props.overmind.state.editor

    const {
      view,
      testsView,
      autoResize,
      hideNavigation,
      isCurrentModuleView,
      fontSize,
      initialPath,
      useCodeMirror,
      enableEslint,
      expandDevTools,
    } = this.state

    const defaultModule = this.state.defaultModule || mainModule.id

    return (
      <>
        <header
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{
            __html: getIframeScript(sandbox, mainModule, this.state),
          }}
        />

        <ShareOptions>
          <Wrapper>
            <section>
              <SideTitle>Configure</SideTitle>
              <Title title="Appearance">
                <PaddedPreference
                  title="Default View"
                  type="dropdown"
                  options={VIEW_OPTIONS}
                  value={view}
                  setValue={this.setView}
                />
                <PaddedPreference
                  title="Auto resize"
                  type="boolean"
                  tooltip="Works only on Medium"
                  value={autoResize}
                  setValue={this.setAutoResize}
                />
                <PaddedPreference
                  title="Hide navigation bar"
                  type="boolean"
                  value={hideNavigation}
                  setValue={this.setHideNavigation}
                />
                <PaddedPreference
                  title="Expand console"
                  type="boolean"
                  value={expandDevTools}
                  setValue={this.setExpandDevTools}
                />
                <PaddedPreference
                  title="Show current module view"
                  type="boolean"
                  tooltip="Only show the module that's currently open"
                  value={isCurrentModuleView}
                  setValue={this.setIsCurrentModuleView}
                />
                <PaddedPreference
                  title="Show Tests (instead of browser preview)"
                  type="boolean"
                  value={testsView}
                  setValue={this.setTestsView}
                />
                <PaddedPreference
                  title="Font size"
                  type="number"
                  value={fontSize}
                  setValue={this.setFontSize}
                />
              </Title>
              <Title title="Sandbox Options">
                <PaddedPreference
                  title="Use CodeMirror instead of Monaco editor"
                  type="boolean"
                  value={useCodeMirror}
                  setValue={this.setUseCodeMirror}
                />
                <PaddedPreference
                  title="Enable eslint (significantly higher bundle size)"
                  type="boolean"
                  value={enableEslint}
                  setValue={this.setEnableEslint}
                />
                <div>
                  {/* eslint-disable-next-line */}
                  <h4>Default module to show</h4>

                  <FilesContainer>
                    {/*<Files*/}
                      {/*modules={sandbox.modules}*/}
                      {/*directoryId={null}*/}
                      {/*directories={sandbox.directories}*/}
                      {/*currentModule={defaultModule}*/}
                      {/*setCurrentModule={this.setDefaultModule}*/}
                    {/*/>*/}
                  </FilesContainer>
                </div>
              </Title>
              <Title title="Other Options">
                <Inputs>
                  <LinkName>Project Initial Path</LinkName>
                  <input
                    onFocus={this.select}
                    placeholder="e.g: /home"
                    value={initialPath}
                    onChange={this.setInitialPath}
                  />
                </Inputs>
              </Title>
            </section>
            <section>
              <SideTitle>Share</SideTitle>
              <Title title="Share embed" open>
                <Inputs>
                  <LinkName>Editor url (also works on Medium)</LinkName>
                  <input
                    onFocus={this.select}
                    value={getEditorUrl(sandbox, mainModule, this.state)}
                    readOnly
                  />
                </Inputs>
                <Inputs>
                  <LinkName>Embed url</LinkName>
                  <input
                    onFocus={this.select}
                    value={getEmbedUrl(sandbox, mainModule, this.state)}
                    readOnly
                  />
                </Inputs>
                <Inputs>
                  <LinkName>iframe</LinkName>
                  <textarea
                    onFocus={this.select}
                    value={getIframeScript(sandbox, mainModule, this.state)}
                    readOnly
                  />
                </Inputs>
              </Title>
              <Title title="Share CodeSandbox Button">
                <Inputs>
                  <ButtonContainer>
                    <a href={sandboxUrl(sandbox)}>
                      <img alt={getSandboxName(sandbox)} src={BUTTON_URL}/>
                    </a>
                  </ButtonContainer>
                </Inputs>
                <Inputs>
                  <LinkName>Markdown</LinkName>
                  <textarea
                    onFocus={this.select}
                    value={getButtonMarkdown(sandbox, mainModule, this.state)}
                    readOnly
                  />
                </Inputs>
                <Inputs>
                  <LinkName>HTML</LinkName>
                  <textarea
                    onFocus={this.select}
                    value={getButtonHTML(sandbox, mainModule, this.state)}
                    readOnly
                  />
                </Inputs>
              </Title>
              <Title title="Share QR code">
                <Inputs>
                  <QRCode
                    value={getEmbedUrl(sandbox, mainModule, this.state)}
                    size="100%"
                    renderAs="svg"
                  />
                </Inputs>
              </Title>
              <Title title="Share on Social Media">
                <Inputs
                  style={{
                    margin: '20px 0',
                  }}
                >
                  <Button
                    small
                    target="_blank"
                    href={`https://dev.to/new?prefill=---%5Cn%20title:${encodeURIComponent(
                      sandbox.title || sandbox.id,
                    )}%5Cn%20published:%20false%5Cn%20tags:%20codesandbox%5Cn%20---%5Cn%20%5Cn%20%5Cn%20%5Cn%20%7B%25%20codesandbox%20${encodeURIComponent(
                      sandbox.id,
                    )}%20%25%7D`}
                  >
                    Share on DEV
                  </Button>
                  <Button
                    style={{ marginLeft: '1em' }}
                    small
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `${sandbox.title || sandbox.id}. ${getEditorUrl(
                        sandbox,
                        mainModule,
                        this.state,
                      )}`,
                    )}`}
                  >
                    Share on Twitter
                  </Button>
                </Inputs>
              </Title>
            </section>
          </Wrapper>
        </ShareOptions>
      </>
    )
  }
}

export default withOvermind(ShareView)
