'use client'
import React, { useContext, useState } from 'react';
import { Input, Button, Form } from 'antd';
import styles from '../app.module.css'
import axios from 'axios';
import { OtpContext } from '../OtpProvider';
const { App } = styles;
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const PasswordForm = () => {
  const router=useRouter()
  const { details } = useContext(OtpContext);
  console.log("🚀 ~ file: page.jsx:12 ~ PasswordForm ~ details:", details)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (typeof window !== "undefined") {
      // Your client-side code here
    
    if (password === confirmPassword) {
      try {
        const response = await axios.post("/api/user/recoverpass", {
          email: details.email, // Send email separately
          password: password, // Send password separately
        });
        console.log("🚀 ~ file: page.jsx:32 ~ handleSubmit ~ response:", response)

        if (response.status === 200) {
          toast.success('Password Reset successfully');
          router.push("/login")
        } else {
          toast.error('Password Reset failed');
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        toast.error('Password Reset failed');
      }
    } else {
      toast.error('Passwords do not match');
    }
  }
};

  return (
    <div className={App}>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />      <Form>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input type="password" value={password} onChange={handlePasswordChange} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Confirm passwords doesn't match");
              },
            }),
          ]}
        >
          <Input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
};

export default PasswordForm;
