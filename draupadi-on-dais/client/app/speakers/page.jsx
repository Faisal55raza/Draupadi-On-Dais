"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {  useAuth } from "@/context/AuthContext";

function speakerlist() {

  const { user, login } = useAuth();
  // console.log("spearker page per hu ra bhabaa", user)
  const[speakersData, setSpeakerData] = useState([]);

  const getSpeakerDetails = async() => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/speaker/speakers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data?.data)
        if(data){
          setSpeakerData(data?.data)
        }
        
      } else {
        console.error('Failed to login user');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getSpeakerDetails();
  }, [])

  useEffect(()=>{

  }, [speakersData])

  if(!speakersData) {
    return(
      <div className="h-full w-screen flex items-center gap-10 flex-col p-2 bg-base-200">
        <h1 className="text-3xl ml-6 w-full text-black text-left font-semibold">
          Invite An Expert{" "}
        </h1>
        <p className="text-xl ml-6 w-full text-gray-600 text-left ">
          <span style={{ color: "#8B0000" }}>
            Most panels you attend will be missing a woman.
          </span>
          <br></br>
          <br></br> Even in 2024, women leaders are woefully underrepresented in
          public forums. We asked decision-makers a simple question, why do we not
          see enough women on stage? Basis the insights, we went back to home to
          create
          <span style={{ color: "#8B0000" }}>
            an easy-to-access database of women experts across multiple
            industries, available for speaking opportunities.
          </span>
          <br></br> <br></br>
          You can also{" "}
          <Link
            href={"/speakers/new"}
            className="font-bold italic link link-primary"
          >
            be a speaker!
          </Link>
        </p>
    
      </div>
    )
  }
  
  return (
    <div className="h-full w-screen flex items-center gap-10 flex-col p-2 bg-base-200">
      <h1 className="text-3xl ml-6 w-full text-black text-left font-semibold">
        Invite An Expert{" "}
      </h1>
      <p className="text-xl ml-6 w-full text-gray-600 text-left ">
        <span style={{ color: "#8B0000" }}>
          Most panels you attend will be missing a woman.
        </span>
        <br></br>
        <br></br> Even in 2024, women leaders are woefully underrepresented in
        public forums. We asked decision-makers a simple question, why do we not
        see enough women on stage? Basis the insights, we went back to home to
        create
        <span style={{ color: "#8B0000" }}>
          an easy-to-access database of women experts across multiple
          industries, available for speaking opportunities.
        </span>
        <br></br> <br></br>
        You can also{" "}
        <Link
          href={"/speakers/new"}
          className="font-bold italic link link-primary"
        >
          be a speaker!
        </Link>
      </p>
      <div className="h-full w-3xl flex-wrap flex justify-center items-center gap-10 flex-row">
        {
          speakersData && speakersData.length > 0  ? speakersData.map( (speaker, index) => (

              <div key={index} className="card w-[400px] h-[200px] card-side bg-base-100 shadow-xl ">
                <figure>
                  <img
                    className="w-48"
                    src={
                      speaker.user.avatar ? speaker.user.avatar: "https://imgs.search.brave.com/sR4RKCXtkGn6TPyT_b8xVkxHDzlrEPydeQpaqiDgxhI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE1/Nzc0MTE3Ny9waG90/by9wb3J0cmFpdC1v/Zi1hLXlvdW5nLWFk/dWx0LWFzaWFuLXdv/bWFuLWluLXZlbmlj/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VldnbkJJUU15/TlBGMWE3bWgzQ0Zj/aTdnXzk3TWZvRnk1/akh2dkVsaFZIOD0"
                    }
                    alt="avatar"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{speaker.user.fullName ? speaker.user.fullName:"User name"}</h2>
                  <p>Org;- {speaker.user.organisation ? speaker.user.organisation:"User Org."}</p>
                  <p>An event specially for women in tech.</p>
                  <div className="card-actions justify-end">
                    <Link href={`/speakers/${speaker._id}`} className="btn btn-sm btn-primary">
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
          )) : ""
        }
      </div>
      
    </div>
  );

  



}

export default speakerlist;
