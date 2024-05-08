import React from 'react';
import { useState } from 'react';
import Chat from './Chat';
import Profile from './Profile';
import DashPeople from './DashPeople';

const Profilee = () => <div><Profile/></div>;
const DashPeoplee = () => <div><DashPeople/></div>;
const Component3 = () => <div>Component 3</div>;
const Component4 = () => <div>Component 4</div>;
const Component5 = () => <div>Component 5</div>;

const Main = () => {
    const [activeComponent, setActiveComponent] = useState('DashPeoplee');
  
    const renderComponent = () => {
      switch (activeComponent) {
        case 'Profilee':
          return <Profile />;
        case 'DashPeoplee':
          return <DashPeople />;
        default:
          return null;
      }
    };
  
    return (
      <div>
        <button onClick={() => setActiveComponent('Profilee')}>Profile</button>
        <button onClick={() => setActiveComponent('DashPeoplee')}>DashPeople</button>
        {renderComponent()}
      </div>
    );
  };
  
  export default Main;