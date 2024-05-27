

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

const Chat = () => {


  //const [chatroom, setChatroom] = useState();

  const [inputValue, setInputValue] = useState('');
  const [geminiTitle, setgeminiTitle] = useState('AI by Gemini');
  const messagesContainerRef = useRef(null);
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);


  const request = {
    UserId: Cookies.get("Id")
  }

  let [geminiResponse, setgeminiResponse] = useState([]);

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

  const emotionGemini = (values) => {

    let str;
    messages.forEach(obj => {
      str = str += obj.message.toString();
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

    let str;
    messages.forEach(obj => {
      str = str += obj.message.toString();
    });
    let geminiReq = {
      message: str + "How can I reply to messages, taking these messages into consideration?"

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

//- siganlR -- siganlR -- siganlR -



  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5016/chat")
        .configureLogging(LogLevel.Information)
        .build();



      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);

        

      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      await setConnection(connection);



    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      if (connection) { 

        await connection.invoke("SendMessage", message);
      } else {
        console.log("The connection has not been established yet.");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }


  const handleInputChange = (text) => {
    setInputValue(text);
  };


  const handleOnEnter = (text) => {
    if (text.trim() !== '') {
      setInputValue('');
      sendMessage(text)

    }
  };




  const onFinish = (values) => {
    // console.log('Success:', values.mesaj);


  };

  useEffect(() => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    joinRoom(Cookies.get("Username"), "44");
    console.log("use effect")
  }, []);

  return (
    <div style={{ height: '96vh', marginTop: "2vh", marginBottom: "2vh" }}>
      <div style={{ position: 'relative', minHeight: 'calc(96vh - 2.4vw)', padding: "1.2vw", background: "white", borderRadius: "2vw", backgroundColor: "lightseagreen" }}>
        {/* Profil ve Butonlar - position:fixed*/}
        <div style={{
          background: '#fff', padding: '2vh', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: "space-around" }}>
            <Avatar src={<img src={url} alt="avatar" />} />
            <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
              <a>name</a>
              <a>Email</a>

            </div >
          </div>
          <Button type="text" onClick={showModal}><Avatar src={res5}></Avatar></Button>
        </div>

        {/* Mesajlar margintop, background, maxwidth*/}
        <div style={{ marginTop: '15px', marginBottom: '0px', overflowY: 'auto', maxHeight: '75vh' }} ref={messagesContainerRef}>
          {messages.map((messages, index) => (
            <div key={index} style={{
              marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px', maxWidth: '35%',
              alignSelf: 'flex-end', background: '#f0f0f0', wordWrap: 'break-word', backgroundColor: "lightblue"
            }}>{messages.message}</div>
          ))}
        </div>

        {/* Input (position absolute- relative karmaşası padding: '10px',paddingTop:'0px',)*/}
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