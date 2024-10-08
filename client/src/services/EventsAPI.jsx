// Define API URL
const API_URL = '/api/events';

// Function to get all events
export const getAllEvents = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Function to get event by ID
export const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// Function to get events by location ID
export const getEventsByLocationId = async (locationId) => {
  try {
    const response = await fetch(`/api/locations/${locationId}/events`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events by location:', error);
    throw error;
  }
};
