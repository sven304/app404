import React from 'react';
import './Message.css';

function Message({ text }) {
  return (
    <div className="message">
      {text}
    </div>
  );
}

export default Message;
