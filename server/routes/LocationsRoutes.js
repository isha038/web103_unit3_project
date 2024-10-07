import express from 'express';
import { getAllLocations, getLocationById } from '../controllers/locationsController.js';

const router = express.Router();

// Route to get all locations
router.get('/locations', getAllLocations);

// Route to get a specific location by ID
router.get('/locations/:id', getLocationById);

export default router;
