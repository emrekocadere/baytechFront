import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import res from "../../resim2.jpeg"
import { Col, Row } from 'antd';
import Login from './Login';

import "./style.css";
import Title from 'antd/es/skeleton/Title';

const LoginPage = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        //     <Row>
        //   <Col span={16} style={{background:"red"}}>col-12</Col>
        //   <Col span={8} style={{background:"black"}}>col-12</Col>
        // </Row>
        <div style={{ justifyContent: "row" }} >
            <Row>
                <Col span={16} style={{ background: "red" }}>
                    <div style={{ height: "100vh" }}>

                        <img src={res} style={{ height: "100vh", width: "66.66vw", objectFit: "cover" }}></img>
                    </div>
                </Col>
                
                <Col span={8} style={{ background: "black" }}>
                    <div style={{ background: "#eef6fb", height: "100vh", border: ".5vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Login></Login>
                    </div>
                </Col>
            </Row>
        </div>


    );
};
export default LoginPage;