import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import { getLocationById } from '../services/LocationsAPI';
import { getEventsByLocationId } from '../services/EventsAPI';
import { useParams } from 'react-router-dom';
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {

    const { locationId } = useParams();
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        // Fetch location by ID
        if (locationId){
        const fetchLocation = async () => {
            try {
                const locationData = await getLocationById(locationId);
                setLocation(locationData);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };

        // Fetch events by location ID
        const fetchEvents = async () => {
            try {
                const eventsData = await getEventsByLocationId(locationId);
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchLocation();
        fetchEvents();
    }
    }, [locationId]);

    if (!location) return <p>Loading...</p>;
    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents