import React from 'react'
import CodeMirror from "components/CodeMirror/CodeMirror"
import Resizable from 'components/Resizable/Resizable'
import {VertBar} from 'components/Resizable/DragBar'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from '@material-ui/core/ListItemText'
import {withStyles} from '@material-ui/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import FabContainer from "components/FabContainer/FabContainer"
import FormDialog from "./FormDialog"

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

const styles = theme => ({
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
  listItemText: {
    minWidth: '12em'
  },
  fab: {
    margin: theme.spacing(1)
  },
})

class Config extends React.Component {
  state = {
    components: {
      'drag-bar': {
        title: 'DragBar',
        content: exampleCode
      }
    },
    selectedComponent: 'drag-bar',
    open: false
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleOk = (title) => {
    if (title == null) return
    const components = this.state.components
    components[title] = {title}
    this.setState({
      selectedComponent: title,
      components
    })
  }

  handleListItemClick = (key) => {
    this.setState({selectedComponent: key})
  }

  handleAdd = () => {
    this.setState({open: true})
  }

  handleCmChange = (inst, co) => {
    const c = this.getComponent()
    c.content = inst.getValue()
  }

  renderCodeMirror() {
    const c = this.getComponent()

    return (
      <CodeMirror
        mode={{name: "jsx", json: true}}
        lineNumbers={true}
        styleActiveLine={true}
        matchBrackets={true}
        // readOnly={c.content}
        // cursorBlinkRate={c.content ? -1 : 530}
        value={c.content}
        onChange={this.handleCmChange}
      />
    )
  }

  getComponent(key = null) {
    return this.state.components[key || this.state.selectedComponent]
  }

  getComponentList() {
    const {classes} = this.props

    return Object.keys(this.state.components).map(key => {
      const c = this.getComponent(key)
      return (
        <ListItem
          selected={this.state.selectedComponent === key}
          button
          key={key}
          onClick={this.handleListItemClick.bind(this, key)}
        >
          <ListItemText classes={{root: classes.listItemText}}>
            {c.title}
          </ListItemText>
        </ListItem>
      )
    })
  }

  render() {
    const {classes, service} = this.props

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
          {this.renderCodeMirror()}
        </Resizable>
        <FabContainer>
          <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.handleAdd}>
            <AddIcon/>
          </Fab>
          <Fab color="secondary" aria-label="edit" className={classes.fab}>
            {/*<Icon>edit_icon</Icon>*/}
            <EditIcon/>
          </Fab>
          <Fab disabled aria-label="delete" className={classes.fab}>
            <DeleteIcon/>
          </Fab>
        </FabContainer>
        <FormDialog open={this.state.open} close={this.handleClose} ok={this.handleOk}/>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Config)
