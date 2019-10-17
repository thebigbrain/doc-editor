import React from 'react'
import {animated, Spring, Transition} from 'react-spring/renderprops.cjs'
import {camelizeKeys} from 'humps'
import Preview from '../Preview'
import {profileUrl, protocolAndHost} from '../../utils/url-generator'
import getIcon from '../../templates/icons'
import {
  Author,
  Container,
  Description,
  IconContainer,
  SandboxContainer,
  SandboxInfo,
  SandboxPreviewImage,
  StyledStats,
  Title,
} from './elements'

const Springg = Spring
const Transitionn = Transition
const SandboxIcon = ({template}) => {
  const Icon = getIcon(template)
  return (<IconContainer>
    <Icon/>
  </IconContainer>)
}
export default class FeaturedSandbox extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.state = {
      sandbox: undefined,
      showPreview: false,
    }
    this.fetchedSandboxes = {}
    this.fetchSandbox = (id) => {
      if (this.fetchedSandboxes[id]) {
        return Promise.resolve(this.fetchedSandboxes[id])
      }
      return fetch(`${protocolAndHost()}/api/v1/sandboxes/${id}`)
        .then(x => x.json())
        .then(x => {
          this.fetchedSandboxes[x.data.id] = camelizeKeys(x.data)
          return x.data
        })
    }
    this.setUpPreview = () => {
      setTimeout(() => {
        // Only load it later so everything else can initialize
        this.setState({showPreview: true})
        this.fetchAllFeaturedSandboxes()
      }, 1000)
    }
    this.fetchAllFeaturedSandboxes = () => {
      (this.props.featuredSandboxes || []).forEach(s => {
        this.fetchSandbox(s.sandboxId)
      })
    }
    this.toggleOpen = () => {
      this.props.pickSandbox({
        id: this.state.sandbox.id,
        title: this.props.title,
        description: this.props.description,
        screenshotUrl: this.state.sandbox.screenshotUrl,
      })
    }
  }

  componentDidMount() {
    if (this.props.sandboxId) {
      this.fetchSandbox(this.props.sandboxId).then(sandbox => {
        this.setState({sandbox: camelizeKeys(sandbox)})
        this.setUpPreview()
      })
    }
    else {
      this.setUpPreview()
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.sandboxId !== this.props.sandboxId) {
      this.fetchSandbox(nextProps.sandboxId).then(sandbox => {
        this.setState({sandbox})
      })
    }
  }

  render() {
    const {sandbox = this.props.sandbox} = this.state
    const {title, description, height} = this.props
    return (<Container height={height}>
      <SandboxContainer role="button" onClick={this.toggleOpen}>
        <SandboxInfo>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {sandbox && (<Springg from={{height: 0, opacity: 0, overflow: 'hidden'}} to={{height: 28, opacity: 1}}>
            {style => (<StyledStats style={style} viewCount={sandbox.viewCount} likeCount={sandbox.likeCount}
                                    forkCount={sandbox.forkCount}/>)}
          </Springg>)}
        </SandboxInfo>

        {sandbox && (<Springg native from={{height: 0, opacity: 0, overflow: 'hidden'}} to={{height: 28, opacity: 1}}>
          {style => (<animated.div style={style}>
            {sandbox.author && (<a href={profileUrl(sandbox.author.username)}>
              <Author username={sandbox.author.username} avatarUrl={sandbox.author.avatarUrl}/>
            </a>)}
            <SandboxIcon template={sandbox.template}/>
          </animated.div>)}
        </Springg>)}
      </SandboxContainer>

      {typeof window === 'undefined' ? (<div style={{flex: 1, opacity: 1}}>
        <div style={{
          zIndex: 2,
          height: 48,
          minHeight: 48,
          backgroundColor: '#eee',
        }}/>
        <SandboxPreviewImage>
          <div style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            backgroundImage: `url(${sandbox && sandbox.screenshotUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
            transform: 'scale(1.025, 1.025)',
            filter: 'blur(2px)',
            marginTop: -8,
          }}/>
        </SandboxPreviewImage>
      </div>) : (
        <Transitionn items={this.state.showPreview} from={{flex: 1, opacity: 1}} enter={{opacity: 1, flex: 1}} leave={{
          opacity: 0,
          flex: 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          right: 0,
        }} native>
          {show => show
            ? style => (<animated.div style={style}>
              <Preview sandbox={sandbox} settings={{
                autoCompleteEnabled: true,
                autoDownloadTypes: false,
                codeMirror: false,
                clearConsoleEnabled: true,
                fontSize: 15,
                lineHeight: 1.4,
                lintEnabled: false,
                vimMode: false,
                tabWidth: 2,
                enableLigatures: true,
                forceRefresh: false,
                experimentVSCode: true,
                prettierConfig: false,
                zenMode: true,
              }} isInProjectView/>
            </animated.div>)
            : style => (<animated.div style={style}>
              <div style={{
                zIndex: 2,
                height: 48,
                minHeight: 48,
                backgroundColor: '#eee',
              }}/>
              <SandboxPreviewImage>
                <div style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'white',
                  backgroundImage: `url(${sandbox &&
                  sandbox.screenshotUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPositionX: 'center',
                  transform: 'scale(1.025, 1.025)',
                  filter: 'blur(2px)',
                  marginTop: -8,
                }}/>
              </SandboxPreviewImage>
            </animated.div>)}
        </Transitionn>)}
    </Container>)
  }
}
