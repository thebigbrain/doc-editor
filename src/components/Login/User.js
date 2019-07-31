import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import './Login.css';
import { LoginStatus } from 'base/const';
import {Link, Route, Switch} from 'base/page';
import Login from './Login';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values={}) => {
      if (!err) {
        console.log('Received values of form: ', values);

        if (this.props.onLogin) await this.props.onLogin(values);
      }
      return false;
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { status = {}, i18n = {}, location, match } = this.props;

    if (status === LoginStatus.FAILED) {
      message.error(status.message);
    }

    return (
      <div>
        <Switch>
          <Route path={`${match.url}/login`} component={Login}/>
        </Switch>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;
