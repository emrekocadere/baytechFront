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
import { Avatar, Button, Form, Input } from 'antd';
import { BellOutlined, PhoneOutlined, VideoCameraOutlined, MoreOutlined, PaperClipOutlined, CameraOutlined, AudioOutlined } from '@ant-design/icons';
import InputEmoji from "react-input-emoji";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Cookies from 'js-cookie';

import "./style.css";


const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const Chat = () => {

 
    const [chatroom, setChatroom] = useState();

    const [inputValue, setInputValue] = useState('');
    const [currentMeesage, setCurrentMeesage] = useState('');
    const messagesContainerRef = useRef(null);
    const [connection, setConnection] = useState();
   const [messages, setMessages] = useState([]);
   const [mesaj, setMesaj] = useState([]);
   
    const [users, setUsers] = useState([]);
  

    const request = {
      UserId: Cookies.get("Id")
  }

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
    
      const sendMessage = async (mesaj) => {
        try {
         if (connection) { // connection değişkeni tanımlıysa işlemi gerçekleştir
            await connection.("SendMessage", mesaj);
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
                setMesaj([...mesaj, text]);
                setInputValue('');
                onFinish({ mesaj: text }); // onFinish fonksiyonunu çağırarak değeri iletebilirsin.
                sendMessage(text)
  
            }
        };


        const onFinish = (values) => {
            console.log('Success:', values.mesaj);
            setCurrentMeesage(values.mesaj);
         
        };

        useEffect(() => {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }, [mesaj]);

        useEffect(() => {
          joinRoom(Cookies.get("Id"), "team44");
      }, []);

        return (
            <div style={{ position: 'relative', minHeight: '92vh', padding: "1.2vw", background: "white", borderRadius: "2vw", marginBottom: "1vw",backgroundColor:"lightseagreen" }}>
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

                {/* Mesajlar */}  
                <div style={{ marginTop: '15px', marginBottom: '0px', overflowY: 'auto', maxHeight: '75vh' }} ref={messagesContainerRef}>
                    {messages.map((messages, index) => (
                        <div key={index} style={{
                            marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px', maxWidth: '35%',
                            alignSelf: 'flex-end', background: '#f0f0f0', wordWrap: 'break-word', backgroundColor:"lightblue" 
                        }}>{messages.message}</div>
                    ))}
                </div>

                {/* Input (position absolute- relative karmaşası padding: '10px',paddingTop:'0px',)*/}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', background: '#fff', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ddd',backgroundColor:"saddlebrown"     
                }}>
                    <Form style={{maxHeight:"12vh"}}>
                        <Input
                        
                            size="large"
                            placeholder="Type your message here"
                            value={inputValue}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onPressEnter={() => handleOnEnter(inputValue)}
                            style={{ width: 'calc(100% + 530px)',maxHeight:"12vh" }}
                            prefix={<Button type='text'><PaperClipOutlined /></Button>}
                            suffix={
                                <div>
                                    <Button type='text'><CameraOutlined /></Button>
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
                    </Form>
                </div>
            </div>
        );
    };

    export default Chat;

