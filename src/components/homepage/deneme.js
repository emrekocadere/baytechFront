// import React, { useState, useRef, useEffect } from 'react';
// import { Avatar, Button, Input } from 'antd';
// import { BellOutlined, PhoneOutlined, VideoCameraOutlined, MoreOutlined, PaperClipOutlined, CameraOutlined, AudioOutlined } from '@ant-design/icons';

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
//         }
//     };

//     useEffect(() => {
//         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//     }, [messages]);

//     return (
//         <div style={{ position: 'relative', minHeight: '92vh', padding: "1.2vw", background: "white", borderRadius: "2vw", marginBottom: "1vw" }}>
//             {/* Profil ve Butonlar */}
//             <div style={{ background: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
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
//             <div style={{ overflowY: 'auto', maxHeight: '80vh', padding: '10px' }} ref={messagesContainerRef}>
//                 {messages.map((message, index) => (
//                     <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px', maxWidth: '80%', alignSelf: 'flex-end', background: '#f0f0f0', wordWrap: 'break-word' }}>{message}</div>
//                 ))}
//             </div>

//             {/* Input */}
//             <div style={{ background: '#fff', padding: '10px', borderTop: '1px solid #ddd' }}>
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

//import 'bootstrap/dist/css/bootstrap.min.css';*****

function foo(){
    console.log(a);
    console.log(b());

    var a = "hello";
    function b(){
        return "world";
    }
}

foo();

// //chat.js chat kısmı position relative yerine grow la yapılmış hali
// import React, { useState, useRef, useEffect } from 'react';
// import { Avatar, Button, Form, Input, message, Modal } from 'antd';
// import { BellOutlined, PhoneOutlined, VideoCameraOutlined, MoreOutlined, PaperClipOutlined, CameraOutlined, AudioOutlined } from '@ant-design/icons';
// import InputEmoji from "react-input-emoji";
// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import res5 from "../../profileImages/gemini.avif";

// const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

// const Chat = (props) => {
//   const [inputValue, setInputValue] = useState('');
//   const [geminiTitle, setgeminiTitle] = useState('AI by Gemini');
//   const messagesContainerRef = useRef(null);
//   const [connection, setConnection] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [GeminiMessage, setGeminiMessage] = useState([]);
//   const [username, setUsername] = useState([]);
//   const [geminiResponse, setgeminiResponse] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const request = {
//     UserId: Cookies.get("Id")
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setgeminiResponse("");
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const getMessages = (username1, username2) => {
//     let req = {
//       UserOneName: username1,
//       UserTwoName: username2
//     };
//     axios.post('http://localhost:5016/api/baytech/GetMessages', req)
//       .then(function (response) {
//         console.log("res", response);
//         setMessages(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   const SendMessageToGemini = (values) => {
//     let geminiReq = {
//       message: values,
//       Username: Cookies.get("Username")
//     };

//     axios.post('http://localhost:5016/api/baytech/PrivateGemini', geminiReq)
//       .then(function (response) {
//         setgeminiResponse(response.data.candidates[0].content.parts[0].text);
//         getMessages(Cookies.get("Username"), "Gemini");
//       })
//       .catch(function (error) {
//         console.log(error);
//         message.error("Username or password is incorrect!");
//       });
//   };

//   const joinRoom = async (username) => {
//     try {
//       let conn = new HubConnectionBuilder()
//       .withUrl(`http://localhost:5016/chathub?username=${username}`, { accessTokenFactory: () => Cookies.get("token") })
//         .configureLogging(LogLevel.Information)
//         .build();

//       conn.on("ReceiveMessage", (message) => {
//         console.log("receive", props.selectedUserProp);
//         getMessages(Cookies.get("Username"), props.selectedUserProp);
//       });

//       conn.on("Notify", (notification) => {
//         alert(notification);
//       });

//       conn.onclose(e => {
//         setConnection(null);
//         setMessages([]);
//       });

//       await conn.start();
//       setConnection(conn);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const sendMessage = async (toUser, message) => {
//     try {
//       if (connection) {
//         await connection.invoke("SendPrivateMessage", toUser, message);
//         getMessages(Cookies.get("Username"), props.selectedUserProp);
//       } else {
//         console.log("Connection not established.");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleInputChange = (text) => {
//     setInputValue(text);
//   };

//   const handleOnEnter = (text) => {
//     if (text.trim() !== '') {
//       setInputValue('');
//       if (props.selectedUserProp == "Gemini") {
//         SendMessageToGemini(text);
//       } else {
//         sendMessage(props.selectedUserProp, text);
//       }
//     }
//   };

//   const connect = () => {
//     joinRoom(Cookies.get("Username"));
//   };

//   useEffect(() => {
//     messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//   }, [messages]);

//   useEffect(() => {
//     getMessages(Cookies.get("Username"), props.selectedUserProp);
//     setUsername(Cookies.get("Username"));
//   }, [props.selectedUserProp]);

//   return (
//     <div style={{ height: '96vh', marginTop: "2vh", marginBottom: "2vh" }}>
//       <div style={{
//         display: 'flex', flexDirection: 'column', height: '100%', background: 'white', borderRadius: '2vw', backgroundColor: 'lightseagreen'
//       }}>
//         <div style={{
//           background: '#fff', padding: '2vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
//         }}>
//           <Button onClick={connect}>connect</Button>
//           <div style={{ display: 'flex', justifyContent: "space-around" }}>
//             <Avatar src={<img src={url} alt="avatar" />} />
//             <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
//               <a>{props.selectedUserProp}</a>
//               <a>Email</a>
//             </div>
//           </div>
//           <Button type="text" onClick={showModal}><Avatar src={res5}></Avatar></Button>
//         </div>
//         <div style={{ flexGrow: 1, marginTop: '15px', marginBottom: '0px', overflowY: 'auto' }} ref={messagesContainerRef}>
//           {messages.map((message, index) => (
//             <div key={index} style={{
//               marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px', maxWidth: '35%',
//               alignSelf: 'flex-end', background: '#f0f0f0', wordWrap: 'break-word', backgroundColor: 'lightblue'
//             }}>{message.message}</div>
//           ))}
//         </div>
//         <div style={{
//           padding: '10px', background: '#fff', display: 'flex',
//           justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid lightseagreen', backgroundColor: 'lightseagreen', borderBottomLeftRadius: '2vw', borderBottomRightRadius: '2vw'
//         }}>
//           <Form style={{ maxHeight: "12vh", width: '100%' }}>
//             <div style={{ margin: '0 auto', width: 'calc(100% - 20px)' }}>
//               <Input
//                 size="large"
//                 placeholder="Type your message here"
//                 value={inputValue}
//                 onChange={(e) => handleInputChange(e.target.value)}
//                 onPressEnter={() => handleOnEnter(inputValue)}
//                 style={{ width: '100%', maxHeight: "12vh" }}
//                 prefix={<Button type='text'><PaperClipOutlined /></Button>}
//                 suffix={
//                   <div>
//                     <Modal title={geminiTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//                       <div>
//                         <div>
//                           {geminiResponse}
//                         </div>
//                       </div>
//                     </Modal>
//                     <Button type='text'><AudioOutlined /></Button>
//                     <InputEmoji
//                       value={inputValue}
//                       onChange={handleInputChange}
//                       cleanOnEnter
//                       onEnter={handleOnEnter}
//                       placeholder="a"
//                       borderColor='white'
//                       fontSize={0}
//                       disableEmojiPicker={true}
//                     />
//                   </div>
//                 }
//               />
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;