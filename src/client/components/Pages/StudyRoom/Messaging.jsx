import React, { useState, useEffect } from 'react';
import { Chat } from 'react-messaging';

const CurrentUser = {
  _id: '6072b0cc05297b17b0e6adff',
  name: 'Andrew Robertson',
  username: 'RobboSZN',
  avatar:
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Robot-512.png",
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
      //if current message belongs to logged in user
      let avatarImg;
      if(messageArr[i]["senderId"] === CurrentUser["_id"]) {
        avatarImg = "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Robot-512.png";
      }
      else {
        avatarImg = `https://bootdey.com/img/Content/avatar/avatar${Math.floor(Math.random() * 8)+1}.png`;
      }
      const user = {
        "_id": messageArr[i]["senderId"],
        "name": 'Andrew Robertson',
        "username": 'RobboSZN',
        "avatar": avatarImg
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
