import React from 'react'
import styled from 'styled-components'
import Tooltip from '../../components/Tooltip'
import getBadge from '.'

const NameContainer = styled.div`
  display: inline-block;
  text-align: center;
`
const Image = styled.img`
  transition: 0.3s ease all;
  margin-bottom: -0.4em;

  opacity: ${props => (props.visible ? 1 : 0.5)};
  cursor: pointer;

  &:hover {
    ${props => !props.visible && `opacity: .75;`};
  }
`
export default class Badge extends React.Component {
  constructor() {
    super(...arguments)
    this.handleClick = () => {
      if (this.props.onClick) {
        this.props.onClick(this.props.badge)
      }
    }
  }

  render() {
    const {visible, badge, tooltip, size, onClick, ...props} = this.props
    const innerContent = (
      <Image {...props} width={size} src={getBadge(badge.id)} alt={badge.name} visible={visible || badge.visible}
             onClick={this.handleClick}/>)
    if (tooltip !== false) {
      return (<Tooltip style={{
        display: 'block',
      }} content={tooltip || badge.name}>

        {innerContent}
      </Tooltip>)
    }
    return (<NameContainer>
      {innerContent}
      <div style={{marginTop: '0.5rem'}}>{badge.name}</div>
    </NameContainer>)
  }
}
