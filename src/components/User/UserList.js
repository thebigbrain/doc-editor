import React from 'react'
import Table from 'antd/es/table'

import { Parse } from '@doce/core'

const columns = [
  {
    title: 'objectId',
    dataIndex: 'objectId',
  },
  {
    title: 'username',
    dataIndex: 'username',
  },
  {
    title: 'phone',
    dataIndex: 'phone',
  },
]

export default class UserList extends React.Component {
  state = {
    dataSource: [],
  }

  subscription = null

  async componentWillMount() {
    let query = new Parse.Query('User')
    this.subscription = await query.subscribe()

    this.subscription.on('create', (people) => {
      console.log(people.get('username')) // This should output Mengyan
    })
  }

  componentWillUnmount() {
    if (this.subscription) this.subscription.unsubscribe()
  }

  render() {
    return (
      <Table dataSource={this.state.dataSource} columns={columns}/>
    )
  }
}
