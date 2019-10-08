import React from 'react';
import { Animate as ReactShow } from 'react-show';

import { Actions, ChildContainer, ExpandIconContainer, ItemHeader, Title } from './elements';

type Props = {
  children: React.ReactNode;
  title: string;
  keepState?: boolean;
  disabled?: boolean;
  defaultOpen?: boolean;
  actions?: React.Component<any, any>;
  style?: React.CSSProperties;
  showOverflow?: boolean;
};

type State = {
  open: boolean;
};

export class WorkspaceItem extends React.Component<Props, State> {
  toggleOpen = () => this.setState(state => ({ open: !state.open }));

  constructor(props: Props) {
    super(props);
    this.state = {
      open: Boolean(props.defaultOpen),
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      nextState.open !== this.state.open ||
      nextProps.disabled !== this.props.disabled ||
      this.props.children !== nextProps.children
    );
  }

  render() {
    const {
      children,
      title,
      keepState,
      disabled,
      actions,
      style,
      showOverflow,
    } = this.props;
    const { open } = this.state;

    return (
      <>
        <ItemHeader style={style} onClick={this.toggleOpen}>
          <ExpandIconContainer open={open}/>
          <Title>{title}</Title>

          {open && <Actions>{actions}</Actions>}
        </ItemHeader>
        <ReactShow
          style={{
            height: 'auto',
            overflow: showOverflow ? 'initial' : 'hidden',
          }}
          transitionOnMount
          start={{
            height: 0, // The starting style for the component.
            // If the 'leave' prop isn't defined, 'start' is reused!
          }}
          show={open}
          duration={250}
          stayMounted={keepState}
        >
          <ChildContainer disabled={disabled}>{children}</ChildContainer>
        </ReactShow>
      </>
    );
  }
}
