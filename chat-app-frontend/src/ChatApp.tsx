import React, { useState, useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';  // Import socket.io-client
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { MessageService, Message } from './services/MessageService';
import { Sidebar } from './components/Sidebar';
import { MessageList } from './components/MessageList';
import { MessageModal } from './components/MessageModal';
import Cookies from 'js-cookie';

// Initialize the WebSocket connection
const socket: Socket = io('http://localhost:5000');

export const ChatApp: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const messageService = new MessageService();

    // Retrieve the theme mode from the cookie (default to 'light')
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const cookieValue = Cookies.get('theme');
        return cookieValue === 'dark';
    });

    // Toggle between light and dark modes and store the preference in a cookie
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        Cookies.set('theme', newMode ? 'dark' : 'light', { expires: 365 });
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

    // Function to check for duplicate messages based on the unique message ID
    const isDuplicateMessage = (prevMessages: Message[], newMessage: Message) => {
        return prevMessages.some((message) => message._id === newMessage._id);
    };

    // Fetch messages on component mount and listen for WebSocket events
    useEffect(() => {
        const fetchMessages = async () => {
            const fetchedMessages = await messageService.fetchMessages();
            setMessages(fetchedMessages);
        };
        fetchMessages();

        // Listen for new messages broadcasted by WebSocket
        socket.on('message', (newMessage: Message) => 
            // Prevent adding the message twice for the sender
            // Issue happening here with duplication of messages for sender 
            setMessages((prevMessages) => !isDuplicateMessage(prevMessages, newMessage) ? [...prevMessages, newMessage] : [...prevMessages])
        );
        // Cleanup WebSocket listener when component unmounts
        return () => {
            socket.off('message');
        };
    }, []);

    // Handle posting a new message
    const handleNewMessageSubmit = async (name: string, message: string) => {
        try {
            const newMessage = await messageService.postMessage(name, message);
            setMessages((prevMessages) => [...prevMessages, newMessage]);  // Update state with new message locally
            setModalOpen(false);  // Close the modal after submitting the message

            // Emit the new message via WebSocket to other connected clients
            socket.emit('newMessage', newMessage);
        } catch (error) {
            console.error('Failed to post the message');
        }
    };

    return (
        <ThemeProvider theme={theme}>
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
