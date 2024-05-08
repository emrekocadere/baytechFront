import React, { useState } from 'react';
import FormItem from 'antd/es/form/FormItem';
import { Col, Row } from 'antd';
import { Typography } from 'antd';
import Profile from './Profile';
import Navbar from './navbar';
import DashPeople from './DashPeople';
import Chat from './Chat';


const { Title } = Typography;


const HomePage = () => {
  // const onFinish = (values) => {
  //   console.log('Received values of form: ', values);
  // };
  const [activeComponent, setActiveComponent] = useState('DashPeople');

  const handleNavbarItemClick = (key) => {
    setActiveComponent(key);
  };


  return (
    <div style={{background: "#eef6fb",height:"100vh"}}>
    <Row>
      <Col span={2} style={{}}><Navbar onItemClick={handleNavbarItemClick} /></Col>

      <Col span={10} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
          {activeComponent === 'Profile' && <Profile />}
          {activeComponent === 'DashPeople' && <DashPeople />}
      </Col>
      
      <Col span={12} ><Chat></Chat></Col>
    </Row>
    </div>
  );
};
export default HomePage;