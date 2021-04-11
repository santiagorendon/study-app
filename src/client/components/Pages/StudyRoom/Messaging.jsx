import React, { useState, useEffect } from 'react';
import { Chat } from 'react-messaging';

const CurrentUser = {
  _id: '6072b0cc05297b17b0e6adff',
  name: 'Andrew Robertson',
  username: 'RobboSZN',
  avatar:
    'https://tmssl.akamaized.net/images/portrait/originals/234803-1559827085.jpg',
};

const studyGroupName = "Calculus 2"


function Messaging() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    initMessages();
  }, []);

  function transformMessageObj(messageArr) {

    const result = [];
    for(let i=0; i < messageArr.length; i++) {
        console.log(messageArr[i]["senderId"])
      const user = {
        "_id": messageArr[i]["senderId"],
        "name": 'Andrew Robertson',
        "username": 'RobboSZN',
        "avatar":
          'https://tmssl.akamaized.net/images/portrait/originals/234803-1559827085.jpg'
      }
      result.push({
        "_id":  messageArr[i]["_id"],
        "text":  messageArr[i]["text"],
        "user" : user,
        "date": new Date(messageArr[i]["createdAt"])
      })
    }
    return result;
  }

  function initMessages() {
    fetch('/api/get-message-board', {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `studyGroup=${studyGroupName}`,
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      if(res["error"]){
        console.log("error", res["error"]);
        return "error";
      }
      const messageArrRes = transformMessageObj(res["messages"]);
      setMessages(messageArrRes);
    })

  }

  function onSend(text) {
    const randInt = Math.floor(Math.random() * 100);
    fetch('/api/create-message', {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `text=${text}&senderId=${CurrentUser["_id"]}&studyGroup=${studyGroupName}`,
    }).then(res => {
      return res.json();
    })
    .then(res => {
      if(res["error"]){
        console.log("error", res["error"]);
        return "error";
      }
      setMessages([
        ...messages,
        {
          _id: randInt,
          text: text,
          user: CurrentUser,
          date: new Date(),
        },
      ])
    })

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
