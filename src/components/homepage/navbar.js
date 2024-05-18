import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, MessageOutlined, PhoneOutlined, UsergroupAddOutlined, LoginOutlined } from '@ant-design/icons';
import PriflePhoto from "../SidebarComp/ellipse-1.png"
import { Button, Menu } from 'antd';
import Cookies from 'universal-cookie';
import './navbar.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Navbar = ({ onItemClick }) => {

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const navigate = useNavigate();

  // const handleItemClick = (key) => {
  //   onItemClick(key);
  // };

  const handleItemClick = (key) => {
    if (typeof onItemClick === 'function') {
      onItemClick(key);
    } else {
      console.error("onItemClick bir fonksiyon değil");
    }
  };


  const onClick = () => {
    const cookies = new Cookies();
  
      let req={
        Id:cookies.get("Id")
      }

    axios.post('http://localhost:5016/api/Baytech/exit',req)
    .then(function (response) {
      if(response.status==200)
        {
          navigate("/register");
        }

    })
    .catch(function (error) {
      console.log(error);
      navigate("/login");
    
    });

    cookies.set('Id', "none", { path: '/' });
    cookies.set('Email', "none", { path: '/' });
    cookies.set('Username', "none", { path: '/' });
    cookies.set('PhotoUrl', "none", { path: '/' });

  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={keys => setOpenKeys(keys)}
      style={{
        width: "7vw",
        height: "96vh",
        marginTop: "2vh", marginBottom: "2vh",
        background: "#6e00ff",
        borderRadius: "2vh",
      }}
    >
      <Menu.Item key="Profile" onClick={() => handleItemClick('Profile')} icon={<img style={{ width: '3.0vw', objectFit: "cover", }} src={PriflePhoto} />} />
      <Menu.Item key="Message" onClick={() => handleItemClick('DashPeople')} icon={<Link to={"/homepage"}><MessageOutlined style={{ color: "white" }} /></Link>} />
      
      <Menu.Item key="Settings" onClick={() => handleItemClick('Settings')} icon={<Link to={"/settings"}><SettingOutlined style={{ color: "white" }} /></Link>} />
      <Menu.Item key="Exit" onClick={onClick} icon={<LoginOutlined style={{ color: "white" }} />} />
    </Menu>
  );
};

export default Navbar;
