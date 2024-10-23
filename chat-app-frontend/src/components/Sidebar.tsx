import React from 'react';
import { Drawer, List, ListItem, Typography, Divider, Button, Box } from '@mui/material';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    // Dummy rooms list, you can later add more rooms dynamically
    const rooms = ['Room 1', 'Room 2'];

    return (
    <Drawer open={open} onClose={onClose}>
        <Box sx={{ width: 250, p: 2 }}>
        {/* Heading */}
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Chat Rooms
        </Typography>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* List of Rooms */}
        <List>
            {rooms.map((room, index) => (
            <ListItem
                key={index}
                disablePadding
                sx={
                    room === 'Room 1' // Check if it's "Room 1" and apply custom styles
                        ? { backgroundColor: '#1976d2', color: '#fff', borderRadius: 1, mb: 1 }
                        : {}
                }
            >
                <Button
                fullWidth
                variant="text"
                sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: room === 'Room 1' ? '#fff' : 'inherit', // Keep text white if it's "Room 1"
                }}
                onClick={() => console.log(`Selected: ${room}`)}
                >
                {room}
                </Button>
            </ListItem>
            ))}

            {/* Disabled Add New Room Button */}
            <ListItem disablePadding>
            <Button
                fullWidth
                variant="outlined"
                sx={{ justifyContent: 'flex-start', mt: 2, textTransform: 'none' }}
                disabled
            >
                Add New Room
            </Button>
            </ListItem>
        </List>
        </Box>
    </Drawer>
    );
};
