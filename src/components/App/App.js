import React from 'react'
import {Link as RouterLink} from '@doce/core'

import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import Link from '@material-ui/core/Link'
import {withStyles} from "@material-ui/styles"

const styles = {
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e0e3eb',
  },
  list: {
    width: 'auto',
    backgroundColor: '#fff'
  },
  listItemIcon: {
    minWidth: 0
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flexGrow: 1,

  }
}

class App extends React.Component {
  state = {
  }

  renderIcons() {
    const {classes, icons} = this.props

    return icons.map(ic => (
      <Link to={ic.to} component={RouterLink} key={ic.key}>
        <ListItem button>
          <ListItemIcon classes={{root: classes.listItemIcon}}>
            <ic.component/>
          </ListItemIcon>
        </ListItem>
      </Link>
    ))
  }

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <List
          classes={{root: classes.list}}
          component="nav"
        >
          {this.renderIcons()}
        </List>
        <div className={classes.content}>{this.props.children}</div>
      </div>
    )
  }
}

export default withStyles(styles)(App)
