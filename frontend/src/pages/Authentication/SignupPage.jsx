import React, { useState } from 'react';
import { sendOtp } from '../../service/authService';

const SignupPage = () => {
  const [email, setEmail] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await sendOtp({ email });
      console.log('OTP sent successfully:', response);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }

    setEmail('');
  };

  return (
    <div>
      <h2>Signup Form</h2>

      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};

export default SignupPage;