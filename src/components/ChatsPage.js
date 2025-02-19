import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  Container, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  IconButton,
  Divider, 
  Grid,
  Box,
  Alert,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Message from './Message'
import MessageForm from './MessageForm'

const DEFAULT_CHATS = [
  { id: 'chat1', name: 'Общий чат' },
  { id: 'chat2', name: 'Рабочий чат' },
  { id: 'chat3', name: 'Личный чат' },
  { id: 'chat4', name: 'Семейный чат' }
]

const BOT_RESPONSES = [
  'Интересная мысль! Расскажите подробнее.',
  'Я полностью с вами согласен.',
  'А вы уверены в этом?',
  'Хмм... Надо подумать.',
  'Отличное замечание!',
  'Давайте рассмотрим это с другой стороны.',
  'Это напомнило мне один случай...',
  'Какие у вас есть идеи по этому поводу?',
  'Вы подняли очень важную тему.',
  'Мне кажется, тут есть над чем поразмыслить.'
]

function ChatsPage() {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState({})
  const [chats, setChats] = useState(DEFAULT_CHATS)
  const [currentChat, setCurrentChat] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [isAddChatOpen, setIsAddChatOpen] = useState(false)
  const [newChatName, setNewChatName] = useState('')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Инициализация сообщений для каждого чата
  useEffect(() => {
    const initialMessages = chats.reduce((acc, chat) => {
      acc[chat.id] = acc[chat.id] || []
      return acc
    }, {})
    setMessages(initialMessages)
  }, [])

  // Проверка существования чата
  useEffect(() => {
    if (chatId) {
      const chat = chats.find(c => c.id === chatId)
      setCurrentChat(chat || null)
    } else {
      setCurrentChat(null)
    }
  }, [chatId, chats])

  const handleNewMessage = (message) => {
    if (!chatId || isTyping) return  // Блокируем отправку если бот печатает

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message]
    }))

    setIsTyping(true)

    // Имитация ответа бота
    setTimeout(() => {
      const botMessage = {
        text: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
        author: 'Бот',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), botMessage]
      }))
      setIsTyping(false)
    }, 1000)
  }

  const handleDeleteChat = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId))
    setMessages(prev => {
      const newMessages = { ...prev }
      delete newMessages[chatId]
      return newMessages
    })
    navigate('/chats')
  }

  const handleAddChat = () => {
    if (!newChatName.trim()) return

    const newChat = {
      id: 'chat' + (chats.length + 1),
      name: newChatName
    }

    setChats(prev => [...prev, newChat])
    setNewChatName('')
    setIsAddChatOpen(false)
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3, minHeight: '80vh', position: 'relative' }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ position: 'absolute', top: 20, left: 20 }}
        >
          На главную
        </Button>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          {/* Список чатов */}
          <Grid item xs={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Чаты
              </Typography>
              <IconButton onClick={() => setIsAddChatOpen(true)} color="primary">
                <AddIcon />
              </IconButton>
            </Box>
            <List>
              {chats.map((chat) => (
                <Box key={chat.id}>
                  <ListItem 
                    button 
                    selected={chatId === chat.id}
                    onClick={() => navigate(`/chats/${chat.id}`)}
                  >
                    <ListItemText primary={chat.name} />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteChat(chat.id)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </Grid>

          {/* Область сообщений */}
          <Grid item xs={9}>
            {!chatId && (
              <Alert severity="info">
                Выберите чат из списка слева
              </Alert>
            )}
            {chatId && !currentChat && (
              <Alert severity="error">
                Чат не найден. <Link to="/chats">Вернуться к списку чатов</Link>
              </Alert>
            )}
            {currentChat && (
              <>
                <Typography variant="h5" gutterBottom>
                  {currentChat.name}
                </Typography>
                <Paper elevation={1} sx={{ p: 2, mb: 2, height: '60vh', overflow: 'auto' }}>
                  <List>
                    {messages[chatId]?.map((message, index) => (
                      <Box key={index}>
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
                        {index < messages[chatId].length - 1 && <Divider />}
                      </Box>
                    ))}
                    {isTyping && (
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography component="span" variant="body1">
                              <strong>Бот: </strong>
                              <span className="typing-indicator">печатает...</span>
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                    <Box ref={messagesEndRef} />
                  </List>
                </Paper>
                <MessageForm onSubmit={handleNewMessage} />
              </>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Диалог добавления чата */}
      <Dialog open={isAddChatOpen} onClose={() => setIsAddChatOpen(false)}>
        <DialogTitle>Добавить новый чат</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название чата"
            fullWidth
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddChatOpen(false)}>Отмена</Button>
          <Button onClick={handleAddChat} variant="contained" color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default ChatsPage
