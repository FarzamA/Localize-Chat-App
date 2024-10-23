// src/components/Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, Typography, Divider, Button, Box } from '@mui/material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  // Dummy rooms list can be modified later for better functionality
  const rooms = ['Room 1'];

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
            <ListItem key={index} disablePadding>
              <Button
                fullWidth
                variant="text"
                sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                onClick={() => console.log(`Selected: ${room}`)}  // Replace with actual room selection logic
              >
                {room}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
