// @ts-check
/* eslint-disable react/prefer-stateless-function */
import React from 'react'

import { sandboxUrl } from '@csb/common/lib/utils/url-generator'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { Mutation } from 'react-apollo'
import { Private, TrashIcon, Unlisted } from '@muggle/icons'
import Input from '@csb/common/lib/components/Input'
import getTemplate from '@csb/common/lib/templates'
import theme from '@csb/common/lib/theme'
import track from '@csb/common/lib/utils/analytics'
import { ENTER, ESC } from '@csb/common/lib/utils/keycodes'

import history from '~/utils/history'
import { RENAME_SANDBOX_MUTATION } from '../../queries'
import {
  Container,
  ImageMessage,
  KebabIcon,
  PrivacyIconContainer,
  SandboxDetails,
  SandboxImage,
  SandboxImageContainer,
  SandboxInfo,
  SandboxTitle,
  StyledContextMenu,
} from './elements'

export const DELETE_SANDBOX_DROP_KEY = 'delete'
export const MAKE_TEMPLATE_DROP_KEY = 'makeTemplate'

class SandboxItemComponent extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.state = {
      renamingSandbox: false,
      screenshotUrl: this.props.screenshotUrl,
    }
    this.requestScreenshot = () => {
      this.setState({
        screenshotUrl: `/api/v1/sandboxes/${this.props.id}/screenshot.png`,
      })
    }
    this.getPrivacyIcon = () => {
      if (this.props.privacy === 1) {
        return (<PrivacyIconContainer content="Unlisted Sandbox">
          <Unlisted/>
        </PrivacyIconContainer>)
      }
      if (this.props.privacy === 2) {
        return (<PrivacyIconContainer content="Private Sandbox">
          <Private/>
        </PrivacyIconContainer>)
      }
      return null
    }
    this.getContextItems = () => {
      const { selectedCount } = this.props
      if (this.props.removedAt) {
        return [
          {
            title: selectedCount > 1
              ? `Recover ${selectedCount} Sandboxes`
              : 'Recover Sandbox',
            action: () => {
              this.props.undeleteSandboxes()
              return true
            },
          },
          {
            title: selectedCount > 1
              ? `Delete ${selectedCount} Sandboxes Permanently`
              : 'Delete Permanently',
            action: () => {
              this.props.permanentlyDeleteSandboxes()
              return true
            },
            color: theme.red.darken(0.2)(),
          },
        ]
      }
      if (selectedCount > 1) {
        const items = []
        if (this.props.isPatron) {
          items.push([
            {
              title: `Make ${selectedCount} Sandboxes Public`,
              action: () => {
                this.props.setSandboxesPrivacy(0)
                return true
              },
            },
            {
              title: `Make ${selectedCount} Sandboxes Unlisted`,
              action: () => {
                this.props.setSandboxesPrivacy(1)
                return true
              },
            },
            {
              title: `Make ${selectedCount} Sandboxes Private`,
              action: () => {
                this.props.setSandboxesPrivacy(2)
                return true
              },
            },
          ])
        }
        return [
          ...items,
          [
            {
              title: `Export ${selectedCount} Sandboxes`,
              action: () => {
                this.props.exportSandboxes()
                return true
              },
            },
          ],
          [
            selectedCount < 50 && {
              title: `Make ${selectedCount} Sandboxes a Template`,
              action: () => {
                track('Template - Created', {
                  source: 'Context Menu',
                  count: selectedCount,
                })
                this.props.makeTemplates()
                return true
              },
            },
            {
              title: `Move ${selectedCount} Sandboxes To Trash`,
              action: () => {
                this.props.deleteSandboxes()
                return true
              },
              color: theme.red.darken(0.2)(),
            },
          ],
        ].filter(Boolean)
      }
      return [
        (this.props.page === 'recent' || this.props.page === 'search') && [
          {
            title: 'Show In Folder',
            action: () => {
              if (this.props.collectionTeamId) {
                history.push(`/dashboard/teams/${this.props.collectionTeamId}/sandboxes${this.props.collectionPath}`)
              }
              else {
                history.push(`/dashboard/sandboxes${this.props.collectionPath}`)
              }
            },
          },
        ],
        [
          {
            title: 'Open Sandbox',
            action: this.openSandbox,
          },
          {
            title: 'Open Sandbox in new tab',
            action: () => {
              this.openSandbox(true)
              return true
            },
          },
          {
            title: 'Export Sandbox',
            action: () => {
              this.props.exportSandboxes()
              return true
            },
          },
        ],
        this.props.isPatron &&
        [
          this.props.privacy !== 0 && {
            title: 'Make Sandbox Public',
            action: () => {
              this.props.setSandboxesPrivacy(0)
              return true
            },
          },
          this.props.privacy !== 1 && {
            title: 'Make Sandbox Unlisted',
            action: () => {
              this.props.setSandboxesPrivacy(1)
              return true
            },
          },
          this.props.privacy !== 2 && {
            title: 'Make Sandbox Private',
            action: () => {
              this.props.setSandboxesPrivacy(2)
              return true
            },
          },
        ].filter(Boolean),
        [
          {
            title: `Rename Sandbox`,
            action: () => {
              this.setState({ renamingSandbox: true })
              return true
            },
          },
          {
            title: `Make Sandbox a Template`,
            action: () => {
              track('Template - Created', {
                source: 'Context Menu',
                count: 1,
              })
              this.props.makeTemplates()
              return true
            },
          },
          {
            title: `Move to Trash`,
            action: () => {
              this.props.deleteSandboxes()
              return true
            },
            color: theme.red.darken(0.2)(),
          },
        ],
      ].filter(Boolean)
    }
    this.selectSandbox = (e) => {
      this.props.setSandboxesSelected([this.props.id], {
        additive: 'metaKey' in e ? e.metaKey : false,
        range: 'shiftKey' in e ? e.shiftKey : false,
      })
    }
    this.openSandbox = (openNewWindow = false) => {
      // @ts-ignore Git sandboxes aren't shown here anyway
      const url = sandboxUrl({ id: this.props.id, alias: this.props.alias })
      if (!this.props.removedAt) {
        if (openNewWindow === true) {
          track('Dashboard - Sandbox Opened in a new tab')
          window.open(url, '_blank')
        }
        else {
          history.push(url)
        }
      }
      return true
    }
    this.handleMouseDown = (e) => {
      e.stopPropagation()
      if (!this.props.selected || e.metaKey) {
        this.selectSandbox(e)
      }
    }
    this.handleKeyDown = (e) => {
      if (e.keyCode === ENTER) {
        track('Dashboard - Sandbox Opened With Enter')
        // enter
        this.openSandbox()
      }
    }
    this.handleOnContextMenu = (e) => {
      track('Dashboard - Sandbox Context Menu Opened')
      if (!this.props.selected) {
        this.selectSandbox(e)
      }
    }
    this.handleOnFocus = (e) => {
      if (!this.props.selected) {
        this.selectSandbox(e)
      }
    }
    this.handleOnBlur = (e) => {
      if (this.props.selected && e.bubbles) {
        this.props.setSandboxesSelected([])
      }
    }
    this.getImageMessage = () => {
      if (this.props.removedAt) {
        return (<TrashIcon style={{
          fontSize: '3rem',
        }}/>)
      }
      if (this.props.privacy === 2) {
        return (<Private style={{
          fontSize: '3rem',
        }}/>)
      }
      const templateDefinition = getTemplate(this.props.template)
      if (templateDefinition.isServer) {
        return `Container Sandbox`
      }
      if (process.env.STAGING) {
        return `Staging Sandbox`
      }
      return `Generating Screenshot...`
    }
    this.hasScreenshot = () => {
      const templateDefinition = getTemplate(this.props.template)
      if (templateDefinition.isServer) {
        return false
      }
      return !this.props.removedAt && this.props.privacy !== 2
    }
  }

  checkScreenshot() {
    if (!this.state.screenshotUrl && this.hasScreenshot()) {
      // We only request the screenshot if the sandbox card is in view for > 1 second
      this.screenshotTimeout = window.setTimeout(() => {
        this.requestScreenshot()
      }, 1000)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ screenshotUrl: nextProps.screenshotUrl }, () => {
        this.checkScreenshot()
      })
    }
  }

  componentDidMount() {
    if (this.props.selected) {
      if (this.el &&
        typeof this.el.focus === 'function' &&
        !this.props.isScrolling()) {
        this.el.focus()
      }
    }
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      })
    }
    this.checkScreenshot()
  }

  componentWillUnmount() {
    if (this.screenshotTimeout) {
      clearTimeout(this.screenshotTimeout)
    }
  }

  render() {
    const { style, id, title, details, color, template, connectDragSource, isDraggingItem, selected } = this.props
    const { screenshotUrl } = this.state
    const templateInfo = getTemplate(template)
    return (
      <StyledContextMenu style={style} isDraggingItem={isDraggingItem} id={id} childFunction className="sandbox-item"
                         items={this.getContextItems()}>
        {onContextMenu => connectDragSource(<div style={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: selected ? theme.secondary() : 'transparent',
        }}>
          <Container style={{ outline: 'none' }} onMouseDown={this.handleMouseDown} onContextMenu={e => {
            onContextMenu(e)
            this.handleOnContextMenu(e)
          }} onDoubleClick={event => {
            // check for cmd click
            const cmd = event.ctrlKey || event.metaKey
            this.openSandbox(Boolean(cmd))
          }} onBlur={this.handleOnBlur} onFocus={this.handleOnFocus} onKeyDown={this.handleKeyDown} ref={el => {
            this.el = el
          }} role="button" tabIndex={0}>
            <SandboxImageContainer>
              <ImageMessage>{this.getImageMessage()}</ImageMessage>

              {this.hasScreenshot() && (<SandboxImage style={{
                backgroundImage: `url(${screenshotUrl})`,
              }}/>)}
            </SandboxImageContainer>
            <SandboxInfo>
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: 2,
                height: '100%',
                backgroundColor: color || templateInfo.color(),
              }}/>
              <div style={{ flex: 1 }}>
                <div>
                  {this.state.renamingSandbox ? (<Mutation mutation={RENAME_SANDBOX_MUTATION}>
                    {mutate => {
                      let input = null
                      const saveName = () => {
                        this.setState({ renamingSandbox: false })
                        if (input.value !== title) {
                          mutate({
                            variables: {
                              title: input.value,
                              id: this.props.id,
                            },
                            optimisticResponse: {
                              __typename: 'Mutation',
                              renameSandbox: {
                                __typename: 'Sandbox',
                                ...this.props.sandbox,
                                title: input.value,
                              },
                            },
                          })
                        }
                      }
                      return (<Input ref={node => {
                        input = node
                        if (node) {
                          node.select()
                        }
                      }} onKeyDown={e => {
                        if (e.keyCode === ENTER) {
                          e.preventDefault()
                          e.stopPropagation()
                          saveName()
                        }
                        else if (e.keyCode === ESC) {
                          e.preventDefault()
                          e.stopPropagation()
                          this.setState({ renamingSandbox: false })
                        }
                      }} onBlur={saveName} block defaultValue={title}/>)
                    }}
                  </Mutation>) : (<SandboxTitle>
                    {title} {this.getPrivacyIcon()}
                  </SandboxTitle>)}
                </div>
                <SandboxDetails>{details}</SandboxDetails>
              </div>
              <KebabIcon onClick={onContextMenu}/>
            </SandboxInfo>
          </Container>
        </div>)}
      </StyledContextMenu>)
  }
}

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    track('Dashboard - Sandbox Dragged')
    props.setDragging({ isDragging: true })
    return {
      left: props.style.left,
      top: props.style.top,
      id: props.id,
      collectionPath: props.collectionPath,
      collectionTeamId: props.collectionTeamId,
      removedAt: props.removedAt,
    }
  },
  endDrag(props, monitor) {
    props.setDragging({ isDragging: false })
    const result = monitor.getDropResult()
    if (result && result[DELETE_SANDBOX_DROP_KEY]) {
      props.deleteSandboxes()
    }
    if (result && result[MAKE_TEMPLATE_DROP_KEY]) {
      track('Template - Created', {
        source: 'Dragging',
        team: !!result.teamId,
      })
      props.makeTemplates(result.teamId)
    }
  },
}

/**
 * Specifies the props to inject into your component.
 */
function collect(connect) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  }
}

export const SandboxItem = DragSource('SANDBOX', cardSource, collect)(SandboxItemComponent)
