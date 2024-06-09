import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Button, Form, Input, message } from 'antd';
import { BellOutlined, PhoneOutlined, VideoCameraOutlined, MoreOutlined, PaperClipOutlined, CameraOutlined, AudioOutlined } from '@ant-design/icons';
import InputEmoji from "react-input-emoji";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Cookies from 'js-cookie';
import axios from 'axios';
import res5 from "../../profileImages/gemini.avif"
import * as signalR from "@microsoft/signalr";

import { Modal } from 'antd';
import "./style.css";

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const Chat = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [geminiTitle, setgeminiTitle] = useState('AI by Gemini');
  const messagesContainerRef = useRef(null);
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [GeminiMessage, setGeminiMessage] = useState([]);


  const request = {
    UserId: Cookies.get("Id")
  }

  const [geminiResponse, setgeminiResponse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setgeminiResponse("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const getMessages = (username1,username2) => {
   let  req={
      UserOneName:username1,
      UserTwoName:username2
    }
    axios.post('http://localhost:5016/api/baytech/GetMessages', req)
      .then(function (response) {
       console.log("res",response)
       setMessages(response.data)
      })
      .catch(function (error) {
        console.log(error);

      });
  };



  const SendMessageToGemini = (values) => {
    // let str = "";
    // messages.forEach(obj => {
    //   str += obj.messages.toString();
    // });
    let geminiReq = {
      message: values,
      Username:Cookies.get("Username")
    }

    axios.post('http://localhost:5016/api/baytech/PrivateGemini', geminiReq)
      .then(function (response) {
        setgeminiResponse(response.data.candidates[0].content.parts[0].text);
        getMessages(Cookies.get("Username"),"Gemini")
      })
      .catch(function (error) {
        console.log(error);
        message.error("Username or password is incorrect!");
      });
  };


  const emotionGemini = (values) => {
    let str = "";
    messages.forEach(obj => {
      str += obj.messages.toString();
    });
    let geminiReq = {
      message: str + " What is the emotional intensity of these messages?"
    }

    axios.post('http://localhost:5016/api/baytech/Gemini', geminiReq)
      .then(function (response) {
        setgeminiResponse(response.data.candidates[0].content.parts[0].text);
      })
      .catch(function (error) {
        console.log(error);
        message.error("Username or password is incorrect!");
      });
  };

  const messageAdvice = (values) => {
    let str = "";
    messages.forEach(obj => {
      str += obj.message.toString();
    });
    let geminiReq = {
      message: str + " How can I reply to messages, taking these messages into consideration?"
    }

    axios.post('http://localhost:5016/api/baytech/Gemini', geminiReq)
      .then(function (response) {
        setgeminiResponse(response.data.candidates[0].content.parts[0].text);
      })
      .catch(function (error) {
        console.log(error);
        message.error("Username or password is incorrect!");
      });
  };

  const joinRoom = async (username) => {
    try {
      let conn = new HubConnectionBuilder()
        .withUrl(`http://localhost:5016/chathub?username=${username}`, { accessTokenFactory: () => Cookies.get("token") })
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("ReceiveMessage", (message) => {
       // setMessages(prevMessages => [...prevMessages, message]);
        console.log("receive",props.selectedUserProp)
        getMessages(Cookies.get("Username"),props.selectedUserProp);
        
      });

      conn.on("Notify", (notification) => {
        alert(notification);
      });

      conn.onclose(e => {
        setConnection(null);
        setMessages([]);
       // setUsers([]);
      });

      await conn.start();
      setConnection(conn);
      //await conn.invoke("OnConnectedAsync");
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (toUser, message) => {
    try {
      if (connection) {
        await connection.invoke("SendPrivateMessage", toUser, message);
        getMessages(Cookies.get("Username"),props.selectedUserProp);
      } else {
        console.log("Connection not established.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createGroup = async (groupName) => {
    try {
      if (connection) {
        await connection.invoke("CreateGroup", groupName);
      } else {
        console.log("Connection not established.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addUserToGroup = async (groupName, username) => {
    try {
      if (connection) {
        await connection.invoke("AddUserToGroup", groupName, username);
      } else {
        console.log("Connection not established.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessageToGroup = async (groupName, message) => {
    try {
      if (connection) {
        await connection.invoke("SendMessageToGroup", groupName, message);
      } else {
        console.log("Connection not established.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      if (connection) {
        await connection.stop();
      } else {
        console.log("Connection is not established.");
      }
    } catch (e) {
      console.error("Error occurred while closing the connection:", e);
    }
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleOnEnter = (text) => {
    if (text.trim() !== '') {
      setInputValue('');
      if(props.selectedUserProp=="Gemini")
        {
          SendMessageToGemini(text)
        }
        else{
          sendMessage(props.selectedUserProp,text);
        }

    }
  };

  const connect = () => {
    joinRoom(Cookies.get("Username"));
  };

  useEffect(() => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    getMessages(Cookies.get("Username"),props.selectedUserProp)
  }, [props.selectedUserProp]);

  return (
    <div style={{ height: '96vh', marginTop: "2vh", marginBottom: "2vh" }}>
      <div style={{ position: 'relative', minHeight: 'calc(96vh - 2.4vw)', padding: "1.2vw", background: "white", borderRadius: "2vw", backgroundColor: "lightseagreen" }}>
        <div style={{
          background: '#fff', padding: '2vh', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <Button onClick={connect}>connect</Button>
          <div style={{ display: 'flex', justifyContent: "space-around" }}>
            <Avatar src={<img src={url} alt="avatar" />} />
            <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
              <a>{props.selectedUserProp}</a>
              <a>Email</a>
            </div>
          </div>
          <Button type="text" onClick={showModal}><Avatar src={res5}></Avatar></Button>
        </div>
        <div style={{ marginTop: '15px', marginBottom: '0px', overflowY: 'auto', maxHeight: '75vh' }} ref={messagesContainerRef}>
          {messages.map((messages, index) => (
            <div key={index} style={{
              marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px', maxWidth: '35%',
              alignSelf: 'flex-end', background: '#f0f0f0', wordWrap: 'break-word', backgroundColor: "lightblue"
            }}>{messages.message}</div>
          ))}
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', background: '#fff', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid lightseagreen', backgroundColor: "lightseagreen", borderBottomLeftRadius: '2vw', borderBottomRightRadius: '2vw'
        }}>
          <Form style={{ maxHeight: "12vh", width: '100%' }}>
            <div style={{ margin: '0 auto', width: 'calc(100% - 20px)' }}>
              <Input
                size="large"
                placeholder="Type your message here"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onPressEnter={() => handleOnEnter(inputValue)}
                style={{ width: '100%', maxHeight: "12vh" }}
                prefix={<Button type='text'><PaperClipOutlined /></Button>}
                suffix={
                  <div>
                    <Modal title={geminiTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                      <div>
                        <div>
                          {geminiResponse}
                        </div>
                        <Button onClick={emotionGemini}>konu</Button>
                        <Button onClick={messageAdvice}>mesaj</Button>
                      </div>
                    </Modal>
                    <Button type='text'><AudioOutlined /></Button>
                    <InputEmoji
                      value={inputValue}
                      onChange={handleInputChange}
                      cleanOnEnter
                      onEnter={handleOnEnter}
                      placeholder="a"
                      borderColor='white'
                      fontSize={0}
                      disableEmojiPicker={true}
                    />
                  </div>
                }
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
