import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';
import FetchRend from '../Fetching/FetchRend';
import { LuCalendarClock } from 'react-icons/lu';
import { Select } from '@mui/material';
import { styled } from '@mui/system';
import ToastService from '../ToastService'; // Adjust the import path as needed

// Create context
const RendezVousContext = createContext();

// Custom hook to use RendezVousContext
export const useRendezVous = () => useContext(RendezVousContext);

// Context Provider component
export const RendezVousProvider = ({ children }) => {
  const { token } = useAuth(); // Get authentication token from authContext
  const [rendes, setRendes] = useState([]);
  const [CountRendes, setCounterRDV] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [countCurrentMonthRendes, setCountCurrentMonthRendes] = useState(0);
  const [countRDVInstalle, setCountRDVInstalle] = useState(0);
  const [countCurrentMonthRDVInstalle, setCountCurrentMonthRDVInstalle] = useState(0);

  const CustomSelect = styled(Select)(() => ({
    '& .MuiSelect-root': {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '8px',
      width: '100px !important'
    },
    '& .MuiSelect-icon': {
      color: 'blue',
    },
    '& .MuiMenuItem-root': {
      color: 'green',
    },
    '&.invalid': {
      backgroundColor: '#f8d7da',
      color: '#721c24',
    },
    '&.valid': {
      backgroundColor: '#d4edda',
      color: '#155724',
    },
    '&.pending': {
      backgroundColor: '#fff3cd',
      color: '#856404',
    },
  }));

  const DataStatics = [
    {
      icon: <LuCalendarClock />,
      amount: CountRendes,
      Tag: 'Brutes',
      title: 'Total RDVs',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <LuCalendarClock />,
      amount: countCurrentMonthRendes,
      title: 'Ce mois',
      Tag: 'Brutes',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <LuCalendarClock />,
      amount: countRDVInstalle,
      title: "Total d'installs",
      Tag: 'Installs',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(0, 128, 0)',
      pcColor: 'green-600',
    },
    {
      icon: <LuCalendarClock />,
      amount: countCurrentMonthRDVInstalle,
      title: 'Ce mois',
      Tag: 'Installs',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(0, 128, 0)',
      pcColor: 'green-600',
    },
  ];

  const isCurrentMonth = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };

  useEffect(() => {
    if (token) {
      const fetchRendezVous = async () => {
        try {
          const data = await FetchRend.getRendezVous();
          if (data) {
            setCounterRDV(data.length);
            setCountCurrentMonthRendes(data.filter((order) => isCurrentMonth(order.createdRv)).length);
            setCountRDVInstalle(data.filter((order) => order.STATUT === 'installe').length);
            setCountCurrentMonthRDVInstalle(
              data.filter((order) => isCurrentMonth(order.createdRv) && order.STATUT === 'installe').length
            );
            setRendes(data);
          }
        } catch (error) {
          console.error('Error fetching Rendez Vous:', error);
          ToastService.error('Failed to fetch Rendez Vous data');
        }
      };
      fetchRendezVous();
    }
  }, [token]);

  // Function to add a new Rendez Vous
  const addRendezVous = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}rendez-vous/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        ToastService.error(`Failed to add Rendez Vous ${response.status}`);
      }
      const allData = await response.json();
      setRendes(allData.data); // Update local state with new Rendez Vous
      ToastService.success('Rendez Vous added successfully');
    } catch (error) {
      console.error('Error adding Rendez Vous:', error);
      ToastService.error('Failed to add Rendez Vous');
    }
  };

  // Function to update a Rendez Vous
  const updateRendezVous = async (id, updateData) => {
    try {

      const response = await fetch(`${process.env.REACT_APP_API_URL}rendez-vous/${id}/edit`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(updateData)
      });
  
      if (!response.ok) {
        ToastService.error(data.message);
      }
      const data = await response.json();
      console.log("testttt",data)
      setRendes(data.data)
      ToastService.success('Rendez Vous updated successfully');
      return true
    } catch (error) {
      ToastService.error('Failed to update Rendez Vous');
    }
  };
  

  // Function to update status of a Rendez Vous
  const updateRendezVousStatus = async (id, newStatus) => {
    try {
      const data =FetchRend.updateRendezVousStatus(id, { STATUT: newStatus });
      setRendes(data);
      ToastService.success('Rendez Vous status updated successfully');
    } catch (error) {
      console.error('Error updating Rendez Vous status:', error);
      ToastService.error('Failed to update Rendez Vous status');
    }
  };

  // Function to delete a Rendez Vous
  const deleteRendezVous = async (id) => {
    try {
      const updatedRendes = await FetchRend.deleteRendezVous(id);
      setRendes(updatedRendes);
      ToastService.success('Rendez Vous deleted successfully');
    } catch (error) {
      console.error('Error deleting Rendez Vous:', error);
      ToastService.error('Failed to delete Rendez Vous');
    }
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    filterData(term);
  };

  const filterData = (value) => {
    if (value.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredResults = rendes.filter((item) =>
        Object.values(item).some(
          (field) => field && field.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setSearchResults(filteredResults);
    }
  };

  // Context value to be provided
  const contextValue = {
    rendes: searchTerm ? searchResults : rendes,
    addRendezVous,
    CustomSelect,
    DataStatics,
    updateRendezVousStatus,
    updateRendezVous,
    deleteRendezVous,
    CountRendes,
    countCurrentMonthRendes,
    countRDVInstalle,
    countCurrentMonthRDVInstalle,
    handleSearchTermChange,
  };

  return <RendezVousContext.Provider value={contextValue}>{children}</RendezVousContext.Provider>;
};
