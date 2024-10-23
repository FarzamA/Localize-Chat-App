import React, { useEffect, useRef } from 'react';
import { Message } from '../services/MessageService';
import { Box, Typography } from '@mui/material';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  // Create a ref to track the end of the message list
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box sx={{ mt: 2, maxHeight: '70vh', overflowY: 'auto' }}>
      {messages
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((message) => (
          <Box key={message._id} sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
            <Typography variant="body1">
              <strong>{message.name}</strong>: {message.message}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(message.timestamp).toLocaleString()}
            </Typography>
          </Box>
        ))}

      {/* Dummy div at the bottom to trigger scroll into view */}
      <div ref={messagesEndRef} />
    </Box>
  );
};
