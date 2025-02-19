import { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function MessageForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

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
      inputRef.current?.focus();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        mt: 2
      }}
    >
      <TextField
        inputRef={inputRef}
        fullWidth
        variant="outlined"
        size="medium"
        placeholder="Введите сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
