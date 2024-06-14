import React, { useState, useRef, useEffect, useMemo } from 'react';
import FormItem from 'antd/es/form/FormItem';
import { Col, Row } from 'antd';
import { Typography,notification } from 'antd';
import Profile from './Profile';
import Navbar from './navbar';
import DashPeople from './DashPeople';
import Chat from './Chat';
import InputEmoji from "react-input-emoji";
import Cookies from 'universal-cookie';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import axios from 'axios';


// ----
import res5 from "../../profileImages/gemini.avif"
import { Avatar, Button, Form, Input, message } from 'antd';
import { Modal } from 'antd';
//-----




const HomePage = () => {
  // const onFinish = (values) => {
  //   console.log('Received values of form: ', values);
  // };
  const [geminiResponse, setgeminiResponse] = useState([]);
  const [activeComponent, setActiveComponent] = useState('DashPeople');
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [isOnline, setisOnline] = useState([]);
  const [abc, setAbc] = useState([]);
  const [selectedUser, setselectedUser] = useState([]);
  const [isSend, setisSend] = useState([]);
  //const [friend,setFriend]= useState([]);
  let friend;
  //-----
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState([]);
  const [geminiTitle, setgeminiTitle] = useState('AI by Gemini');
  const messagesContainerRef = useRef(null);
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };



  const AddFriend = () => {
    
    let Req = {
      Username1:cookies.get("Username"),
      Username2:friend
    }
    console.log("Req",Req);

    axios.post('http://localhost:5016/api/baytech/AddFriend', Req)
    .then(function (response) {
      console.log(response);
      
    })
    .catch(function (error) {
      console.log(error);
      message.error("Username or password is incorrect!");
    });
    
  };

  const btn = (
    <dvi>
        <Button type="link" size="small" >
          reddet
        </Button>
        <Button type="primary" size="small" onClick={AddFriend}  >
          kabul et
        </Button>
    </dvi>
    
      
    );
    
    const { Title } = Typography;
    const openNotification = (values) => {
      notification.open({
        message: values,
       
        
          btn,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    };
  const SendMessageToGemini = (values) => {
    // let str = "";
    // messages.forEach(obj => {
    //   str += obj.messages.toString();
    // });
    let geminiReq = {
      message: values,
      Username:cookies.get("Username")
    }

    axios.post('http://localhost:5016/api/baytech/PrivateGemini', geminiReq)
      .then(function (response) {
        setgeminiResponse(response.data.candidates[0].content.parts[0].text);
        getMessages(cookies.get("Username"),"Gemini")
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
      message: str + " Bu mesajları dikkate alarak, bu mesajlara nasıl bir cevap verebilirim??"
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

  const emotionGemini = () => {
    let str = "";
    messages.forEach(obj => {
      str += obj.message.toString();
    });
    let geminiReq = {
      message: str + " Bu mesajların duygusal yoğunluğu nedir??"
    }
    console.log("emotionGemini",geminiReq)

    axios.post('http://localhost:5016/api/baytech/Gemini', geminiReq)
      .then(function (response) {
        setgeminiResponse(response.data.candidates[0].content.parts[0].text);
      })
      .catch(function (error) {
        console.log(error);
        message.error("Username or password is incorrect!");
      });
  };


  const handleOk = () => {
    // setgeminiResponse("");
    setIsModalOpen(false);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleOnEnter = (text) => {
    if (text.trim() !== '') {
      setInputValue('');
      if (selectedUser == "Gemini") {
        SendMessageToGemini(text)
      }
      else {
        sendMessage(selectedUser, text);
      }
    }
  };


  const getMessages = (username1, username2) => {
    let req = {
      UserOneName: username1,
      UserTwoName: username2
    }
    axios.post('http://localhost:5016/api/baytech/GetMessages', req)
      .then(function (response) {
        console.log("res", response)
        setMessages(response.data)
      })
      .catch(function (error) {
        console.log(error);

      });
  };


  const joinRoom = async (username) => {
    try {
      let conn = new HubConnectionBuilder()
        .withUrl(`http://localhost:5016/chathub?username=${username}`, { accessTokenFactory: () => cookies.get("token") })
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("ReceiveMessage", (message) => {
        // setMessages(prevMessages => [...prevMessages, message]);
        console.log("receive", selectedUser)
        getMessages(cookies.get("Username"), selectedUser);

      });

      conn.on("Notify", (notification,user) => {
        openNotification(notification);
        friend=user;
        
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
        getMessages(cookies.get("Username"), selectedUser);
      } else {
        console.log("Connection not established.");
      }
    } catch (e) {
      console.log(e);
    }
  };


  const AddFriendNotify = async (username, tousername) => {
    try {

      if (connection) {
        console.log("AddFriendNotify")
        await connection.invoke("AddFriendNotify", username, abc)


      } else {
        console.log("Connection not established.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //-----


  const cookies = new Cookies();
  const handleNavbarItemClick = (key) => {
    setActiveComponent(key);


    setName(cookies.get('Username'))
    setEmail(cookies.get('Email'))
  };




  const handleDashPeopleSelection = (value, value2) => {
    setName(value2.label)
    setEmail(value2.label)
    //setisOnline(value2.isOnline)
    setActiveComponent('Profile');

  };

  const SelectedUser = (value2) => {
    setselectedUser(value2);
    console.log(value2)
  };

  const SelectedAbc = (value2) => {

    setAbc(value2)
    console.log("Homepae", value2)
  };

  const IsSend = () => {

    setisSend(true);
    console.log(isSend);
  };

  const IsSendFalse = async () => {

    await setisSend(false);
    console.log(isSend)
  };

  useEffect(() => {
    joinRoom(cookies.get("Username"));
    setUsername(cookies.get("Username"));

  }, []);

   useEffect(() => {
    getMessages(cookies.get("Username"),selectedUser)
    setUsername(cookies.get("Username"))

  }, [selectedUser]);

  useEffect(() => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);


  useEffect(() => {

    //console.log("Chat",isSend)
    if (isSend == true) {

      AddFriendNotify()
    }

  }, [abc]);

  return (
    <div style={{ background: "#eef6fb", height: "100vh" }}>
      

      <Row>
        <Col span={2} ><Navbar onItemClick={handleNavbarItemClick} /></Col>

        <Col span={10} style={{ display: "flex", justifyContent: "center", alignItems: "center"}} >
          {activeComponent === 'Profile' && <Profile name={name} email={email} isOnline={isOnline} IsSend={IsSend} AddFriendNotify={AddFriendNotify} abc={abc} username={username} />}
          {activeComponent === 'DashPeople' && <DashPeople onSelection={handleDashPeopleSelection} SelectedUserProp={SelectedUser} SelectedAbcProp={SelectedAbc} AddFriendNotify={AddFriendNotify} />}
        </Col>

        {/* <Col span={12} ><Chat isSend={isSend} selectedUserProp={selectedUser} selectedAbcProp={abc} setisSend={IsSendFalse} ></Chat></Col> */}
        <Col span={12} >
          <div style={{ height: '96vh', marginTop: "2vh", marginBottom: "2vh" }}>
            <div style={{ position: 'relative', minHeight: 'calc(96vh - 2.4vw)', padding: "1.2vw", background: "white", borderRadius: "2vw", backgroundColor: "lightseagreen" }}>
              <div style={{
                background: '#fff', padding: '2vh', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center'
              }}>



                <div style={{ display: 'flex', justifyContent: "space-around" }}>
                  {/* <Avatar src={<img src={url} alt="avatar" />} /> */}
                  <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                    <a>{selectedUser}</a>
                    
                  </div>
                </div>
                <Button type="text" onClick={showModal}><Avatar src={res5}></Avatar></Button>
              </div>


              <div style={{ marginTop: '15px', marginBottom: '0px', overflowY: 'auto', maxHeight: '73vh' }} ref={messagesContainerRef}>
                {messages.map((message, index) => (
                  <div key={index} style={{
                    marginBottom: '10px', padding: '10px', border: '0.12vw solid lightblue', borderRadius: '3vw', width: '15vw',
                    display: 'flex',
                    marginLeft: message.senderUsername === username ? '28vw' : '0px',
                    // borderWidth: message.senderUsername === 'amdin' ? '30vw' : '0px',
                    background: '#f0f0f0', backgroundColor: "lightblue"
                  }}>{message.message}</div>
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
          </Col>
      </Row>
    </div>
  );
};
export default HomePage;

