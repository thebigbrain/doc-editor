import React from 'react';
import { Animate as ReactShow } from 'react-show';
import { Actions, ChildContainer, ExpandIconContainer, ItemHeader, Title } from './elements';
export class WorkspaceItem extends React.Component {
    constructor(props) {
        super(props);
        this.toggleOpen = () => this.setState(state => ({ open: !state.open }));
        this.state = {
            open: Boolean(props.defaultOpen),
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.open !== this.state.open ||
            nextProps.disabled !== this.props.disabled ||
            this.props.children !== nextProps.children);
    }
    render() {
        const { children, title, keepState, disabled, actions, style, showOverflow, } = this.props;
        const { open } = this.state;
        return (<>
        <ItemHeader style={style} onClick={this.toggleOpen}>
          <ExpandIconContainer open={open}/>
          <Title>{title}</Title>

          {open && <Actions>{actions}</Actions>}
        </ItemHeader>
        <ReactShow style={{
            height: 'auto',
            overflow: showOverflow ? 'initial' : 'hidden',
        }} transitionOnMount start={{
            height: 0,
        }} show={open} duration={250} stayMounted={keepState}>
          <ChildContainer disabled={disabled}>{children}</ChildContainer>
        </ReactShow>
      </>);
    }
}
