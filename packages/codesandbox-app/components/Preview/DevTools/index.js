import React from 'react'
import {Elastic, TweenMax} from 'gsap'
import {FaAngleUp} from 'react-icons/fa'
import store from 'store/dist/store.modern'
import track from '@codesandbox/common/lib/utils/analytics'
import {DevToolTabs} from './Tabs/index'
import {Container, ContentContainer, Header} from './elements'

function unFocus(document, window) {
  if (document.selection) {
    // $FlowIssue
    document.selection.empty();
  } else {
    try {
      window.getSelection().removeAllRanges();
      // eslint-disable-next-line no-empty
    } catch {
    }
  }
}

function normalizeTouchEvent(
  event
) {
  // @ts-ignore
  return {
    ...event,
    clientX: event.touches[0].clientX,
    clientY: event.touches[0].clientY,
  };
}

export class DevTools extends React.PureComponent {
  node
  closedHeight = () => (this.props.primary ? 35 : 28)
  allViews

  constructor(props) {
    super(props)

    const isOpen = Boolean(props.viewConfig.open)

    this.allViews = props.addedViews
      ? {...VIEWS, ...props.addedViews}
      : VIEWS

    this.state = {
      status: {},

      mouseDown: false,
      startY: 0,
      startHeight: 0,
      height: isOpen ? '40%' : this.closedHeight(),

      hidden: !props.primary && !isOpen,

      currentTabIndex: 0,
    }
  }

  getCurrentPane = () =>
    this.props.viewConfig.views[this.state.currentTabIndex]

  /**
   * Set the current tab based on whether the selection has changed to the current
   * devtools
   */
  static getDerivedStateFromProps(props, state) {
    if (props.devToolIndex === props.currentDevToolIndex) {
      return {
        currentTabIndex: Math.min(
          props.currentTabPosition,
          props.viewConfig.views.length - 1,
        ),
      }
    }

    // Prevent selecting the last tab
    if (state.currentTabIndex > props.viewConfig.views.length - 1) {
      return {currentTabIndex: props.viewConfig.views.length - 1}
    }

    return null
  }

  normalizeHeight = (el) => {
    if (typeof this.state.height === 'string') {
      const { height } = el.getBoundingClientRect();

      this.setState({ height });
    }
  };

  /**
   * This stops the propagation of the mousewheel event so the editor itself cannot
   * block it to prevent gesture scrolls. Without this scrolling won't work in the
   * console.
   */
  mouseWheelHandler = (e) => {
    e.stopPropagation();
  };

  setHidden = (hidden) => {
    if (!hidden) {
      return this.setState(state => ({
        status: {
          ...state.status,
          [this.getCurrentPane().id]: null,
        },
        hidden: false,
      }));
    }

    return this.setState({ hidden }, () => {
      if (this.props.setDevToolsOpen) {
        const { setDevToolsOpen } = this.props;
        setTimeout(() => setDevToolsOpen(!this.state.hidden), 100);
      }
    });
  };

  updateStatus = (id) => (
    status,
    count,
  ) => {
    if (!this.state.hidden && this.getCurrentPane().id === id) {
      return;
    }

    const currentStatus = (status !== 'clear' && this.state.status[id]) || {
      unread: 0,
      type: 'info',
    };
    let newStatus = currentStatus.type;

    if (
      status === 'success' &&
      (newStatus !== 'error' && newStatus !== 'warning')
    ) {
      newStatus = 'success';
    } else if (status === 'warning' && newStatus !== 'error') {
      newStatus = 'warning';
    } else if (status === 'error') {
      newStatus = 'error';
    }

    let unread = currentStatus.unread + (status !== 'clear' ? 1 : 0);

    if (count != null) {
      unread = count;
    }

    this.setState(state => ({
      status: {
        ...state.status,
        [id]: {
          type: newStatus,
          unread,
        },
      },
    }));
  };

  handleTouchStart = (event) => {
    if (event.touches && event.touches.length) {
      this.handleMouseDown(normalizeTouchEvent(event));
    }
  };

  handleMouseDown = (
    event,
  ) => {
    if (!this.state.mouseDown && typeof this.state.height === 'number') {
      unFocus(document, window);
      // @ts-ignore
      this.setState(state => ({
        startY: event.clientY,
        startHeight: state.height,
        mouseDown: true,
      }));
      if (this.props.setDragging) {
        this.props.setDragging(true);
      }
    }
  };
  handleClick = () => {
    this.openDevTools()
  }

  handleTouchEnd = (event) => {
    this.handleMouseUp(event);
  };
  openDevTools = () => {
    this.setHidden(false)
    const heightObject = {height: this.state.height}
    if (this.props.setDevToolsOpen) {
      this.props.setDevToolsOpen(true)
    }
    TweenMax.to(heightObject, 0.3, {
      height: store.get('devtools.height') || 300,
      onUpdate: () => {
        this.setState(heightObject)
      },
      ease: Elastic.easeOut.config(0.25, 1),
    })
  }
  hideDevTools = () => {
    this.setHidden(true)
    const heightObject = {height: this.state.height}
    if (this.props.setDevToolsOpen) {
      this.props.setDevToolsOpen(false)
    }
    TweenMax.to(heightObject, 0.3, {
      height: this.closedHeight(),
      onUpdate: () => {
        this.setState(heightObject)
      },
      ease: Elastic.easeOut.config(0.25, 1),
    })
  }

