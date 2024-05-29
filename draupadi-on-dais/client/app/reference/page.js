"use client";

import React, { useState } from "react";

const EventForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    profileLink: "",
    company: "",
    position: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div className="bg-base-300 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center mb-8">Suggest A Speaker</h1>
        <form onSubmit={handleSubmit} className="bg-base-200 p-8 rounded-xl shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="input input-bordered flex items-center gap-2">Name
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={handleChange}
              className="grow italic"
              required
            />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="input input-bordered flex items-center gap-2">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="grow italic"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profileLink" className="input input-bordered flex items-center gap-2">Linkedln</label>
            <input
              type="text"
              id="profileLink"
              name="profileLink"
              value={state.profileLink}
              onChange={handleChange}
              className="grow italic"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="input input-bordered flex items-center gap-2">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={state.company}
              onChange={handleChange}
              className="grow italic"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="input input-bordered flex items-center gap-2">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={state.position}
              onChange={handleChange}
              className="grow italic"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="input input-bordered flex items-center gap-2 h-24">Bio</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={state.bio}
              onChange={handleChange}
              className="grow italic"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="mt-4 btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;