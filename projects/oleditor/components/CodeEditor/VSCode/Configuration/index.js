import getUI from '@csb/common/lib/templates/configuration/ui';
import theme from '@csb/common/lib/theme';
import { TextOperation } from 'ot';
import React from 'react';
import EntryIcons from '~/pages/Sandbox/Editor/Workspace/Files/DirectoryEntry/Entry/EntryIcons';
import getType from '~/utils/get-type';
import { Container, Description, Title } from './elements';
export class Configuration extends React.PureComponent {
    constructor(props) {
        super(props);
        this.receivingCode = false;
        this.sendLiveChanges = (code) => {
            const { sendTransforms, isLive, onCodeReceived } = this.props;
            if (sendTransforms) {
                const oldCode = this.currentModule.code || '';
                // We don't know exactly what changed, just that the code changed. So
                // we send the whole code.
                const op = new TextOperation();
                op.delete(oldCode.length);
                op.insert(code);
                sendTransforms(op);
            }
            else if (!isLive && onCodeReceived) {
                onCodeReceived();
            }
        };
        this.updateFile = (code) => {
            const { isLive, sendTransforms } = this.props;
            if (isLive && sendTransforms && !this.receivingCode) {
                this.sendLiveChanges(code);
            }
            this.props.onChangeVSCode(code);
        };
        this.registerListeners();
    }
    registerListeners() {
        if (this.props.onDidChangeDirty) {
            this.dirtyChangeListener = this.props.onDidChangeDirty(() => {
                this.forceUpdate();
                this.props.onChange(this.props.getCode(), this.props.currentModule.shortid);
            });
        }
        this.props.onDispose(() => {
            this.dirtyChangeListener.dispose();
        });
    }
    componentDidMount() {
        if (this.props.onInitialized) {
            this.disposeInitializer = this.props.onInitialized(this);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currentModule.id !== this.props.currentModule.id) {
            this.dirtyChangeListener.dispose();
            this.registerListeners();
        }
    }
    componentWillUnmount() {
        if (this.disposeInitializer) {
            this.disposeInitializer();
        }
    }
    render() {
        const { config, width, height, sandbox } = this.props;
        const { currentModule } = this.props;
        const { ConfigWizard } = getUI(config.type);
        return (<Container style={{ width, height }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <EntryIcons width={32} height={32} type={getType(currentModule.title)}/>
          <Title>{config.title}</Title>
        </div>
        <button type="button" style={{
            outline: 0,
            border: 0,
            backgroundColor: 'transparent',
            color: theme.secondary(),
            textDecoration: 'underline',
            margin: 0,
            padding: 0,
            marginTop: '1rem',
            cursor: 'pointer',
        }} tabIndex={-1} onClick={() => this.props.openText()}>
          Open file in editor
        </button>
        <Description>
          {config.description}{' '}
          <a href={config.moreInfoUrl} target="_blank" rel="noreferrer noopener">
            More info...
          </a>
        </Description>

        <ConfigWizard sandbox={sandbox} updateFile={this.updateFile} file={this.props.getCode()}/>
      </Container>);
    }
}
