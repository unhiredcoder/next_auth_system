'use client'
import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import styles from '../app.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Import the OtpContext
import { OtpContext } from '../OtpProvider.js'; // Adjust the path as needed

const { App } = styles;

const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
const resetPasswardEmail = () => {
  // Your client-side code here
  const { details, setDetails } = useContext(OtpContext);
  console.log("🚀 ~ file: page.jsx:15 ~ resetPasswardEmail ~ otp:", details)
  const router = useRouter();
  const onFinish = async (values) => {
    if (typeof window !== "undefined") {
    const  AllDetails={
      ...values,generatedOtp
    }
    setDetails(AllDetails)
    console.log("🚀 ~ file: page.jsx:21 ~ onFinish ~ allvalues:", await details)
    try {
      const response = await axios.post('/api/user/resetEmail', {details});
      if (response.status === 200) {
        console.log('Email sent successfully');
        router.push("/otpverify");
        // Handle success, e.g., show a success message to the user
      } else {
        console.error('Failed to send email');
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error, e.g., show an error message to the user
    }
    }
  };


  return (
    <>
      <div className={App}>
        <Form
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder='Please input your email!' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send reset email
            </Button>
          </Form.Item>
        </Form >
      </div >
    </>)
}

export default resetPasswardEmail