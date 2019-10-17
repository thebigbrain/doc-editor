import React from 'react'
import { Link, Redirect, Route, Switch } from '@muggle/core'
import { makeStyles } from '@material-ui/styles'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import InboxIcon from '@material-ui/icons/Inbox'
import ListIcon from '@material-ui/icons/List'
import DraftsIcon from '@material-ui/icons/Drafts'

import { Container, Content } from '../../codesandbox-app/pages/elements'
import Config from './Config'
import Game from './Game'
import UserList from './UserList'

const useStyles = makeStyles({
  list: {
    width: 'auto',
    backgroundColor: '#fff',
  },
  listItemIcon: {
    minWidth: 0,
  },
})

export default function(props) {
  const classes = useStyles(props)
  const icons = [
    { key: 'config', to: '/app/config', component: ListIcon },
    { key: 'users', to: '/app/users', component: InboxIcon },
    { key: 'games', to: '/app/games', component: DraftsIcon },
  ]

  function renderIcons() {
    return icons.map(({ key, to, component: C }) => (
      <Link to={to} key={key}>
        <ListItem button>
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <C/>
          </ListItemIcon>
        </ListItem>
      </Link>
    ))
  }

  return (
    <Container>
      <List
        classes={{ root: classes.list }}
        component="nav"
      >
        {renderIcons()}
      </List>
      <Content>
        <Switch>
          <Route path='/app/config' component={Config}/>
          <Route path='/app/users' component={UserList}/>
          <Route path='/app/games' component={Game}/>
          <Redirect to='/app/config'/>
        </Switch>
      </Content>
    </Container>
  )
}
