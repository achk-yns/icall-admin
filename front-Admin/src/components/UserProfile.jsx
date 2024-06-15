import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';

const UserProfile = ({ anchorEl, handleClose }) => {

  const dispatch = useDispatch()

  const handleLogout = ()=>{
      dispatch(logout())
  }

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardOutlined style={{ fontSize: '20px' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined style={{ fontSize: '20px' , color:"red" }} />
          </ListItemIcon>
          <ListItemText primary="Logout"   style={{color:"red" }} />
        </ListItem>
      </List>
    </Popover>
  );
};

export default UserProfile;
