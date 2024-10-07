import express from 'express';
import { getAllEvents, getEventById, getEventsByLocation } from '../controllers/eventsController.js';

const router = express.Router();

// Route to get all events
router.get('/events', getAllEvents);

// Route to get a specific event by ID
router.get('/events/:id', getEventById);

// Route to get events by location ID
router.get('/locations/:location_id/events', getEventsByLocation);

export default router;
