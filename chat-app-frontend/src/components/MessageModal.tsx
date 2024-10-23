// src/components/MessageModal.tsx
import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, message: string) => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSubmit(name, message);
    setName('');
    setMessage('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Post a New Message</Typography>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
