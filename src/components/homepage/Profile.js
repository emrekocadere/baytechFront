import React from 'react';
import { Avatar, Space } from 'antd'
import { Divider } from 'antd';
import res5 from "../../resim1.png"

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';




const Profile = () => (
    <div style={{display:"inline-block", background:"white",  border: "1vh solid white", borderRadius: "5vh", width:"30vw",height:"100vh"}}>
        <div style={{ display: "flex", flexDirection: "column",justifyContent:"center", alignItems:"center",height:"27vh"}}>
            <Avatar src={<img src={res5} alt="avatar" />} style={{height:"20vh", width:"10vw"}}/>
            <a styl>anıl</a>
            <a>aısdfsdf@gsdf.com</a>
        </div>
        <Divider></Divider>
        <div style={{ display: "flex", flexDirection: "column",height:"27vh" }}>
            <h3>Media, Links</h3>
            <a>dosyalar burada olucak 3 tanesi</a>
        </div>
        <Divider></Divider>
        <div style={{ display: "flex", flexDirection: "column",height:"27vh" }}>
            <h3>Common Groups</h3>

            <Avatar src={<img src={url} alt="avatar" />} />
            <Avatar src={<img src={url} alt="avatar" />} />
            <Avatar src={<img src={url} alt="avatar" />} />
        </div>
    </div>


);
export default Profile;