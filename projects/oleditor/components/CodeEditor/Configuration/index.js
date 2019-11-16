import React from 'react'
import { TextOperation } from 'ot'
import getUI from '@csb/common/lib/templates/configuration/ui'
import getType from '~/utils/get-type'
import EntryIcons from '~/pages/Sandbox/Editor/Workspace/Files/DirectoryEntry/Entry/EntryIcons'
import Tooltip from '@csb/common/lib/components/Tooltip'
import {
  MdCode as CodeIcon
} from 'react-icons/md'
import { Container, Description, Icon, Title } from './elements'

export class Configuration extends React.PureComponent {
  constructor(props) {
    super(props)

    this.receivingCode = false
    // eslint-disable-next-line
    this.changeCode = (code) => {
      this.forceUpdate()
    }
    this.setReceivingCode = (receiving) => {
      this.receivingCode = receiving
    }
    this.sendLiveChanges = (code) => {
      const { sendTransforms, isLive, onCodeReceived } = this.props
      if (sendTransforms) {
        const oldCode = this.currentModule.code || ''
        // We don't know exactly what changed, just that the code changed. So
        // we send the whole code.
        const op = new TextOperation()
        op.delete(oldCode.length)
        op.insert(code)
        sendTransforms(op)
      }
      else if (!isLive && onCodeReceived) {
        onCodeReceived()
      }
    }
    this.changeModule = (newModule) => {
      this.currentModule = newModule
    }
    this.updateFile = (code) => {
      const { isLive, sendTransforms } = this.props
      if (isLive && sendTransforms && !this.receivingCode) {
        this.sendLiveChanges(code)
      }
      this.props.onChange(code)
    }
    this.currentModule = props.currentModule
  }

  componentDidMount() {
    if (this.props.onInitialized) {
      this.disposeInitializer = this.props.onInitialized(this)
    }
  }

  componentWillUnmount() {
    if (this.disposeInitializer) {
      this.disposeInitializer()
    }
  }

  render() {
    const { config, width, height, sandbox } = this.props
    const { currentModule } = this
    const { ConfigWizard } = getUI(config.type)
    return (<Container style={{ width, height }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <EntryIcons width={32} height={32} type={getType(currentModule.title)}/>
        <Title>{config.title}</Title>

        <Tooltip content="Show Code">
          <Icon onClick={this.props.toggleConfigUI}>
            <CodeIcon/>
          </Icon>
        </Tooltip>
      </div>
      <Description>
        {config.description}{' '}
        <a href={config.moreInfoUrl} target="_blank" rel="noreferrer noopener">
          More info...
        </a>
      </Description>

      <ConfigWizard sandbox={sandbox} updateFile={this.updateFile} file={currentModule.code}/>
    </Container>)
  }
}
