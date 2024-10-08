import React, { useState, useEffect } from 'react';
import { getEventById } from '../services/EventsAPI'; // Import API
import '../css/Event.css';

const Event = (props) => {
    const [event, setEvent] = useState(null); // Initialize event as null
    const [formattedDate, setFormattedDate] = useState('');
    const [formattedTime, setFormattedTime] = useState('');
    const [remaining, setRemaining] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(props.id);
                setEvent(eventData);

                // Format the date and time using Intl.DateTimeFormat
                const eventDate = new Date(eventData.event_date);

                // Format date as "Nov 12, 2024"
                const dateFormatter = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                });

                // Format time as "6:00 PM"
                const timeFormatter = new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                });

                setFormattedDate(dateFormatter.format(eventDate)); // Format date as 'Month Day, Year'
                setFormattedTime(timeFormatter.format(eventDate)); // Format time as '6:00 PM'

                const timeRemaining = calculateRemainingTime(eventDate);
                setRemaining(timeRemaining);

            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };
        fetchEvent();
    }, [props.id]);

    const calculateRemainingTime = (eventDate) => {
        const now = new Date();
        const timeDifference = eventDate - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate days
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
            
            // Build the result string conditionally
            let result = '';

            if (days > 0) {
                result += `${days}d `;
            }

            if (hours > 0) {
                result += `${hours}h `;
            }

            if (minutes > 0 || (days === 0 && hours === 0)) {
                // Show minutes only if there are minutes left, or if there are no days or hours (event is less than an hour away)
                result += `${minutes}m `;
            }

            return result.trim(); // Trim trailing space
        } else {
            return 'Event has passed';
        }
    };

    if (!event) return <p>Loading...</p>;

    return (
        <article className='event-information'>
            <img src={event.image} alt={event.title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i> 
                        {formattedDate}<br/>
                         {formattedTime} <br/><br/>
                          {remaining} remaining </p>
                </div>
            </div>
        </article>
    );
};

export default Event;
