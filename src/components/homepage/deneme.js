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