import React from 'react'
import MUIDataTable from 'mui-datatables'
import { Parse } from '@doce/core'

const columns = [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'company',
    label: 'Company',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'city',
    label: 'City',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'state',
    label: 'State',
    options: {
      filter: true,
      sort: false,
    },
  },
]

const data = [
  { name: 'Joe James', company: 'Test Corp', city: 'Yonkers', state: 'NY' },
  { name: 'John Walsh', company: 'Test Corp', city: 'Hartford', state: 'CT' },
  { name: 'Bob Herm', company: 'Test Corp', city: 'Tampa', state: 'FL' },
  { name: 'James Houston', company: 'Test Corp', city: 'Dallas', state: 'TX' },
]

const options = {
  filterType: 'checkbox',
  responsive: 'stacked',
}

export default function UserList(props) {
  const [subscription, setSubscription] = React.useState(null)

  React.useEffect(() => {
    let aborted = false

    let query = new Parse.Query('User')
    query.subscribe().then((s) => {
      if (aborted) return

      setSubscription(s)
      s.on('create', (people) => {
        const dataSource = this.state.dataSource
        dataSource.push(people.toJSON())
        this.setState({ dataSource })
      })
    })

    return () => {
      aborted = true
      if (subscription) subscription.unsubscribe()
    }
  }, [])

  return (
    <MUIDataTable
      title={'User List'}
      data={data}
      columns={columns}
      options={options}
    />
  )
}
