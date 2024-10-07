import { pool } from './database.js';




const createTables = `
  -- Create the locations table
  CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,      -- unique ID for each location
    name VARCHAR(255) NOT NULL, -- name of the location
    address VARCHAR(255),       -- address of the location
    city VARCHAR(100),          -- city of the location
    state VARCHAR(50),          -- state of the location
    zip VARCHAR(10),            -- ZIP code of the location
    image VARCHAR(255)          -- image URL of the location
  );

  -- Create the events table
  CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,      -- unique ID for each event
    location_id INT REFERENCES locations(id) ON DELETE CASCADE, -- foreign key to the locations table
    title VARCHAR(255) NOT NULL, -- title of the event
    description TEXT,           -- description of the event
    event_date TIMESTAMP,       -- date and time of the event
    image VARCHAR(255)          -- image URL of the event
  );
`;

const insertSampleData = `
  -- Insert sample locations
  INSERT INTO locations (name, address, city, state, zip, image) VALUES
  ('Echo Lounge', '123 Main St', 'Cityville', 'CA', '12345', 'https://plus.unsplash.com/premium_photo-1677948482945-58c58d732238?q=80&w=1103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('House of Blues', '456 Blues Rd', 'Blues City', 'TX', '67890', 'https://plus.unsplash.com/premium_photo-1676488643746-b7e4da5312c5?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  ('Pavilion', '789 Pavilion Dr', 'Pavilion City', 'FL', '54321', 'https://plus.unsplash.com/premium_photo-1663090914375-740c1ed3c0bd?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGF2aWxpb24lMjByZXN0YXVyYW50fGVufDB8fDB8fHww'),
  ('American Airlines Center', '101 Arena Way', 'Big City', 'NY', '98765', 'https://images.unsplash.com/photo-1632951509604-41867c816d08?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBhaXJsaW5lcyUyMGNlbnRlcnxlbnwwfHwwfHx8MA%3D%3D');

  -- Insert sample events
  INSERT INTO events (location_id, title, description, event_date, image) VALUES
  (1, 'Rock Concert', 'A fun rock concert at Echo Lounge', '2024-11-12 19:00:00', 'https://images.unsplash.com/photo-1569529787187-de9dc5347a91?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9jayUyMGNvbmNlcnR8ZW58MHx8MHx8fDA%3D'),
  (2, 'Blues Night', 'An evening of blues music at House of Blues', '2024-10-15 20:00:00', 'https://images.unsplash.com/photo-1615491919648-c1506979aeb6?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZXMlMjBtdXNpY3xlbnwwfHwwfHx8MA%3D%3D'),
  (3, 'Music Festival', 'A full day of music at Pavilion', '2024-12-01 12:00:00', 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  (4, 'Basketball Game', 'Exciting basketball action at American Airlines Center', '2024-11-20 18:30:00', 'https://plus.unsplash.com/premium_photo-1675364966555-e09a869f0910?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D');
`;

async function resetDatabase() {
  try {
    await pool.query(createTables);
    console.log('Tables created successfully');
    
    await pool.query(insertSampleData);
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error creating tables or inserting data:', error);
  } finally {
    pool.end();
  }
}

resetDatabase();
