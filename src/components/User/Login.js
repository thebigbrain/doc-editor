import React from 'react'
import {Button, Checkbox, Form, Icon, Input, message, Radio} from 'antd'

import './Login.css'
import {LoginStatus} from 'utils/const'
import {Link} from '@doce/core'

class LoginType {
  static MOBILE = '2'
  static USER = '1'
}

class NormalLoginForm extends React.Component {
  state = {
    currentTab: LoginType.USER
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values = {}) => {
      if (!err) {
        console.log('Received values of form: ', values)

        if (this.state.currentTab === LoginType.USER && this.props.onLogin) await this.props.onLogin(values)
        if (this.state.currentTab === LoginType.MOBILE && this.props.onMobileLogin) await this.props.onMobileLogin(values)
      }
    })
  }

  onTabChange = e => {
    this.setState({
      currentTab: e.target.value
    })
  }

  getUserPane(key) {
    if (String(key) !== this.state.currentTab) return null

    const {getFieldDecorator} = this.props.form
    const {i18n} = this.props

    return (
      <React.Fragment>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder={i18n.placeholder.username}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="password"
              placeholder={i18n.placeholder.password}
            />,
          )}
        </Form.Item>
      </React.Fragment>
    )
  }

  getPhonePane(key) {
    if (String(key) !== this.state.currentTab) return null

    const {getFieldDecorator} = this.props.form
    const {i18n} = this.props

    return (
      <React.Fragment>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input
              prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder={i18n.placeholder.phone}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('code', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
              type="text"
              placeholder={i18n.placeholder.code}
            />,
          )}
          <Button>{i18n.placeholder.codeButton}</Button>
        </Form.Item>
      </React.Fragment>
    )
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {status, i18n, routePath, history} = this.props

    switch (status) {
      case LoginStatus.FAILED:
        message.error(status)
        break
      case LoginStatus.SUCCESS:
        console.log(routePath.app)
        history.replace(routePath.app)
        return null
      default:
        break
    }

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Radio.Group value={this.state.currentTab} onChange={this.onTabChange}>
          <Radio.Button value={LoginType.USER}>{i18n.userTab}</Radio.Button>
          <Radio.Button value={LoginType.MOBILE}>{i18n.phoneTab}</Radio.Button>
        </Radio.Group>
        {this.getUserPane(1)}
        {this.getPhonePane(2)}
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>{i18n.remember}</Checkbox>)}
          <Link className="login-form-forgot" to={routePath.forget}>
            {i18n.forget}
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {i18n.login}
          </Button>
          <Link to={routePath.register}>{i18n.register}</Link>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm)

export default WrappedNormalLoginForm
