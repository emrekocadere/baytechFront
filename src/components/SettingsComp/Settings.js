import React from "react";
import { Button, Flex } from "antd";
import { InboxOutlined,UploadOutlined } from '@ant-design/icons';
import Navbar from "../homepage/navbar";
import { Space } from "antd";
import { message, Upload } from 'antd';
import { Col, Row } from "antd";
import { Input } from "antd";
import { Switch } from "antd";
import { Typography } from "antd";
import axios from 'axios';
import Cookies from 'universal-cookie';
const { Title } = Typography;
const { Dragger } = Upload;


const props = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

const ChangeUsername = (event) => {
  const cookies = new Cookies();
  const newUsername = event.target.value;
  let customReq={
    Id: cookies.get('Id'),   
    Username:newUsername
  };

  axios.post('http://localhost:5016/api/baytech/ChangeName',customReq)
  .then(function (response) {

  })
  .catch(function (error) {
    console.log(error);
    message.error("Username or password is incorrect!");
  });
  
  
};
const AccountButton = () => (
  <>
    <div style={{ display: "flex", flexDirection: "column", background: "#eef6fb" }}>
      <Row >
        <Col span={4} style={{}}>
          <Navbar />

        </Col>
        <Col span={17} style={{ display: "flex" }}>
          <div style={{ display: "block", justifyContent: "center", alignItems: "center" }}>
            <Title style={{ display: "flex", justifyContent: "center", color: "#6e00ff" }}>SETTINGS</Title>
            <div
              style={{
                background: "white",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "1vw",
                padding: "8vw",
                borderRadius: "4vh",

                marginBottom: "20vw"


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
                İsim değiştirme <Input style={{ width: "15vw" }} placeholder="Yeni Ad" onPressEnter={ChangeUsername} />
                {/* <Button type="primary" ghost >
                  Değiştir
                </Button> */}
              </div>

              <div>
              <Upload {...props}>
       <Button icon={<UploadOutlined />}>Click to Upload</Button>
           </Upload>
              </div>
            </div>

          </div>

        </Col>
      </Row>
    </div>
  </>
);
export default AccountButton;
