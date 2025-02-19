import React from 'react';
import { Typography, Box } from '@mui/material';

function Message({ text }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1">
        {text}
      </Typography>
    </Box>
  );
}

export default Message;
