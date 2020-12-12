import React from 'react';
import "./register.less"
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Avatar from '../components/Avatar';
import { NavLink, useHistory } from 'react-router-dom';
import { toRegister } from '../api';
function Login() {
    const history = useHistory()
    const onFinish = values => {
        // console.log('Received values of form: ', values);
        const username = values.username
        const password = values.password
        const url = localStorage.getItem('url')
        toRegister(username, password, url).then(res => {
            if (res.data.code === 20000) {
                message.success('注册成功！')
                history.push('/login')
            } else {
                message.info(res.data.msg);
            }
        })
    };
    return (
        <>

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h1>注册</h1>
                <Avatar
                // sonChangeImg={parentChangeImg()}
                />
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="用户名" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
        </Button>
        Or <NavLink to="/login">现在去登录！</NavLink>
                </Form.Item>
            </Form>
        </>
    )
    // }
}

export default Login