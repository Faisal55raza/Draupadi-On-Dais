"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";

function SpeakerList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/event/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const eventData = await response.json();
      setEvents(eventData.data);
      console.log(eventData.data)
    
    } catch (error) {
      console.error(error);
      // Handle error, maybe display a message to the user
    }
  };

  return (
    <div className="h-full w-screen flex items-center gap-10 flex-col p-2 bg-base-200">
      {/* Your other JSX code */}
      <h1 className="text-3xl ml-6 w-full text-black text-left font-semibold">
        Upcoming Events
      </h1>
      <p className="text-xl ml-6 w-full text-gray-600 text-left ">
        <span style={{ color: "#8B0000" }}>Register for Upcoming events.</span>
        <br />
        <br /> Even in 2024, women leaders are woefully underrepresented in
        public forums. We asked decision-makers a simple question, why do we not
        see enough women on stage? Basis the insights, we went back to home to
        create
        <span style={{ color: "#8B0000" }}>
          an easy-to-access database of women experts across multiple
          industries, available for speaking opportunities.
        </span>
        <br /> <br />
        <Link href={"/events/new"} className="font-bold italic link link-primary">
          Organize an event!
        </Link>
      </p>
      <div className="h-full w-3xl flex-wrap flex justify-center items-center gap-10 flex-row">
        {events&&events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div>
      <Link href={`/events/${event._id}`} >   
        <div className="card w-[400px] h-[200px] card-side bg-base-100 shadow-xl flow-wrap">
          <figure>
            <img src={"https://0x0.st/XHGR.png"} alt="" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{event.name}</h2>
            <p>Type: {event.type}</p>
            <p>Date: {`${new Date(event.date).getDate()}/${new Date(event.date).getMonth() + 1}/${new Date(event.date).getFullYear()}`}</p>
            {/* You can add more details as needed */}
            <div className="card-actions justify-end">
              
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SpeakerList;