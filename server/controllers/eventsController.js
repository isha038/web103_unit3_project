import { pool } from '../config/database.js';

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving event by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get events by location ID
export const getEventsByLocation = async (req, res) => {
  const { location_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM events WHERE location_id = $1', [location_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving events for location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
