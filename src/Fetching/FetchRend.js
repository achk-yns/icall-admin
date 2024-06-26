const API_BASE_URL =process.env.REACT_APP_API_URL;
const Token = localStorage.getItem('token');

const FetchRend = {
  getRendezVous: async () => {
    try {
      if(Token){
        const response = await fetch(`${API_BASE_URL}rendez-vous`, {
          headers: {
            'Content-Type': 'application/json',
            'token': Token
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { data } = await response.json();
        console.log("data Fetched....." , data);
        return data;
      }
    } catch (error) {
      console.error("Error fetching rendezvous:", error);
      throw error;
    }
  },

  getONERendezVous : async (nom, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}rendez-vous/${nom}`, {
        headers: {
          'Content-Type': 'application/json',
          'token': token // Use token argument
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching one rendezvous:", error.message); // Corrected typo
      throw error;
    }
  },
  
  addRendezVous: async (rendezVousData) => {
    try {
      const response = await fetch(`${API_BASE_URL}rendez-vous`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'token': Token
        },
        body: JSON.stringify(rendezVousData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding rendezvous:", error);
      throw error;
    }
  },

  updateRendezVous: async (rendezVousNOM, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}rendez-vous/${rendezVousNOM}/edit`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'token': Token
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating rendezvous:", error);
      throw error;
    }
  },
  updateRendezVousStatus: async (rendezVousNOM, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}rendez-vous/${rendezVousNOM}/edit/status`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'token': Token
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating rendezvous:", error);
      throw error;
    }
  },

  deleteRendezVous: async (rendezVousNOM) => {
    try {
      const response = await fetch(`${API_BASE_URL}rendez-vous/${rendezVousNOM}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'token': Token
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting rendezvous:", error);
      throw error;
    }
  },
};

export default FetchRend;
