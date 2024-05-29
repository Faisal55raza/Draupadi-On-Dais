"use client"

import CollectData from "@/components/collectData";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Form = () => {
  const [state, setState] = useState({
    bio: "",
    education: {
      degree: "",
      field: "",
      college: "",
    },
    experience: "",
  });

  const { user } = useAuth();
  const router = useRouter();
  const accessToken = user?.refreshToken || null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "degree" || name === "field" || name === "college") {
      setState({
        ...state,
        education: {
          ...state.education,
          [name]: value,
        },
      });
    } else {
      setState({ ...state, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(state);

  try {
    const response = await fetch("http://localhost:3001/api/v1/speaker/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(state),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const data = await response.json(); // Parse JSON response
    console.log("Response from server:", data); // Log the parsed data
    // Optionally, you can handle the response data here
    router.push("/speaker")
  } catch (error) {
    console.error("Error:", error);
    // Handle errors if any
  }
};

return (
  <div className="bg-base-300 min-h-screen py-8">
    <CollectData/>
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Be a Speaker
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-8 rounded-xl shadow-lg"
      >

        {/* Bio */}
        <div className="mb-4">
          <label
            htmlFor="bio"
            className="textarea textarea-bordered flex items-center gap-2"
          >
            Bio
            <textarea
              id="bio"
              name="bio"
              value={state.bio}
              onChange={handleChange}
              className="textarea textarea-bordered grow italic"
              required
            />
          </label>
        </div>

        {/* Education */}
        <div className="mb-4">
          <label
            htmlFor="degree"
            className="input input-bordered flex items-center gap-2"
          >
            Degree
            <input
              type="text"
              id="degree"
              name="degree"
              value={state.education.degree}
              onChange={handleChange}
              className="grow italic"
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="field"
            className="input input-bordered flex items-center gap-2"
          >
            Field
            <input
              type="text"
              id="field"
              name="field"
              value={state.education.field}
              onChange={handleChange}
              className="grow italic"
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="college"
            className="input input-bordered flex items-center gap-2"
          >
            College
            <input
              type="text"
              id="college"
              name="college"
              value={state.education.college}
              onChange={handleChange}
              className="grow italic"
              required
            />
          </label>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label
            htmlFor="experience"
            className="input input-bordered flex items-center gap-2"
          >
            Experience
            <input
              type="text"
              id="experience"
              name="experience"
              value={state.experience}
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

export default Form;

