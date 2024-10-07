import dotenv from 'dotenv';
// dotenv.config({ path: 'C:/Users/ishas/OneDrive/Documents/CodepathWeek3/web103_unit3_project/server/.env'});  // This ensures .env is loaded properly
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Explicitly specify the path to .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import pg from 'pg';




const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false  // Enable SSL for production environments
    }
};

export const pool = new pg.Pool(config);
