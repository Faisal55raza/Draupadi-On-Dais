"use client";
import { useAuth } from "@/context/AuthContext";
// EventForm.jsx
import CollectData from "@/components/collectData";
import React, { use, useState} from "react";
import { useRouter } from 'next/navigation';

const EventForm = () => {
  const [formData, setformData] = useState({
    name: "",
    organisation: "",
    venue: "",
    date: "",
    footfall: "",
    type: "",
    details: "",
    user: "",
    state: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const { user } = useAuth();
  const router = useRouter();
  const accessToken = user?.refreshToken || null;

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(accessToken);

      try {
        const response = await fetch('http://localhost:3001/api/v1/event/new', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(formData),
          
        });
  
        if (response.ok) {
          // Handle success
          
          console.log('Event created successfully');
          router.push("/events");
        } else {
          // Handle error
          console.error('Failed to register user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    
  };

  return (
    <div className="bg-base-300 min-h-screen py-8">
      <CollectData/>
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Organise an Event
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-base-200 p-8 rounded-xl shadow-lg"
        >
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="input input-bordered flex items-center gap-2"
            >
              Name
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="grow italic"
                required
              />
            </label>
          </div>

          {/* Organisation Input */}
          <div className="mb-4">
            <label
              htmlFor="organisation"
              className="input input-bordered flex items-center gap-2"
            >
              Organisation
              <input
                type="text"
                id="organisation"
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
                className="grow italic"
                required
              />
            </label>
          </div>

        

          {/* formData Input */}
        
          {/* Venue Input */}
          <div className="mb-4">
            <label
              htmlFor="venue"
              className="input input-bordered flex items-center gap-2"
            >
              Venue
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="grow italic"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="input input-bordered flex items-center gap-2"
            >
              State
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="grow italic"
                required
              />
            </label>
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="input input-bordered flex items-center gap-2"
            >
              Date
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="grow italic"
                required
              />
            </label>
          </div>

          {/* Footfall Input */}
          <div className="mb-4">
            <label
              htmlFor="footfall"
              className="input input-bordered flex items-center gap-2"
            >
              Footfall
              <input
                type="number"
                id="footfall"
                name="footfall"
                value={formData.footfall}
                onChange={handleChange}
                className="grow italic"
                required
              />
            </label>
          </div>

          {/* Event Type Input */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="input input-bordered flex items-center gap-2"
            >
              Type of Event
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="grow italic"
                required
              />
            </label>
          </div>

          {/* Guest Speakers Input */}
          <div className="mb-4">
            <label
              htmlFor="details"
              className="input input-bordered flex items-center gap-2"
            >
            Event Detail
              <input
                type="text"
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="grow italic"
                required
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="mt-4 btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;