import { useState, useEffect } from 'react';
import './App.css';
import Message from './components/Message';
import MessageForm from './components/MessageForm';

function App({name}) {
  const messageText = "Добро пожаловать в React!";
  const [messageList, setMessageList] = useState([
    { text: "Привет, мир!", author: "Алиса" },
    { text: "Как дела?", author: "Боб" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const robotResponses = [
    "Интересная мысль! Расскажите подробнее.",
    "Я полностью с вами согласен.",
    "Это очень важное замечание.",
    "Давайте обсудим это подробнее.",
    "Спасибо за ваше сообщение!",
  ];

  const getRobotResponse = () => {
    const randomIndex = Math.floor(Math.random() * robotResponses.length);
    return robotResponses[randomIndex];
  };

  const handleNewMessage = (message) => {
    setMessageList(prevMessages => [...prevMessages, message]);
    
    // набора текста
    setIsTyping(true);
    
    // 1.5 секунды
    setTimeout(() => {
      const robotMessage = {
        text: getRobotResponse(),
        author: 'Робот'
      };
      setMessageList(prevMessages => [...prevMessages, robotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="App">
      <h1>{name}</h1>
      <Message text={messageText} />
      <div className="message-list">
        {messageList.map((message, index) => (
          <div key={index} className="message-item">
            <strong>{message.author}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
        {isTyping && (
          <div className="message-item typing">
            <strong>Робот: </strong>
            <span className="typing-indicator">печатает...</span>
          </div>
        )}
      </div>
      <MessageForm onSubmit={handleNewMessage} />
    </div>
  );
}

export default App;
