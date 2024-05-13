import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import axios from 'axios';
import { Badge } from 'antd';
import Cookies from 'js-cookie';
import { Select } from 'antd';
const { Search } = Input;
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';// rup içinde bir url
const ContainerHeight = 400;
const DashPeople = () => {
    const [friendsData, setFriendsData] = useState([]);
    const [groupsData, setGroupsData] = useState([]);
    const [userId, setUserId] = useState([]);


    const [data, setData] = useState([]);
  const [value, setValue] = useState();


    let friends;
    let groups;

        useEffect(() => {
        let request = { 
            Id: Cookies.get("Id")
          }
        axios.post('http://localhost:5016/api/baytech/ReturnFriends',request)
    .then(function (response) {
      console.log(response);
        friends=response.data
        console.log(friends)
        setFriendsData(response.data)
    })
    .catch(function (error) {
      console.log(error);
      message.error("Username or password is incorrect!");
    });

    axios.post('http://localhost:5016/api/baytech/ReturnGroups',request)
    .then(function (response) {
      console.log(response);
      groups=response.data
        console.log(groups)
        setGroupsData(response.data)
    })
    .catch(function (error) {
      console.log(error);
      message.error("Username or password is incorrect!");
    });

    
      }, []);

    const gridConfig = {
        gutter: 16,
        column: 4
      };

      const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (newValue) => {
    console.log(newValue)

  };
  const handleSearch = (newValue) => {
    let request={
        Search:newValue
    }
    axios.post('http://localhost:5016/api/baytech/returnabc',request)
    .then(function (response) {
      console.log(response);
        setData(response.data)
    })
    .catch(function (error) {
      console.log(error);
      message.error("Username or password is incorrect!");
    });
  };
    
    return (
        <div style={{ width:"30vw"}} >

           
<Select
      showSearch
      value={value}
      placeholder="Arama"
      style={{width:"30vw"}}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
     onSearch={handleSearch}
      //onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        label: d.userName,
        value: d.Id,
      }))}
    />
           
            <div >
                <List style={{ padding: "1.2vw", background: "white",borderRadius:"2vw",marginBottom:"1vw"}} >
                    <h3>Chats</h3>
                    <VirtualList
                        data={friendsData}
                        height="13vw"
                        itemHeight={47}
                        itemKey="email"
                        //onScroll={onScroll}
                        
                    >
                        {(item) => (
                            <List.Item key={item.email} >
                                <List.Item.Meta
                                     avatar={<Avatar src={item.picture} />}
                                     title={<a href="https://ant.design">{item.userName}</a>}
                                    description={item.email}
                                />
                                  <div><Badge status="success" text="Success" /></div>
                            </List.Item>
                        )}
                    </VirtualList>
                </List>



                <List style={{ padding: "1.2vw", background: "white",borderRadius:"2vw"}} >
                    <h3>Groups</h3>
                    <VirtualList
                        data={groupsData}
                        height="13vw"
                        itemHeight={47}
                        itemKey="email"
                       // onScroll={onScroll}
                        
                    >
                        {(item) => (
                            <List.Item key={item.email} >
                                <List.Item.Meta
                                     avatar={<Avatar src={item.picture} />}
                                    title={<a href="https://ant.design">{item.name}</a>}
                                    description={item.email}
                                />
                              
                            </List.Item>
                        )}
                    </VirtualList>
                </List> 
            </div>


             



        </div>


    );
};
export default DashPeople;