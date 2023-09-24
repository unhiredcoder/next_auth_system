'use client'
import React, { useContext, useState, useEffect } from 'react';
import { Input, Button, Form } from 'antd';
import styles from '../app.module.css';
import axios from 'axios';
import { OtpContext } from '../OtpProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const { App } = styles;

const PasswordForm = () => {
  const router = useRouter();
  const { details } = useContext(OtpContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Add a state variable to check if it's running on the client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component mounts (client-side)
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    // Check if it's running on the client before executing client-side code
    if (isClient) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post("/api/user/recoverpass", {
            email: details.email,
            password: password,
          });

          if (response.status === 200) {
            toast.success('Password Reset successfully');
            router.push("/login");
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
