'use client'
import React, { useContext, useEffect, useState } from 'react';
import { OtpContext } from '../OtpProvider.js'; // Adjust the path as needed
import OtpInput from 'otp-input-react';
import { useRouter, } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ResendNewOtp = Math.floor(100000 + Math.random() * 900000).toString();

const NewPassword = () => {
    const router = useRouter();
    const { details } = useContext(OtpContext);
    const [enteredOtp, setEnteredOtp] = useState('');
    const [isOtpIncorrect, setIsOtpIncorrect] = useState(false);
    const handleOtpChange = (otp) => {
        setEnteredOtp(otp);
        setIsOtpIncorrect(false);
    };
    const ResendOtp = async () => {
        const response = await axios.post('/api/user/resetEmail', { ...details, generatedOtp: ResendNewOtp });
        if (response.status === 200) {
            toast.success('Email Resend successfully')
        }
    }
    useEffect(() => {
        const handleValidation = () => {
            if (typeof window !== "undefined") {
                if (enteredOtp === details.generatedOtp || enteredOtp === ResendNewOtp) {
                    router.push('/recoverpass');
                } else {
                    setIsOtpIncorrect(true);
                }
            }
        };

        // Attach the click event listener for the "Verify OTP" button
        const verifyButton = document.getElementById('verifyButton');
        verifyButton.addEventListener('click', handleValidation);

        // Clean up the event listener when the component unmounts
        return () => {
            verifyButton.removeEventListener('click', handleValidation);
        };
    }, [enteredOtp, details.generatedOtp, router]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <h2 style={{ marginBottom: '20px' }}>Enter Your OTP:</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <OtpInput
                    value={enteredOtp}
                    onChange={handleOtpChange}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    OTPLength={6}
                    inputStyle={{
                        width: '40px',
                        height: '40px',
                        margin: '5px',
                        fontSize: '20px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        textAlign: 'center',
                    }}
                    focusStyle={{
                        border: '2px solid #007bff',
                    }}
                />
            </div>
            {isOtpIncorrect && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    Incorrect OTP. Please try again.
                </div>
            )}
            <button
                id="verifyButton" // Add an ID to the button
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Verify OTP
            </button>
            <p>Didn't get OTP? <u onClick={ResendOtp}>Resend</u></p>
        </div>
    );
};

export default NewPassword; // Wrap your component with withRouter
