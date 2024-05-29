"use client"
import { useEffect, useState } from "react";

function Profile({params}) {

  const[speakersData, setSpeakerData] = useState();

  const getSpeakerDetails = async() => {
    try {
      console.log(params);
      const response = await fetch(`http://localhost:3001/api/v1/speaker/speaker/${params.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        if(data){
          console.log("speaker data", data.data)
          setSpeakerData(data.data)
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
  },[])

  


  return (
    <div className="text-4xl mx-auto px-4 pt-10 mr-4 text-center bg-base-200">
      <div className="flex justify-center gap-20 items-center">
        <div className="avatar flex justify-center items-center mr-4">
          <div className="w-64 h-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex justify-center items-center">
            <img
              src={speakersData && speakersData.avatar ? speakersData.avatar : "https://www.svgrepo.com/download/65676/avatar.svg"}
              className="w-3/4 h-3/4 rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-start items-start flex-col">
          <p className="font-semibold">{speakersData ? speakersData?.user.fullName : "FullName"}</p>
          <p className="text-xl mt-4">Location: Delhi</p>
          <p className="text-xl">Designation: {speakersData ? speakersData?.user.organisation : "Designation: SDE at Amazon"}</p>
          <p className="text-xl">Industry: {speakersData ? speakersData?.user.industry : "Industry: IT"}</p>
          {/* <p className="text-xl">{speakersData ? setSpeakerData?.user.industry : "Category: Invite<"}</p> */}
          <p className="text-xl">
            Mail:{" "}
            {speakersData && (
              <a
              href={`mailto:${speakersData?.user.email}`}
              className="text-blue-500 hover:underline"

              >{speakersData?.user.email}</a>
            )}
          </p>
        </div>
      </div>
      <div className="my-2">
        <label className="form-control">
          <div className="label">
            <span className="label-text mx-40">Education: </span>
          </div>
          <div className="text-lg mb-6 textarea-bordered h-full p-4 mx-40 text-gray-700 placeholder-gray-500 placeholder-opacity-50 rounded-lg resize-none focus:ring focus:ring-primary focus:ring-opacity-50">
            
            <div className="label">
              <span className="label-text mx-10">{speakersData ? speakersData.education.college: ""} </span>
              <span className="label-text mx-10">{speakersData ? speakersData.education.field: ""} </span>
              <span className="label-text mx-10">{speakersData ? speakersData.education.degree: ""} </span>
          </div>
          </div>
        </label>
      </div>
      <div className="my-8">
        <label className="form-control">
          <div className="label">
            <span className="label-text mx-40">Your bio</span>
          </div>
          <div className="text-lg mb-6 textarea-bordered h-full p-4 mx-40 text-gray-700 placeholder-gray-500 placeholder-opacity-50 rounded-lg resize-none focus:ring focus:ring-primary focus:ring-opacity-50">
            {speakersData ? speakersData.bio: `
              Mughda has over 20 years of experience in broadcast journalism. She
              is also an Autism Activist, Corporate Trainer & Mindfulness Coach.
              She runs a platform called 'Not The Different', in association with
              Bookosmia- a leading creative platform for children in India. Not
              That Different is India's first children-led movement in normalizing
              conversations around neurodiversity and push for inclusion. She
              continues to write for various portals and her on-screen assignments
              have been for both news television and websites. Her forte is
              storytelling and documentary writing.
            `}
          </div>
        </label>
      </div>
      <div className="my-8">
        <label className="form-control">
          <div className="label">
            <span className="label-text mx-40">Experience</span>
          </div>
          <div className="text-lg mb-6 textarea-bordered h-full p-4 mx-40 text-gray-700 placeholder-gray-500 placeholder-opacity-50 rounded-lg resize-none focus:ring focus:ring-primary focus:ring-opacity-50">
            {speakersData ? speakersData.experience : `
              Mughda has over 20 years of experience in broadcast journalism. She
              is also an Autism Activist.
            `}
          </div>
        </label>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="w-full rounded-lg shadow-lg p-6 bg-white">
          <div className="text-xl font-semibold">
            <p className="mb-4">
              {/* Mughda is a Chief Content Officer at Backstage - an interactive,
              audio social networking platform that is a powerful tool for
              brands and content creators to reach their audience via the audio
              medium. */}
            </p>
            <div className="flex items-center justify-center">
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500 hover:text-blue-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 0H4C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H20C22.2091 24 24 22.2091 24 20V4C24 1.79086 22.2091 0 20 0ZM7.80005 20H4.80005V9.19995H7.80005V20ZM6.29999 7.39999C5.12981 7.39999 4.19995 6.47014 4.19995 5.29997C4.19995 4.12979 5.12981 3.19995 6.29999 3.19995C7.47016 3.19995 8.40002 4.12979 8.40002 5.29997C8.40002 6.47014 7.47016 7.39999 6.29999 7.39999ZM21.9999 20H18.9999V14.6C18.9999 13.4 18.9999 11.8 17.1999 11.8C15.3999 11.8 15.2999 13.2 15.2999 14.7V20H12.2999V9.19995H15.1999V10.9C15.7999 10.1 17.1999 8.89999 19.0999 8.89999C21.5999 8.89999 22 10.6 22 12.7V20H21.9999Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-pink-500 hover:text-pink-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4.32 4.32 0 0 1 12.37 16 4.32 4.32 0 0 1 8 11.37 4.32 4.32 0 0 1 12.37 7 4.32 4.32 0 0 1 16 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400 hover:text-blue-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.4375 4.59375C22.375 4.9375 21.3125 5.15625 20.25 5.25C21.3125 4.6875 22.125 3.65625 22.5 2.40625C21.4375 3 20.25 3.40625 19 3.625C17.9375 2.5625 16.5 2 14.9375 2C12.3125 2 10.1875 4.125 10.1875 6.75C10.1875 7.09375 10.25 7.40625 10.3125 7.71875C6.65625 7.46875 3.46875 5.53125 1.40625 2.875C1.03125 3.53125 0.8125 4.3125 0.8125 5.125C0.8125 6.71875 1.5625 8.125 2.75 9.03125C2.15625 9 1.59375 8.78125 1.09375 8.5C1.09375 8.53125 1.09375 8.59375 1.09375 8.65625C1.09375 10.75 2.5625 12.5 4.375 12.9375C4 13.0312 3.59375 13.0938 3.15625 13.0938C2.9375 13.0938 2.75 13.0312 2.5625 12.9688C2.9375 14.6875 4.3125 16 6 16C4.625 17.3125 2.90625 18.125 1 18.125C0.65625 18.125 0.34375 18.0938 0 18.0312C1.71875 19.4688 3.875 20.25 6.1875 20.25C14.9375 20.25 19.5625 13.1875 19.5625 6.90625C19.5625 6.75 19.5625 6.59375 19.5312 6.4375C20.5938 5.78125 21.5 4.9375 22.2188 3.96875C21.5 4.375 20.7812 4.65625 20 4.84375Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
