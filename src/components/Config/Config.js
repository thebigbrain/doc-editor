import React from 'react'
import CodeMirror from "components/CodeMirror/CodeMirror"
import Resizable from 'components/Resizable/Resizable'
import {VertBar} from 'components/Resizable/DragBar'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import {withStyles, withTheme} from '@material-ui/styles'

const exampleCode = `import React from 'react'

const style = {
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
}

const defaultSize = '7px'

class DragBar extends React.Component {
  onMouseDown = (evt) => {
    console.log('mouse down')
    if (this.props.onMouseDown) this.props.onMouseDown(evt)
  }

  onMouseUp = (evt) => {
    console.log('mouse up')
    if (this.props.onMouseUp) this.props.onMouseUp(evt)
  }

  render(s) {
    return (
      <div
        style={Object.assign({}, style, s, this.props.style)}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      />
    )
  }
}

export class VertBar extends DragBar {
  render() {
    return super.render({width: defaultSize, cursor: 'ew-resize'})
  }
}

export class HorizBar extends DragBar {
  render() {
    return super.render({height: defaultSize, cursor: 'ns-resize'})
  }
}
`

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e0e3eb',
  },
  list: {
    backgroundColor: '#fff'
  },
  listItemIcon: {
    minWidth: 0
  }
}

class Config extends React.Component {
  state = {
    icons: []
  }

  getComponentList() {
    const {classes} = this.props

    return this.state.icons.map(SomeIcon => (
      <ListItem button key={Math.random()}>
        <ListItemIcon classes={{root: classes.listItemIcon}}>
          <SomeIcon/>
        </ListItemIcon>
      </ListItem>
    ))
  }

  render() {
    const {classes} = this.props
    console.log(classes)

    return (
      <React.Fragment>
        <VertBar style={{width: '3px'}}/>
        <Resizable className={classes.root}>
          <List
            classes={{root: classes.list}}
            component="nav"
          >
            {this.getComponentList()}
          </List>
          <VertBar/>
          <CodeMirror
            mode={{name: "jsx", json: true}}
            lineNumbers={true}
            styleActiveLine={true}
            matchBrackets={true}
            readOnly={true}
            cursorBlinkRate={-1}
            value={exampleCode}
          />
        </Resizable>
      </React.Fragment>
    )
  }
}

export default withTheme(withStyles(styles)(Config))
