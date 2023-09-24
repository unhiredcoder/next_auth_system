'use client'
import React, { useEffect } from 'react';
import styles from '../app.module.css'; // Import your CSS module
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
 // Add a state variable to check if it's running on the client
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
   setIsClient(true); // Set isClient to true when the component mounts (client-side)

   // Check if it's running on the client before accessing window or localStorage
   if (isClient) {
     const userData = localStorage.getItem('userData');
     if (userData) {
       const parsedUserData = JSON.parse(userData);
       setUser(parsedUserData.name);
       setEmail(parsedUserData.Email);
     }
   }
 }, []);

 const logout = async () => {
   // Check if it's running on the client before making client-side requests
   if (isClient) {
     try {
       const response = await axios.get('/api/user/logout');
       if (response.status === 200) {
         router.push('/login');
       } else {
         console.error("Logout failed");
       }
     } catch (error) {
       console.error("An error occurred during logout:", error);
     }
   }
 };


  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>Hi, I'm {user.toUpperCase()}!</h1>
        <p className={styles.subtitle}>Full Stack Web Developer & DevOps Enthusiast</p>
      </header>
      <main className={styles.main}>
        <section className={styles.profileInfo}>
          <p>
           I'm passionate about web development and DevOps practices. My skills include MERN (MongoDB, Express.js, React, Node.js) stack development and implementing DevOps pipelines for efficient software delivery.
          </p>
        </section>
        <section className={styles.contactInfo}>
          <h2>Contact Information</h2>
          <p>Email: {email}</p>
        </section>
        <button className={styles.logoutButton} onClick={logout}>Logout</button>
      </main>
    </div>
  );
};

export default Profile;