import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import {
    TeamOutlined,
    UserAddOutlined,
    UsergroupAddOutlined
  } from '@ant-design/icons';
const Calls = () => (
  <Flex gap="small" vertical>
    <Flex wrap="wrap" gap="small">
      <Button type="primary" shape="circle" style={{ width: '8vw', height: '8vh', fontSize: 40}}>
      <TeamOutlined />
      </Button>
      <Button type="primary" shape="circle" style={{ width: '8vw', height: '8vh', fontSize: 40}}>
      <UserAddOutlined />
      </Button>
      <Button type="primary" shape="circle" style={{ width: '8vw', height: '8vh', fontSize: 40}}>
      <UsergroupAddOutlined />
      </Button>
    </Flex>
  </Flex>
);
export default Calls;