import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';
import Navbar from './components/homepage/navbar';
import Login from './components/LoginComp/Login'
import Sidebar from './components/SidebarComp/Sidebar';
import reportWebVitals from './reportWebVitals';
import DashPeople from './components/homepage/DashPeople';
import AccountButton from './components/SettingsComp/Settings';
import Calls from './components/CallsComp/Calls';
import Chat from './components/homepage/Chat';
import Profile from './components/homepage/Profile';
import LoginPage from './components/LoginComp/LoginPage';
import Main from './components/homepage/Main';
import { Col, Row } from 'antd';
import Settings from './components/SettingsComp/Settings';
import res from './ellipse-1.png';
import res2 from './resim1.png';
import Register from './components/RegisterComp/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 {/*
     
        <Chat />
        <Navbar />
        
        <Main />
        <AccountButton /> 
        <Main />*/}
    {/* <div style={{ justifyContent: "row", height: "100vh", width: "100vw", overflow: "hidden", background: "red" }}>
      <div style={{ marginTop: "5vh" }} >
        <Row style={{ display: "flex" }}>
          <Col span={2} style={{ background: "red", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Navbar />
          </Col>

          <Col span={7} style={{ background: "green" }}>
            <div style={{ paddingLeft: "110px", paddingTop: "180px" }}>
              <Profile />
            </div>

          </Col>
          <Col span={1} style={{ background: "red" }}></Col>
          <Col span={13} style={{ background: "pink" }}>
            <Chat />
          </Col>
          <Col span={1} style={{ background: "red" }}></Col>

        </Row>
      </div>
    </div> */}
    {/* <div style={{ justifyContent: "row", height: "100vh", width: "100vw", overflow: "hidden", background: "red"  }}>
      <div style={{ marginTop: "5vh" }} >
        <Row style={{ display: "flex" }}>
          <Col span={2} style={{ background: "yellow" }}>
          <div style={{ background: "#eef6fb", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Navbar />
            </div>
          </Col>

          <Col span={8} style={{ background: "green" }}>
          <div style={{ background: "blue" , display: "flex", justifyContent: "center", alignItems: "center", height:"90vh"}}>
            <Profile/>
            </div>
          </Col>
          
          <Col span={14} style={{ background: "pink", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Chat />
          </Col>
          
        </Row>
      </div>
    </div> */}

    {/* <Settings/> */}
    <App/>

  </React.StrictMode>
);


reportWebVitals();
