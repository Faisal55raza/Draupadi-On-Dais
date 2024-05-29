"use client";

import React, { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import CollectData from "@/components/collectData";
import ReactMarkdown from 'react-markdown'

function User1({ msg }) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble">
        <ReactMarkdown>

        {msg}
          
        </ReactMarkdown>
        </div>
    </div>
  );
}

function User2({ msg }) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">
        <ReactMarkdown>

        {msg}

        </ReactMarkdown>
        </div>
    </div>
  );
}

function Chat() {
  // const { user } = useAuth();
  const [user, setUser] =useState();
  // const [flg, setFlg]
  const accessToken = user ? user.refreshToken : null;

  const [messages, setMessages] = useState([{ from: "", content: "" }]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessageToFirstAPI = async (message,fr) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/chat/postmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({content:message,from:fr })
      });
  
      if (response.ok) {
        console.log('Message sent to first API successfully');
      } else {
        console.error('Failed to send message to first API');
      }
    } catch (error) {
      console.error('Error sending message to first API:', error);
    }
  };
  
  const sendMessageToSecondAPI = async (msg) => {
    try {
      const send = user.role == "user"? "org-chat": "speaker-chat";
      const response = await fetch(`http://127.0.0.1:8000/${send}/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ msg })
      });
  
      if (response.ok) {
        console.log('Message sent to second API successfully');
       
        const data = await response.json();
        console.log(data)
        
        await sendMessageToFirstAPI(data.reply,1);

      } else {
        console.error('Failed to send message to second API');
      }
    } catch (error) {
      console.error('Error sending message to second API:', error);
    }
  };
  
  const handleMessageSend = async () => {
    if (inputMessage.trim() !== '') {
      await sendMessageToFirstAPI(inputMessage,2);
      await sendMessageToSecondAPI(inputMessage);
      setInputMessage('');
    }
  };
  

  const getMessages = async () => {
    try {
      
      const response = await fetch('http://localhost:3001/api/v1/chat/allmessages', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log("Get messages call" ,data.data.messages)
          setMessages(data.data.messages)
        }
      } else {
        console.error('Failed to get user messages');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  useEffect(() => {
    const getLocalStorageData = async () =>{
      const userString = await localStorage.getItem("user") || null; 
  
      if (userString) {
        try {
          const parsedUser = JSON.parse(userString);
          // @ts-ignore  // Temporarily ignore error
          console.log(parsedUser)
          setUser(parsedUser)
          
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }
    }
    getLocalStorageData();
  }, []);

  useEffect(()=>{
    getMessages();
    
    const intervalId = setInterval(() => {
      getMessages();
    }, 1000);

    return () => clearInterval(intervalId);

  },[user])

 if(!messages){
  return(
    <h1>Collecting messages</h1>
  )
 }

  return (
    <div style={styles.chatContainer}>
      <CollectData/>
      <div style={styles.messageContainer}>
        {messages&&messages.map((msg, index) => {
          if (msg.from == '2') {
            return <User1 key={index} msg={msg.content} />;
          } else if (msg.from == '1') {
            return <User2 key={index} msg={msg.content} />;
          } else {
            return null;
          }
        })}
      </div>
      <div style={styles.messageInputContainer}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={handleMessageSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatContainer: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '1300px',
    backgroundColor: 'bg-base-100',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  messageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',
    borderRadius: '8px', 
    backgroundColor: 'bg-base-300', 
    padding: '10px', 
  },
  messageInputContainer: {
    display: 'flex',
    marginTop: '20px',
    borderRadius: '8px', 
    backgroundColor: '#ffffff', 
    padding: '10px', 
  },
  input: {
    flex: 1,
    marginRight: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Chat;
