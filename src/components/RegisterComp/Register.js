import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input,message } from 'antd';
import res from "../../resim1.png"
import { Col, Row } from 'antd';
import "./style.css";
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const Register = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        
        console.log('Received values of form: ', values);

    

    let customResponse={
        Firstname:values.FirstName,
        Lastname:values.LastName,
    PhoneNumber:"7878",
      Username:values.UserName,
      Email:values.Email,
      Password:values.password
    }




    axios.post('http://localhost:5016/api/baytech/SignUp',customResponse)
    .then(function (response) {
        const cookies = new Cookies();
        if(response.status==200)
            {
              cookies.set('Id', response.data.id, { path: '/' });
              cookies.set('Email', response.data.email, { path: '/' });
              cookies.set('Username', response.data.userName, { path: '/' });
              cookies.set('PhotoUrl', response.data.photoUrl, { path: '/' });
              navigate("/homepage");
            }
    })
    .catch(function (error) {
        message.error("Username or password is incorrect!");
    });


    };
    return (
        //     <Row>
        //   <Col span={16} style={{background:"red"}}>col-12</Col>
        //   <Col span={8} style={{background:"black"}}>col-12</Col>
        // </Row>
        <div style={{ justifyContent: "row" }} >
            <Row>
                <Col span={16} >
                    <div style={{ height: "100vh" }}>

                        <img src={res} style={{ height: "100vh", width: "66.66vw", objectFit: "cover" }}></img>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ background: "#eef6fb", height: "100vh", border: ".5vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ background: "white", padding: "4vw", borderRadius: "3vw" }}>
                            <Title style={{ color: "#6e00ff", display: "flex", justifyContent: "center" }}>Register</Title>
                            <Form
                                style={{ borderRadius: "5vh" }}
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}

                                onFinish={onFinish}

                            >

                                <Form.Item
                                    name="FirstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your FirstName!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="FirstName" />
                                </Form.Item>
                                <Form.Item
                                    name="LastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your LastName!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="LastName" />
                                </Form.Item>
                                <Form.Item
                                    name="UserName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your UserName!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="UserName" />
                                </Form.Item>
                                <Form.Item
                                    name="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Email!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                                <Form.Item
                                    name="ConfirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your ConfirmPassword!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="ConfirmPassword" />
                                </Form.Item>


                                <Form.Item>

                                    <Button style={{ backgroundColor: "#6e00ff" }} type="primary" htmlType="submit" className="login-form-button">
                                        Register
                                    </Button>

                                    <Link to={"/login"} >

                                        <Button style={{ marginTop: "1vh", backgroundColor: "#6166f4" }} type="primary" htmlType="submit" className="login-form-button">
                                            Have account? Sign in
                                        </Button>
                                    </Link>



                                </Form.Item>
                            </Form>
                        </div>
                    </div>

                </Col>
            </Row>
        </div>

    );
};
export default Register;