"use client"
import React, { useState, useEffect } from "react";

const Event = ({ params }) => {
  const [event, setEvent] = useState({});

  const getEventDetails = async () => {
    try {
      // console.log(params)
      const response = await fetch(`http://localhost:3001/api/v1/event/event/${params.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setEvent(data.data);
        }
      } else {
        console.error('Failed to load event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getEventDetails();
  }, []);

  return (
    <div className="bg-base-300 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Event Image */}
        <div className="mb-8">
          <img
            src={event.poster}
            alt={event.name}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Event Details */}
        <div className="bg-base-200 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-6">{event.name}</h1>

          {/* Organization */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Organized By:</h2>
            <p className="text-lg">{event.organisation}</p>
          </div>

          {/* State */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">State:</h2>
            <p className="text-lg">{event.state}</p>
          </div>

          {/* Venue */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Venue:</h2>
            <p className="text-lg">{event.venue}</p>
          </div>

          {/* Date */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Date</h2>
            <p className="text-lg">{event.date}</p>
          </div>

          {/* Footfall */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Footfall:</h2>
            <p className="text-lg">{event.footfall}</p>
          </div>

          {/* Type of Event */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Event Type:</h2>
            <p className="text-lg">{event.type}</p>
          </div>

          {/* Brief */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">About the Event:</h2>
            <p className="text-lg">{event.details}</p>
          </div>

          
          {/* </div><div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact:</h2>
            <ul className="list-disc pl-6">
           
                  <li className="text-lg mb-2">
                    {speaker}
                  </li>
                
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Event;