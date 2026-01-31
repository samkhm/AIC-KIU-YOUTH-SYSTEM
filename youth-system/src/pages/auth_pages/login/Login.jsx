import React from 'react'
import Footer from '@/components/Footer'
import Form from './Form'
import { useState } from 'react'
import API from '@/service/api'
import { useNavigate } from "react-router-dom"
import { toast } from 'sonner'

import { getFirstName } from '@/utils/auth'
import BackgroundSlider from '../backgroundimages/BackgroundSlider'


export default function Login() {


  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("")
    setMessageType("")

    const values = {
      identifier: identifier.trim(),
      password: password.trim()
    };

    if (!values.identifier && !values.password) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    const newErrors = {};

    if (!values.identifier) newErrors.identifier = "Email or username is required";
    if (!values.password) newErrors.passowrd = "Password is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setMessageType("error");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post('/auth/login', {
        identifier: values.identifier,
        password: values.password
      });

      localStorage.setItem("token", res.data.token);
      const firstName = getFirstName();

      const hour = new Date().getHours();

      let timeOfDay = "";

      if (hour < 12) {
        timeOfDay = "Good morning";
      } else if (hour < 18) {
        timeOfDay = "Good afternoon";
      } else {
        timeOfDay = "Good evening";
      }

      toast.success(`${timeOfDay} ${firstName.charAt(0).toUpperCase() + firstName.slice(1)}, it's my pleasure to have you here😊`);


      setTimeout(() => navigate("/dashboard"), 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Login In failed");
      setMessageType("error");

    } finally {
      setLoading(false)
    }


  }

  return (
    <>
  <div className="relative min-h-screen w-full">
    {/* Background */}
    <BackgroundSlider className="absolute inset-0 w-full h-full object-cover" />
    {/* <img
      src="https://images.pexels.com/photos/34071190/pexels-photo-34071190.jpeg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    /> */}

    {/* Overlay */}
    <div className="absolute inset-0 z-10 bg-blue-300/50 flex items-center justify-center px-4">
      <div className="flex flex-col gap-4 items-center w-full max-w-lg">
        
        {/* Header */}
        <div className="bg-white/60 p-4 rounded w-full text-center border-b-4 border-blue-500">
          <h3 className="text-2xl font-semibold">Login</h3>
          <span className="text-sm text-gray-700">
            To get started with AIC Kiu Youth System
          </span>
        </div>

        {/* Form */}
        <Form
          identifier={identifier}
          password={password}
          setIdentifier={setIdentifier}
          setPassword={setPassword}
          message={message}
          messageType={messageType}
          setMessage={setMessage}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleLogin}
          loading={loading}
        />
      </div>
    </div>
  </div>

  <Footer />
</>


  )
}
