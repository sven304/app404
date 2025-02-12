import { useState, useRef, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function MessageForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  // Фокус при первом рендере
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit({
        text: message,
        author: 'Пользователь',
        timestamp: new Date().toISOString()
      });
      setMessage('');
      // Фокус после отправки сообщения
      inputRef.current?.focus();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 1,
        mt: 2
      }}
    >
      <TextField
        inputRef={inputRef}
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Введите сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!message.trim()}
        endIcon={<SendIcon />}
      >
        Отправить
      </Button>
    </Box>
  );
}

export default MessageForm;
