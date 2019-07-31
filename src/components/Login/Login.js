import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import './Login.css';
import { LoginStatus } from 'base/const';
import {Link} from 'base/page';

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

    console.log(match.url);

    if (status === LoginStatus.FAILED) {
      message.error(status.message);
    }

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={i18n.placeholder.username}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={i18n.placeholder.password}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>{i18n.remember}</Checkbox>)}
          <Link className="login-form-forgot" to={`${match.url}/forget`}>
            {i18n.forget}
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {i18n.login}
          </Button>
          <Link to={`${match.url}/register`}>{i18n.register}</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;
