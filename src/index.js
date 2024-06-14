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

    <App/>


);


reportWebVitals();
