import { pool } from './database.js';

const dropTables = `
  DROP TABLE IF EXISTS events CASCADE;
  DROP TABLE IF EXISTS locations CASCADE;
`;



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

  -- Insert sample events for each location
  INSERT INTO events (location_id, title, description, event_date, image) VALUES
  -- Echo Lounge Events
  (1, 'Rock Concert', 'A fun rock concert at Echo Lounge', '2024-11-12 19:00:00', 'https://images.unsplash.com/photo-1569529787187-de9dc5347a91?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9jayUyMGNvbmNlcnR8ZW58MHx8MHx8fDA%3D'),
  (1, 'Jazz Night', 'Enjoy a smooth jazz night at Echo Lounge', '2024-10-22 19:30:00', 'https://images.unsplash.com/photo-1580832945253-9a8f87b606f2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGphenolMjBuaWdodHxlbnwwfHwwfHx8MA%3D%3D'),
  (1, 'Stand-up Comedy', 'Laugh the night away with great comedians', '2024-12-05 20:00:00', 'https://images.unsplash.com/photo-1610964199131-5e29387e6267?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0YW5kJTIwdXAlMjBjb21lZHl8ZW58MHx8MHx8fDA%3D'),
  (1, 'Karaoke Night', 'Show off your singing talent at Echo Lounge', '2024-11-20 21:00:00', 'https://plus.unsplash.com/premium_photo-1661776078632-a5767588a8be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),

  -- House of Blues Events
  (2, 'Blues Night', 'An evening of blues music at House of Blues', '2024-10-15 20:00:00', 'https://images.unsplash.com/photo-1615491919648-c1506979aeb6?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZXMlMjBtdXNpY3xlbnwwfHwwfHx8MA%3D%3D'),
  (2, 'Country Music Fest', 'Country music all night long at House of Blues', '2024-10-30 18:30:00', 'https://plus.unsplash.com/premium_photo-1681540675424-f41320dac7df?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y291bnRyeSUyMG11c2ljJTIwZmVzdHxlbnwwfHwwfHx8MA%3D%3D'),
  (2, 'Soulful Night', 'Soul music live at House of Blues', '2024-11-25 19:00:00', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  (2, 'Gospel Music Hour', 'Join us for an uplifting gospel music night', '2024-12-10 16:00:00', 'https://images.unsplash.com/photo-1673042872461-674af7154d3b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdvc3BlbCUyMG11c2ljfGVufDB8fDB8fHww'),

  -- Pavilion Events
  (3, 'Music Festival', 'A full day of music at Pavilion', '2024-12-01 12:00:00', 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
  (3, 'Tech Conference', 'Tech conference with top industry speakers', '2024-11-28 09:00:00', 'https://images.unsplash.com/photo-1699962700166-be0200d7bf97?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGNvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3D'),
  (3, 'Art Fair', 'Discover art from local and international artists', '2024-10-28 11:00:00', 'https://plus.unsplash.com/premium_photo-1713720663838-828511800b63?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0JTIwZmFpcnxlbnwwfHwwfHx8MA%3D%3D'),
  (3, 'Food Expo', 'Enjoy a variety of delicious food at the Pavilion', '2024-12-15 13:00:00', 'https://plus.unsplash.com/premium_photo-1687697860817-7dc33a8beb9e?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMGV4cG98ZW58MHx8MHx8fDA%3D'),

  -- American Airlines Center Events
  (4, 'Basketball Game', 'Exciting basketball action at American Airlines Center', '2024-11-20 18:30:00', 'https://plus.unsplash.com/premium_photo-1675364966555-e09a869f0910?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D'),
  (4, 'Concert - Big Band', 'Live concert of a famous big band at AAC', '2024-12-02 20:00:00', 'https://plus.unsplash.com/premium_photo-1682855222889-7e098cbee98c?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlnJTIwYmFuZCUyMGNvbmNlcnR8ZW58MHx8MHx8fDA%3D'),
  (4, 'Boxing Match', 'Championship boxing match at American Airlines Center', '2024-11-22 21:00:00', 'https://images.unsplash.com/photo-1542720046-1e772598ea39?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym94aW5nJTIwbWF0Y2h8ZW58MHx8MHx8fDA%3D'),
  (4, 'Ice Skating Show', 'Watch an amazing ice skating performance at AAC', '2024-12-18 18:00:00', 'https://plus.unsplash.com/premium_photo-1661310170136-fab54b2ca2b5?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGljZSUyMHNrYXRpbmclMjBzaG93fGVufDB8fDB8fHww');
`;

async function resetDatabase() {
  try {
    await pool.query(dropTables);  // Drop existing tables 
    console.log('Tables dropped successfully');
    
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
