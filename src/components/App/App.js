import React from 'react'
import {Link as RouterLink, Route} from '@doce'

import UserList from '../User/UserList'
import Game from 'components/Game/Game'
import Config from 'components/Config/Config'
import InboxIcon from '@material-ui/icons/Inbox'
import ListIcon from '@material-ui/icons/List'
import DraftsIcon from '@material-ui/icons/Drafts'
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
  }
}

class App extends React.Component {
  state = {
    icons: [
      {key: 1, to: '/app/config', component: ListIcon},
      {key: 2, to: '/app/users', component: InboxIcon},
      {key: 3, to: '/app/games', component: DraftsIcon},
    ]
  }

  renderIcons() {
    const {classes} = this.props

    return this.state.icons.map(ic => (
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

        {<Route path='/app/config' component={Config}/>}
        {<Route path='/app/users' component={UserList}/>}
        {<Route path='/app/games' component={Game}/>}
      </div>
    )
  }
}

export default withStyles(styles)(App)
