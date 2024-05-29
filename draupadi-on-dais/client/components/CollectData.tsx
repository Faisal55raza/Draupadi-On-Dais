"use client"
import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react'

function CollectData() {
    const { user, login } = useAuth();

    // console.log("User data is", user)
  
    const getLocalStorageData = async () =>{
      const userString = localStorage.getItem("user") || null; 
  
      if (userString) {
        try {
          const parsedUser = JSON.parse(userString);
          // @ts-ignore  // Temporarily ignore error
          login(parsedUser);
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }
    }
  
    useEffect(()=>{
      getLocalStorageData();
    },[])
  return (
    <>
    </>
  )
}

export default CollectData