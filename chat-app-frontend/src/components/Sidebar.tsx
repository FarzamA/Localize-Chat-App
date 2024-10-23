// src/components/Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, Typography, Button } from '@mui/material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        <Button >
          <Typography variant="h6">Room 1</Typography>
        </Button>
      </List>
    </Drawer>
  );
};
