import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom'; 
import "./style.css";
import FormItem from 'antd/es/form/FormItem';
import { Typography } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Password from 'antd/es/input/Password';
import Cookies from 'js-cookie';
const { Title } = Typography;

const Login = () => {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);



    let customResponse={
      Username:values.username,   
      Password:values.password
    }
    console.log("parametrelim")//
    console.log(customResponse)//

    axios.post('http://localhost:5016/api/baytech/SignIn',customResponse)
    .then(function (response) {
      console.log(response);
      let abc =Cookies.get("SomeCookie")
      console.log(abc)
    })
    .catch(function (error) {
      console.log(error);
      message.error("Username or password is incorrect!");
    });

  };
  return (
    <div style={{ background: "white", padding: "5vw", borderRadius: "3vw" }}>
      <Title style={{ color: "#6e00ff", display: "flex", justifyContent: "center" }}>Login</Title>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* 
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}


        <Form.Item>

          <Button style={{ backgroundColor: "#6e00ff" }} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>

        </Form.Item>

        <FormItem>
        <Link to="/register">
          <Button style={{ marginTop: "1vh", backgroundColor: "#6166f4" }} type="primary" htmlType="submit" className="login-form-button">
          Don't have an account?
          </Button>
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};
export default Login;