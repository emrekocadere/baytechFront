// import React, { useState, useRef, useEffect } from 'react';
// import { Avatar, Button, Input, Divider } from 'antd';
// import { BellOutlined, PhoneOutlined, VideoCameraOutlined, MoreOutlined, PaperClipOutlined, CameraOutlined, AudioOutlined } from '@ant-design/icons';

// import InputEmoji from "react-input-emoji";

// const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';


// const Chat = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputValue, setInputValue] = useState('');
//     const messagesContainerRef = useRef(null);

//     const handleInputChange = (e) => {
//         setInputValue(e.target.value);
//     };

//     const handleEnterPress = (e) => {
//         if (e.key === 'Enter' && inputValue.trim() !== '') {
//             setMessages([...messages, inputValue]);
//             setInputValue('');
//             onFinish({ message: inputValue }); // onFinish fonksiyonunu çağırarak değeri iletebilirsin.
//         }
//     };

//     const onFinish = (values) => {
//         console.log('Success:', values);
//         const { message } = values;
//       };

//     useEffect(() => {
//         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//     }, [messages]);

//     return (
//         <div style={{ position: 'relative', minHeight: '92vh', padding: "1.2vw", background: "white",borderRadius:"2vw",marginBottom:"1vw"}}>
//             {/* Profil ve Butonlar - position:fixed*/}
//             <div style={{ position:'relative', top: 0, left: 0, right: 0, background: '#fff', padding: '10px', display: 'flex',
//              justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <Avatar src={<img src={url} alt="avatar" />} />
//                     <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
//                         <a>anıl</a>
//                         <a>dsfcdsf@gmail.com</a>
//                     </div>
//                 </div>
//                 <div>
//                     <Button type="text"><BellOutlined /></Button>
//                     <Button type="text"><PhoneOutlined /></Button>
//                     <Button type="text"><VideoCameraOutlined /></Button>
//                     <Button type="text"><MoreOutlined /></Button>
//                 </div>
//             </div>

//             {/* Mesajlar */}
//             {/*<div style={{ background: 'red',padding: '60px 10px 60px', overflowY: 'auto' }}>*/}
//             <div style={{ marginTop: '0px', marginBottom: '0px', overflowY: 'auto', maxHeight: '80vh' }} ref={messagesContainerRef}>
//                 {messages.map((message, index) => (
//                     <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px', maxWidth: '80%',
//                      alignSelf: 'flex-end', background: '#f0f0f0', wordWrap: 'break-word' }}>{message}</div>
//                 ))}
//                 {/*<div ref={messagesEndRef} />*/}
//             </div>

//             {/* Input (position absolute- relative karmaşası padding: '10px',paddingTop:'0px',)*/}
//             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', background: '#fff', display: 'flex',
//              justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ddd' }}>
//                 <Input
//                     size="large"
//                     placeholder="Type your message here"
//                     prefix={<Button type='text'><PaperClipOutlined /></Button>}
//                     suffix={
//                         <div>
//                             <Button type='text'><CameraOutlined /></Button>
//                             <Button type='text'><AudioOutlined /></Button>
//                         </div>
//                     }
//                     style={{ width: 'calc(100% - 40px)' }}
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     onKeyDown={handleEnterPress}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Chat;

import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Button, Form, Input, message } from 'antd';
import { BellOutlined, PhoneOutlined, VideoCameraOutlined, MoreOutlined, PaperClipOutlined, CameraOutlined, AudioOutlined } from '@ant-design/icons';
import InputEmoji from "react-input-emoji";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Cookies from 'js-cookie';
import axios from 'axios';
import { Modal } from 'antd';
import "./style.css";


const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const Chat = () => {


  const [chatroom, setChatroom] = useState();

  const [inputValue, setInputValue] = useState('');

  const messagesContainerRef = useRef(null);
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  //const [mesaj, setMesaj] = useState([]);

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
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishh = (values) => {
    //     console.log('Received values of form: ', values);

    //     const cookies = new Cookies();
    // cookies.set('myCat', 'Pacman', { path: '/' });
    // console.log(cookies.get('myCat')); // Pacman
    let str;
    messages.forEach(obj => {
     str=str+=obj.message.toString();
   });
    let geminiReq = {
      message: str+" bu mesajların duygu yoğunluğu nedir?"

    }
  

    axios.post('http://localhost:5016/api/baytech/Gemini', geminiReq)
      .then(function (response) {

       setgeminiResponse(response.data.candidates[0].content.parts[0].text);
        showModal();
      })
      .catch(function (error) {
        console.log(error);
        message.error("Username or password is incorrect!");
      });
  };

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5016/chat")
        .configureLogging(LogLevel.Information)
        .build();


      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
   
        //gelen mesajlar

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

  const sendMessage = async (mesajj) => {
    try {
      if (connection) { // connection değişkeni tanımlıysa işlemi gerçekleştir

        await connection.invoke("SendMessage", mesajj);
      } else {
        console.log("Bağlantı henüz kurulmadı.");
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
      //setMesaj([...mesaj, text]);
      setInputValue('');
      //onFinish({ mesaj: text }); // onFinish fonksiyonunu çağırarak değeri iletebilirsin.
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
    joinRoom(Cookies.get("Username"), "team44");
    // // let Request={
    // //   Id:2
    // // }
    //       axios.post('http://localhost:5016/api/baytech/Chat',Request)
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);

    // });

  }, []);

  return (
    <div style={{ height: '96vh', overflowY: 'auto', marginTop: "2vh", marginBottom: "2vh" }}>
    <div style={{ position: 'relative', minHeight: 'calc(96vh - 2.4vw)', padding: "1.2vw", background: "white", borderRadius: "2vw", backgroundColor: "lightseagreen" }}>
      {/* Profil ve Butonlar - position:fixed*/}
      <div style={{
        position: 'relative', top: 0, left: 0, right: 0, background: '#fff', padding: '10px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={<img src={url} alt="avatar" />} />
          <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
            <a>anıl</a>
            <a>dsfcdsf@gmail.com</a>
          </div>
        </div>
        <div>
          <Button type="text"><BellOutlined /></Button>
          <Button type="text"><PhoneOutlined /></Button>
          <Button type="text"><VideoCameraOutlined /></Button>
          <Button type="text"><MoreOutlined /></Button>
        </div>
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
                <Button type='text' onClick={onFinishh}><CameraOutlined /></Button>

              
                <Modal title= {geminiResponse} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  {geminiResponse}
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