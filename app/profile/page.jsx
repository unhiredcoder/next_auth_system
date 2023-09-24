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

  async function logout() {
    if (typeof window !== "undefined") {
      // Your client-side code here
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
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Your client-side code here
      const user = localStorage.getItem('userData')
      if (user) {
        setUser(JSON.parse(user).name)
        setEmail(JSON.parse(user).Email)
      }
    }
    }, [])

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