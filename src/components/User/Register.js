import React from 'react'
import {Button, Checkbox, Form, Icon, Input, message, Select, Tooltip,} from 'antd'
import {Link} from '@doce/core'
import {LoginStatus} from '../../utils/const'

const {Option} = Select

// const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)

        if (this.props.onRegister) await this.props.onRegister(values)
      }
    })
  }

  handleConfirmBlur = e => {
    const {value} = e.target
    this.setState({confirmDirty: this.state.confirmDirty || !!value})
  }

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const {form} = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true})
    }
    callback()
  }

  render() {
    const {getFieldDecorator} = this.props.form
    // const { autoCompleteResult } = this.state;

    const {status, routePath, history} = this.props

    switch (status) {
      case LoginStatus.FAILED:
        message.error(status)
        break
      case LoginStatus.SUCCESS:
        history.replace(routePath.app)
        return null
      default:
        break
    }

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{width: 70}}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    )

    // const websiteOptions = autoCompleteResult.map(website => (
    //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password/>)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{required: false, message: 'Please input your nickname!', whitespace: true}],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{required: false, message: 'Please input your phone number!'}],
          })(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: false,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input/>)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <Link to='/user/agreement'>agreement</Link>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm)
export default WrappedRegistrationForm
