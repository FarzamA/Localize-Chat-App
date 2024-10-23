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

  // State to handle validation errors
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState('');
  const [messageHelperText, setMessageHelperText] = useState('');

  const handleSubmit = () => {
    let valid = true;

    // Validate name
    if (!name) {
      setNameError(true);
      setNameHelperText('Name is required');
      valid = false;
    } else {
      setNameError(false);
      setNameHelperText('');
    }

    // Validate message
    if (!message) {
      setMessageError(true);
      setMessageHelperText('Message is required');
      valid = false;
    } else {
      setMessageError(false);
      setMessageHelperText('');
    }

    if (valid) {
      // Submit only if both fields are valid
      onSubmit(name, message);
      setName(''); // Reset fields after successful submission
      setMessage('');
      onClose();   // Close the modal
    }
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
        
        {/* Name Field */}
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          helperText={nameHelperText}
          sx={{ mt: 2 }}
        />

        {/* Message Field */}
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={messageError}
          helperText={messageHelperText}
          sx={{ mt: 2 }}
        />

        {/* Submit Button */}
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
