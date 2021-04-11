import React, { useState, useEffect } from 'react';
import { Chat } from 'react-messaging';

const CurrentUser = {
  _id: '26',
  name: 'Andrew Robertson',
  username: 'RobboSZN',
  avatar:
    'https://tmssl.akamaized.net/images/portrait/originals/234803-1559827085.jpg',
};


function Messaging() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    initMessages();
  }, []);

  function transformMessageObj(messageArr) {
    result = [];
    for(let i=0; i < messageArr.length; i++) {
      console.log("yuh", messageArr[i]);
    }
  }

  function initMessages() {
    fetch('/api/get-message-board', {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `password=${password}&email=${email}`,
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      if(res["error"]){
        console.log("error", res["error"]);
        return "error";
      }
      messageArrRes = transformMessageObj(messageArr["messages"]);
      //setMessages(messageArrRes);
      setMessages([
        {
          _id: '101',
          text: 'Hello',
          user: {
            _id: '26',
            name: 'Andrew Robertson',
            username: 'RobboSZN',
            avatar:
              'https://tmssl.akamaized.net/images/portrait/originals/234803-1559827085.jpg',
          },
          date: new Date(),
        },
        {
          _id: '102',
          text: 'Hi',
          user: {
            _id: '100',
            name: 'Jurgen Klopp',
            username: 'KloppoSZN',
            avatar:
              'https://i.guim.co.uk/img/media/5445143eab4f7ab92cd015aff5140b60174308a9/162_10_1745_1047/master/1745.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b017b1381457ec79ad4922db8e295a78',
          },
          date: new Date(),
        },
      ]);
    })
    // setMessages([
    //   {
    //     _id: '101',
    //     text: 'Hello',
    //     user: {
    //       _id: '26',
    //       name: 'Andrew Robertson',
    //       username: 'RobboSZN',
    //       avatar:
    //         'https://tmssl.akamaized.net/images/portrait/originals/234803-1559827085.jpg',
    //     },
    //     date: new Date(),
    //   },
    //   {
    //     _id: '102',
    //     text: 'Hi',
    //     user: {
    //       _id: '100',
    //       name: 'Jurgen Klopp',
    //       username: 'KloppoSZN',
    //       avatar:
    //         'https://i.guim.co.uk/img/media/5445143eab4f7ab92cd015aff5140b60174308a9/162_10_1745_1047/master/1745.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b017b1381457ec79ad4922db8e295a78',
    //     },
    //     date: new Date(),
    //   },
    // ]);
  }

  function onSend(text) {
    const randInt = Math.floor(Math.random() * 100);
    setMessages([
      ...messages,
      {
        _id: randInt,
        text: text,
        user: CurrentUser,
        date: new Date(),
      },
    ]);
  }

  return (
    <Chat
      messages={messages}
      user={CurrentUser}
      onSend={(text) => onSend(text)}
    />
  );
}

export default Messaging;
