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
  const CountRendes = rendes.length
  // Fetch all Rendez Vous on component mount
  

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        const data = await FetchRend.getRendezVous();
        setRendes(data);
      } catch (error) {
        console.error('Error fetching Rendez Vous:', error);
        // Handle error as needed
      }
    };
    fetchRendezVous();
  }, []);

  // Function to add a new Rendez Vous
  const addRendezVous = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}rendez-vous/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Use Bearer token if applicable
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

  // Context value to be provided
  const contextValue = {
    rendes,
    addRendezVous,
    updateRendezVousStatus,
    deleteRendezVous,
    CountRendes
  };

  return (
    <RendezVousContext.Provider value={contextValue}>
      {children}
    </RendezVousContext.Provider>
  );
};
