import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Popover, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons';
import { AuthContext } from '../contexts/authContext';

const UserProfile = ({ anchorEl, handleClose }) => {
  const { logout } = useContext(AuthContext);
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
        <ListItem button onClick={()=>logout()}>
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
