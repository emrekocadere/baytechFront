import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, MessageOutlined, PhoneOutlined, UsergroupAddOutlined, LoginOutlined } from '@ant-design/icons';
import PriflePhoto from "../SidebarComp/ellipse-1.png"
import { Button, Menu } from 'antd';
import './navbar.css';
import { Link } from "react-router-dom";

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//     style: {

//     }
//   };
// }

// const items = [
//   getItem(<img style={{ width: '3.0vw', objectFit: "cover", }} src={PriflePhoto} />, 'Profile'),
//   getItem('', 'Message', <Link to={"/homepage"}><MessageOutlined style={{ color: "white" }} /></Link>),
//   getItem('', 'Calls', <Link><PhoneOutlined style={{ color: "white" }} /></Link>),
//   getItem('', 'Groups', <UsergroupAddOutlined style={{ color: "white" }} />),
//   getItem('', 'Settings', <Link to={"/settings"}><SettingOutlined style={{ color: "white" }} /></Link>),
//   getItem('', 'Exit', <LoginOutlined style={{ color: "white" }} />),

// ];

// // submenu keys of first level
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
// const Navbar = () => {
//   const [openKeys, setOpenKeys] = useState(['sub1']);
//   const onOpenChange = (keys) => {
//     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
//     if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//       setOpenKeys(keys);
//     } else {
//       setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
//     }
//   };
//   return (

//       <Menu
//         mode="inline"
//         openKeys={openKeys}
//         onOpenChange={onOpenChange}
//         style={{
//           width:"7vw",
//           height: "100vh",
//           background: "#6e00ff",
//           borderRadius: "2vh",


//         }}
//         items={items}

//       />
 

//   );
// };
// export default Navbar;

// Navbar.js
const Navbar = ({ onItemClick }) => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const handleItemClick = (key) => {
    onItemClick(key);
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
      <Menu.Item key="Calls" icon={<PhoneOutlined style={{ color: "white" }} />} />
      <Menu.Item key="Groups" icon={<UsergroupAddOutlined style={{ color: "white" }} />} />
      <Menu.Item key="Settings" icon={<Link to={"/settings"}><SettingOutlined style={{ color: "white" }} /></Link>} />
      <Menu.Item key="Exit" icon={<LoginOutlined style={{ color: "white" }} />} />
    </Menu>
  );
};

export default Navbar;
