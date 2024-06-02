


import "../assets/styles/chatbot.css";

// import  { useState } from 'react';
import { useEffect } from 'react';
import { Widget, addUserMessage, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';
import '../assets/styles/chatbot.css';

const ChatBot = () => {
  useEffect(() => {
    addResponseMessage('Welcome to the chat!');
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    try {
      addUserMessage(newMessage);

      // API call to the backend   http://localhost:3001/api/chat
      const response = await axios.post('Api_call_here', {
        message: newMessage,
      });

      const reply = response.data.message;
      addResponseMessage(reply);
    } catch (error) {
      console.error('Error processing message:', error);
      addResponseMessage("Sorry, I couldn't process your request. Please try again.");
    }
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Travel and Guide AgentBot"
      subtitle="Ask me about Places"
      senderPlaceHolder="Type a message..."
    />
  );
};

export default ChatBot;
