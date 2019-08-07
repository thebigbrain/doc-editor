import React from 'react';
import Table from 'antd/es/table';

import {Parse} from '@doce';

const columns = [
  {
    title: 'objectId',
    dataIndex: 'objectId',
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'score',
    dataIndex: 'score',
  },
];

export default class Game extends React.Component {
  state = {
    dataSource: []
  };

  subscription = null;

  async componentWillMount() {
    let query = new Parse.Query('Game');
    this.subscription = await query.subscribe();

    this.subscription.on('create', (people) => {
      console.log(people.get('name')); // This should output Mengyan
    });
  }

  componentWillUnmount() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  render() {
    return (
      <Table dataSource={this.state.dataSource} columns={columns}/>
    );
  }
}
