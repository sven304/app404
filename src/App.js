import { useState, useEffect, useRef } from 'react';
import './App.css';
import Message from './components/Message';
import MessageForm from './components/MessageForm';
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';

function App({name}) {
  const messageText = "Добро пожаловать в React!";
  const [messageList, setMessageList] = useState([
    { text: "Привет, мир!", author: "Алиса", isInitial: true },
    { text: "Как дела?", author: "Боб", isInitial: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const isFirstRender = useRef(true);
  
  const robotResponses = [
    "Интересная мысль! Расскажите подробнее.",
    "Я полностью с вами согласен.",
    "Это очень важное замечание.",
    "Давайте обсудим это подробнее.",
    "Спасибо за ваше сообщение!",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList, isTyping]);

  const getRobotResponse = () => {
    const randomIndex = Math.floor(Math.random() * robotResponses.length);
    return robotResponses[randomIndex];
  };

  const handleNewMessage = (message) => {
    setMessageList(prevMessages => [...prevMessages, { ...message, isInitial: false }]);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const messages = messageList;
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.author !== 'Робот' && !lastMessage.isInitial) {
        setIsTyping(true);
        
        setTimeout(() => {
          const robotResponse = {
            text: getRobotResponse(),
            author: 'Робот',
            timestamp: new Date().toISOString()
          };
          
          setMessageList(prev => [...prev, robotResponse]);
          setIsTyping(false);
        }, 1500);
      }
    }
  }, [messageList]);

  // Добавляем массив чатов
  const chats = [
    { id: 'chat1', name: 'Общий чат' },
    { id: 'chat2', name: 'Рабочий чат' },
    { id: 'chat3', name: 'Личный чат' },
    { id: 'chat4', name: 'Семейный чат' },
  ];

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {name}
        </Typography>
        <Grid container spacing={2}>
          {/* Список чатов */}
          <Grid item xs={3}>
            <Paper elevation={1} sx={{ p: 2, height: '70vh' }}>
              <Typography variant="h6" gutterBottom>
                Чаты
              </Typography>
              <List>
                {chats.map((chat) => (
                  <div key={chat.id}>
                    <ListItem button>
                      <ListItemText primary={chat.name} />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Область сообщений */}
          <Grid item xs={9}>
            <Message text={messageText} />
            <Paper elevation={1} sx={{ p: 2, mb: 2, height: '60vh', overflow: 'auto' }}>
              <List>
                {messageList.map((message, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography component="span" variant="body1">
                            <strong>{message.author}: </strong>
                            {message.text}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < messageList.length - 1 && <Divider />}
                  </div>
                ))}
                {isTyping && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography component="span" variant="body1">
                          <strong>Робот: </strong>
                          <span className="typing-indicator">печатает...</span>
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
                <div ref={messagesEndRef} />
              </List>
            </Paper>
            <MessageForm onSubmit={handleNewMessage} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
