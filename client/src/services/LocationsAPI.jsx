// Define API URL
const API_URL = '/api/locations';

// Function to get all locations
export const getAllLocations = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

// Function to get location by ID
export const getLocationById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching location:', error);
    throw error;
  }
};
