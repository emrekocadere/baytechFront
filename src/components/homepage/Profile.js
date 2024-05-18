import React from 'react';
import { Avatar, Flex, Space } from 'antd'
import { Divider } from 'antd';
import res5 from "../../profileImages/Aang.png"
import Cookies from 'universal-cookie';
import { Typography } from 'antd';
import { Button,Badge } from "antd";
const { Text, Link } = Typography;

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';




const Profile = (props) => {


    const cookies = new Cookies();
    return (
        <div style={{ display: "inline-block", background: "white", border: "1vh solid white", borderRadius: "5vh", width: "30vw", height: "94vh" }}>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "27vh" }}>
                <Avatar src={res5} style={{ height: "20vh", width: "10vw" }} />

                {(() => {
                      switch (props.isOnline) {
                        case true: return <div><Badge status="success" text="Online" /></div>;
                        case false: return <div><Badge status="error" text="Ofline" /></div>;
                   
                      }
                    })()}

            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Text strong>{props.name}</Text>
                <Text strong>{props.email}</Text>
            </div>


            <Divider></Divider>

            <div style={{display:"flex", justifyContent:"space-around"}}>
            <Button type="primary">Arkadaş Ekle</Button>
            <Button type="primary">Mesaj At</Button>
            </div>



            <Divider></Divider>


            <div style={{ display: "flex", flexDirection: "column", height: "27vh" }}>
                <h3>Common Groups</h3>

                <Avatar src={<img src={url} alt="avatar" />} />
                <Avatar src={<img src={url} alt="avatar" />} />
                <Avatar src={<img src={url} alt="avatar" />} />
            </div>
        </div>
    );



}
export default Profile;