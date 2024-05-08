import React from "react";
import { Button, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons";
import { FileOutlined } from "@ant-design/icons";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { StarOutlined } from "@ant-design/icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Navbar from "../homepage/navbar";
import { Space } from "antd";
import { Col, Row } from "antd";
import { Input } from "antd";
import { Switch } from "antd";
import { Typography } from "antd";
const { Title } = Typography;
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};
const AccountButton = () => (
  <>
    <div style={{ display: "flex", flexDirection: "column", background: "#eef6fb" }}>
      <Row >
        <Col span={4} style={{}}>
          <Navbar />

        </Col>
        <Col span={17} style={{ display: "flex" }}>
          <div style={{display:"block",justifyContent:"center",alignItems:"center"}}>
            <Title style={{display:"flex",justifyContent:"center",color:"#6e00ff"}}>SETTINGS</Title>
            <div
              style={{
                background: "white",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "1vw",
               padding:"10vw",
                borderRadius: "4vh",
                
                marginBottom: "25vw"


              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                Last Seen <Switch defaultChecked onChange={onChange} />
              </div>
              <div style={{ marginTop: "4vh", display: "flex", justifyContent: "space-between" }}>
                Profil fotoğrafının arkadaşlara gözükmesi?{" "}
                <Switch defaultChecked onChange={onChange} />
              </div>
              <div style={{ marginTop: "4vh", display: "flex", justifyContent: "space-between" }}>
                Arkadaş harici profil görüntülenebiir mi?
                <Switch defaultChecked onChange={onChange} />
              </div>
              <div style={{ paddingBottom: "1vh", marginTop: "4vh" }}>
                İsim değiştirme <Input style={{ width: "15vw" }} placeholder="Yeni Ad" />
                <Button type="primary" ghost>
                  Değiştir
                </Button>
              </div>

            </div>
          </div>

        </Col>
      </Row>
    </div>
  </>
);
export default AccountButton;
