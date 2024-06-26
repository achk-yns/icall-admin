import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';
import FetchRend from '../Fetching/FetchRend';

// Create context
const RendezVousContext = createContext();

// Custom hook to use RendezVousContext
export const useRendezVous = () => useContext(RendezVousContext);

// Context Provider component
export const RendezVousProvider = ({ children }) => {
  const { token } = useAuth(); // Get authentication token from authContext
  const [rendes, setRendes] = useState([]);
  const [CountRendes,setCounterRDV]=useState(0)
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const isCurrentMonth = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  };
  
  const [countCurrentMonthRendes,setCountCurrentMonthRendes] = useState(0);
  const [countRDVInstalle,setCountRDVInstalle] = useState(0);
  const [countCurrentMonthRDVInstalle,setCountCurrentMonthRDVInstalle] = useState(0);
 

  useEffect(() => {
    if(token){
      const fetchRendezVous = async () => {
        try {
          const data = await FetchRend.getRendezVous();
          setCounterRDV(data.length);
          setCountCurrentMonthRendes(data.filter(order => isCurrentMonth(order.createdRv)).length);
          setCountRDVInstalle(data.filter(order => order.STATUT==="installe" ).length);
          setCountCurrentMonthRDVInstalle(data.filter(order => isCurrentMonth(order.createdRv) && order.STATUT==="installe" ).length);
          setRendes(data);
        } catch (error) {
          console.error('Error fetching Rendez Vous:', error);
          
        }
      };
      fetchRendezVous();
    }
  }, []);

  // Function to add a new Rendez Vous
  const addRendezVous = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}rendez-vous/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`, // Use Bearer token if applicable
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newRendezVous = await response.json();
      setRendes([...rendes, newRendezVous]); // Update local state with new Rendez Vous
    } catch (error) {
      console.error('Error adding Rendez Vous:', error);
      // Handle error as needed
    }
  };

  const updateRendezVous = async (nom,updateData)=>{
    try {
       const updating = await FetchRend.updateRendezVous(nom,updateData)
       const data = await FetchRend.getRendezVous();
       setRendes(data)
    } catch (error) {
      console.error('Error updating Rendez Vous status:', error);
    }
  }

  // Function to update status of a Rendez Vous
  const updateRendezVousStatus = async (nom, newStatus) => {
    try {
      const data = await FetchRend.updateRendezVousStatus(nom, { STATUT: newStatus });
      setRendes(rendes.map(rendez => (rendez.NOM === nom ? { ...rendez, STATUT: newStatus } : rendez)));
    } catch (error) {
      console.error('Error updating Rendez Vous status:', error);
      // Handle error as needed
    }
  };

  // Function to delete a Rendez Vous
  const deleteRendezVous = async (NOM) => {
    try {
      await FetchRend.deleteRendezVous(NOM);
      const updatedRendes = rendes.filter((rendez) => rendez.NOM !== NOM);
      setRendes(updatedRendes);
    } catch (error) {
      console.error('Error deleting Rendez Vous:', error);
      // Handle error as needed
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
      const filteredResults = rendes.filter(item =>
        Object.values(item).some(field =>
          field && field.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setSearchResults(filteredResults);
    }
  };


  // Context value to be provided
  const contextValue = {
    rendes: searchTerm ? searchResults : rendes, 
    addRendezVous,
    updateRendezVousStatus,
    updateRendezVous,
    deleteRendezVous,
    CountRendes,
    countCurrentMonthRendes,
    countRDVInstalle,
    countCurrentMonthRDVInstalle,
    handleSearchTermChange,
  };

  return (
    <RendezVousContext.Provider value={contextValue}>
      {children}
    </RendezVousContext.Provider>
  );
};
