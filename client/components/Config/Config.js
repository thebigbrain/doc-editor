import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import uuid from 'uuid/v4'

import CodeMirror from 'components/CodeMirror/CodeMirror'
import Resizable from 'components/Resizable/Resizable'
import { VertBar } from 'components/Resizable/DragBar'
import FabContainer from 'components/FabContainer/FabContainer'
import FormDialog from './FormDialog'

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
    backgroundColor: '#fff',
  },
  listItemText: {
    minWidth: '12em',
  },
  fab: {
    margin: theme.spacing(1),
  },
})

const exampleComponent = {
  id: uuid(),
  title: 'DragBar',
  content: exampleCode,
}

function Config(props) {
  const [components, setComponents] = React.useState([exampleComponent])
  const [selected, setSelected] = React.useState(exampleComponent)
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOk = (title) => {
    if (title == null) return

    const c = { id: uuid(), title }
    setComponents(components.concat(c))
    setSelected(c)
  }

  const handleListItemClick = (c) => {
    setSelected(c)
  }

  const handleAdd = () => {
    setOpen(true)
  }

  const handleCmChange = (inst, co) => {
    selected.content = inst.getValue()
  }

  const renderCodeMirror = () => {
    return (
      <CodeMirror
        mode={{ name: 'jsx', json: true }}
        lineNumbers={true}
        styleActiveLine={true}
        matchBrackets={true}
        // readOnly={c.content}
        // cursorBlinkRate={c.content ? -1 : 530}
        value={selected.content}
        onChange={handleCmChange}
      />
    )
  }

  const getComponentList = () => {
    const { classes } = props

    return components.map(c => {
      return (
        <ListItem
          selected={selected === c}
          button
          key={c.id}
          onClick={() => handleListItemClick(c)}
        >
          <ListItemText classes={{ root: classes.listItemText }}>
            {c.title}
          </ListItemText>
        </ListItem>
      )
    })
  }

  React.useEffect(() => {
    let aborted = false
    const { livequery: lq } = props
    lq.find({
      $limit: 5,
      $skip: 0,
      $sort: { createdAt: -1 },
    }).then(data => {
      if (aborted) return

      setComponents(components.concat(data))
    })

    return () => {
      aborted = true
    }
  }, [])

  const { classes } = props

  return (
    <React.Fragment>
      <VertBar style={{ width: '3px' }}/>
      <Resizable className={classes.root}>
        <List
          classes={{ root: classes.list }}
          component="nav"
        >
          {getComponentList()}
        </List>
        <VertBar/>
        {renderCodeMirror()}
      </Resizable>
      <FabContainer>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleAdd}>
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
      <FormDialog open={open} close={handleClose} ok={handleOk}/>
    </React.Fragment>
  )

}

export default withStyles(styles)(Config)
