import React from 'react';
import "./login.less"
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink, useHistory } from 'react-router-dom';
import { toLogin } from "../api/index"
function Login() {
    const history = useHistory()
    if (localStorage.getItem("user")) {
        history.push('/main')
    }
    const onFinish = values => {
        // console.log('Received values of form: ', values);
        const username = values.username
        const password = values.password
        toLogin(username, password).then(res => {
            // console.log(res)
            if (res.data.code === 20000) {
                if (values.remember) {
                    localStorage.setItem('user', JSON.stringify([values.username, values.password]))
                } else {
                    localStorage.setItem('user', JSON.stringify([values.username]))
                }
                message.success('登录成功！')
                history.push('/main')
            } else {
                message.info(res.data.msg);
            }
        })
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <h1>登录</h1>
            <Form.Item
                name="username"
                rules={[
                    { required: true, message: '请输入用户名' },
                    { pattern: /^[0-9A-Za-z]+$/, message: "用户名由数字字母下划线组成" }
                ]}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="用户名" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: '请输入密码' },
                    {
                        pattern: /^[0-9A-Za-z]+$/, message: "密码由数字字母下划线组成"
                    }
                ]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码" />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Button className="login-form-forgot" >
                    忘记密码
                </Button>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
        </Button>
        Or <NavLink to="/register">现在去注册！</NavLink>
            </Form.Item>
        </Form>
    )
    // }
}

export default Login