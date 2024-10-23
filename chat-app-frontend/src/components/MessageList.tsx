// src/components/MessageList.tsx
import React from 'react';
import { Message } from '../services/MessageService';
import { Box, Typography } from '@mui/material';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box sx={{ mt: 2, maxHeight: '70vh', overflowY: 'auto' }}>
      {messages
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((message) => (
          <Box key={message._id} sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
            <Typography variant="body1">
              <strong>{message.name}</strong>: {message.message}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(message.createdAt).toLocaleString()}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};
