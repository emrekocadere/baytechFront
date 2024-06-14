import React from 'react';
import { Avatar, Flex, Space } from 'antd'
import { Divider } from 'antd';
import res5 from "../../profileImages/Aang.png"
import Cookies from 'js-cookie';
import { Typography } from 'antd';
import { Button,Badge } from "antd";
import axios from 'axios';
const { Text, Link } = Typography;

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';




const Profile = ({name,email,isOnline,IsSend,AddFriendNotify,username,abc}) => {
  
const AddFirend=()=>{

    AddFriendNotify(username,abc);
}

    
    return (
        <div style={{ display: "inline-block", background: "white", border: "1vh solid white", borderRadius: "5vh", width: "30vw", height: "94vh" }}>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "27vh" }}>
                <Avatar src={res5} style={{ height: "20vh", width: "10vw" }} />

                {(() => {
                      switch (isOnline) {
                        case true: return <div><Badge status="success" text="Online" /></div>;
                        case false: return <div><Badge status="error" text="Ofline" /></div>;
                   
                      }
                    })()}

            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Text strong>{name}</Text>
                {/* <Text strong>{email}</Text> */}
            </div>


            <Divider></Divider>

            <div style={{display:"flex", justifyContent:"space-around"}}>
            <Button type="primary" onClick={AddFirend}>Add Friend</Button>
           
            </div>



            <Divider></Divider>



        </div>
    );



}
export default Profile;