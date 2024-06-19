import React, { createContext, useContext, useState, useEffect } from 'react';
import api from 'utils/api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const {user ,token} = useSelector(state=>state.auth)
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchUserDetails();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/user/getall');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get('/api/role/getall');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Error fetching roles', { position: 'top-right' });
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await api.post('/api/user/create', userData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success('User added successfully', { position: 'top-right' });
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error adding user', { position: 'top-right' });
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const response = await api.put(`/api/user/update/${id}`, userData);
      await fetchUsers();
      toast.success('User updated successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user', { position: 'top-right' });
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/user/delete/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success('User deleted successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user', { position: 'top-right' });
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await api.get('/api/auth/details');
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const updateUserDetails = async (userData) => {
    try {
      const response = await api.put('/api/auth/update', userData);
      setUserDetails(response.data);
      toast.success('User details updated successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Error updating user details', { position: 'top-right' });
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await api.put('/api/auth/change-password', { oldPassword, newPassword });
      toast.success('Password changed successfully', { position: 'top-right' });
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg, { position: 'top-right' });
      } else {
        toast.error('An error occurred', { position: 'top-right' });
      }
    }
  };

  const login = async (values) => {
    try {
      const response = await api.post('/api/auth/login', values);
      console.log("userdata" , response.data)
      const { token, refreshToken, role } = response.data; // Get role from response
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userRole', role); // Store user's role in local storage
      fetchUserDetails();
      toast.success('Login successful', { position: 'top-right' });
      window.location.href = '/dashboard/default';
    } catch (error) {
      toast.error('Login failed', { position: 'top-right' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed', { position: 'top-right' });
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        roles,
        userDetails,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
        fetchUserDetails,
        updateUserDetails,
        changePassword,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
