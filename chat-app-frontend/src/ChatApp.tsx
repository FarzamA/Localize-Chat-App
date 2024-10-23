// src/ChatApp.tsx
import React, { useState, useMemo } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Box, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { MessageService, Message } from './services/MessageService';
import { Sidebar } from './components/Sidebar';
import { MessageList } from './components/MessageList';
import { MessageModal } from './components/MessageModal';

export const ChatApp: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messageService = new MessageService();
  const [darkMode, setDarkMode] = useState(false); // State to manage theme mode

  // Toggle between light and dark modes
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Create theme based on the current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  // Fetch messages on component mount
  React.useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await messageService.fetchMessages();
      setMessages(fetchedMessages);
    };
    fetchMessages();
  }, []);

  // Handle posting a new message
  const handleNewMessageSubmit = async (name: string, message: string) => {
    const newMessage = await messageService.postMessage(name, message);
    setMessages([...messages, newMessage]); // Update the state with the new message
  };

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline to ensure Material-UI applies the correct theme */}
      <CssBaseline />

      <div>
        {/* App Bar */}
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Chat App - Room 1
            </Typography>

            {/* Light/Dark Mode Switch */}
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* Message Display Area */}
        <Container>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h4">Messages</Typography>
            <MessageList messages={messages} />
          </Box>

          {/* Button to Open Modal for New Message */}
          <Button
            variant="contained"
            color="primary"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={() => setModalOpen(true)}
          >
            Post a New Message
          </Button>
        </Container>

        {/* Modal for New Message */}
        <MessageModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleNewMessageSubmit}
        />
      </div>
    </ThemeProvider>
  );
};

export default ChatApp;