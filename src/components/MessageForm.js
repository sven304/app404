import { useState } from 'react';
import './MessageForm.css';

function MessageForm({ onSubmit }) {
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit({
        text: text.trim(),
        author: 'Пользователь'
      });
      setText('');
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите сообщение..."
        className="message-input"
      />
      <button type="submit" className="message-button">
        Отправить
      </button>
    </form>
  );
}

export default MessageForm;