  handleMouseUp = (e) => {
    if (this.state.mouseDown) {
      this.setState({ mouseDown: false });
      if (this.props.setDragging) {
        this.props.setDragging(false);
      }

      if (
        typeof this.state.height === 'number' &&
        Math.abs(this.state.startHeight - this.state.height) < 30 &&
        this.state.hidden
      ) {
        e.preventDefault();
        e.stopPropagation();
        this.handleClick();
      } else {
        setTimeout(() => {
          const { height } = this.state;
          if (height > 64) {
            store.set('devtools.height', height);
          }
        }, 50);
      }
    }
  };

  handleTouchMove = (event) => {
    if (event.touches && event.touches.length) {
      this.handleMouseMove(normalizeTouchEvent(event));
    }
  };

  handleMouseMove = (
    event,
  ) => {
    if (this.state.mouseDown) {
      let maxHeight = 0;
      if (this.node) {
        maxHeight = this.node.parentElement.getBoundingClientRect().height;
      }

      const newHeight = Math.min(
        maxHeight,
        this.state.startHeight - (event.clientY - this.state.startY),
      );

      this.setState({
        height: Math.max(this.closedHeight() - 2, newHeight),
      });
      this.setHidden(newHeight < 64);
    }
  };

  handleMinimizeClick = (e) => {
    if (!this.state.hidden) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        this.hideDevTools();
      });
    }
  };

  setPane = (index) => {
    if (this.state.hidden && !this.props.primary) {
      this.openDevTools();
    }
    const pane = this.props.viewConfig.views[index];
    if (pane) {
      track('DevTools - Open Pane', { pane: pane.id });
    }

    this.props.setPane({
      devToolIndex: this.props.devToolIndex,
      tabPosition: index,
    });
    this.setState(state => ({
      status: {
        ...state.status,
        [this.props.viewConfig.views[index].id]: {
          type: 'info',
          unread: 0,
        },
      },
    }));
  };

  getViews = () => this.allViews

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.devToolsOpen !== prevProps.devToolsOpen &&
      prevState.hidden === this.state.hidden
    ) {
      if (this.props.devToolsOpen === true && this.state.hidden) {
        this.openDevTools();
      } else if (this.props.devToolsOpen === false && !this.state.hidden) {
        this.hideDevTools();
      }
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp, false);
    document.addEventListener('mousemove', this.handleMouseMove, false);
    document.addEventListener('touchend', this.handleTouchEnd, false);
    document.addEventListener('touchmove', this.handleTouchMove, false);

    if (this.node) {
      this.node.addEventListener('mousewheel', this.mouseWheelHandler);
    }

    if (this.props.shouldExpandDevTools) {
      this.openDevTools();
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-unused-vars
    this.updateStatus = (title) => (
      type,
      count,
    ) => {
    };
    document.removeEventListener('mouseup', this.handleMouseUp, false);
    document.removeEventListener('mousemove', this.handleMouseMove, false);
    document.removeEventListener('touchend', this.handleTouchEnd, false);
    document.removeEventListener('touchmove', this.handleTouchMove, false);

    if (this.node) {
      this.node.removeEventListener('mousewheel', this.mouseWheelHandler);
    }
  }

  render() {
    const {
      hideTabs,
      sandboxId,
      owned,
      primary,
      viewConfig,
      devToolIndex,
    } = this.props;
    const { hidden, height } = this.state;

    const panes = viewConfig.views;

    return (
      <Container
        ref={el => {
          this.node = el || this.node;

          if (this.node) {
            this.normalizeHeight(this.node);
          }
        }}
        style={{
          flex: primary
            ? '1 1 0'
            : `0 0 ${height}${typeof height === 'number' ? 'px' : ''}`,
          minHeight: 0,
        }}
      >
        {!hideTabs && (
          <Header
            onTouchStart={!primary ? this.handleTouchStart : undefined}
            onMouseDown={!primary ? this.handleMouseDown : undefined}
            primary={primary}
            open={!this.state.hidden}
          >
            <DevToolTabs
              owned={owned}
              panes={panes}
              views={this.getViews()}
              currentPaneIndex={this.state.currentTabIndex}
              hidden={hidden}
              setPane={this.setPane}
              devToolIndex={devToolIndex}
              status={this.state.status}
              moveTab={
                this.props.moveTab
                  ? (prevPos, nextPos) => {
                    track('DevTools - Move Pane', {
                      pane: this.props.viewConfig.views[prevPos.tabPosition]
                        .id,
                    });
                    this.props.moveTab(prevPos, nextPos);
                  }
                  : undefined
              }
              closeTab={this.props.closeTab}
            />

            {!primary && (
              <FaAngleUp
                onMouseDown={hidden ? undefined : this.handleMinimizeClick}
                style={{
                  alignSelf: 'center',
                  transform: hidden ? `rotateZ(0deg)` : `rotateZ(180deg)`,
                  cursor: 'pointer',
                }}
              />
            )}
          </Header>
        )}
        <ContentContainer>
          {panes.map((view, i) => {
            const { Content } = this.getViews()[view.id];

            return (
              <Content
                key={view.id + JSON.stringify(view.options)}
                owned={owned}
                hidden={hidden || i !== this.state.currentTabIndex}
                updateStatus={this.updateStatus(view.id)}
                sandboxId={sandboxId}
                openDevTools={this.openDevTools}
                hideDevTools={this.hideDevTools}
                selectCurrentPane={() => {
                  this.setPane(i);
                }}
                options={view.options || {}}
              />
            );
          })}
        </ContentContainer>
      </Container>
    );
  }
}
