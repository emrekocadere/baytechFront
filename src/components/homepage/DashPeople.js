import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import axios from 'axios';
import { Badge } from 'antd';
import Cookies from 'js-cookie';
const { Search } = Input;
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';// rup içinde bir url
const ContainerHeight = 400;
const DashPeople = () => {
    const [friendsData, setFriendsData] = useState([]);
    const [groupsData, setGroupsData] = useState([]);
    const [userId, setUserId] = useState([]);
    // const appendData = () => {
    //     fetch(fakeDataUrl)
    //         .then((res) => res.json())
    //         .then((body) => {
    //             setData(data.concat(body.results));
    //         });
    // };
    // useEffect(() => {
    //     appendData();
    // }, []);
    // const onScroll = (e) => {
    //     // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    //     if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
    //         appendData();
    //     }
    // };
    

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
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    return (
        <div style={{ width:"30vw"}} >

           
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{marginBlock:"1vw"}}
                   
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