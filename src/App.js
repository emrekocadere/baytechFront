import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginComp/LoginPage';
import Settings from "./components/SettingsComp/Settings"
import Main from './components/homepage/Main';
import Register from './components/RegisterComp/Register';
import HomePage from "./components/homepage/HomePage"

import Profile from "./components/homepage/Profile";

import Calls from "./components/CallsComp/Calls";

//import InputEmoji from "./components/CallsComp/emoji";
import InputEmoji from "react-input-emoji";

import { BrowserRouter } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
<BrowserRouter>
<Routes>
          <Route index element={<Register />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />{/* Bununla işimiz yok.*/}
          <Route path="calls" element={<Calls />} />
          <Route path="inputemoji" element={<InputEmoji />} />


</Routes>
</BrowserRouter>
  );
}

export default App;
