import React from 'react'
import Footer from '@/components/Footer'
import Form from './Form'
import API from '@/service/api'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";


export default function Signup() {
const [fname, setFname] = useState("")
const [lname, setLname] = useState("")
const [email, setEmail] = useState("")
const [username, setUsername] = useState("")
const [phone, setPhone] = useState("")
const [password, setPassword] = useState("")
const [cpassword, setCpassword] = useState("")

const [loading, setLoading] = useState(false)
const navigate = useNavigate();
const [errors, setErrors] = useState({});
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");


const handleSignUp = async (e) => {
  e.preventDefault();

  setErrors({});
  setMessage("");
  setMessageType("");

  const nameRegex = /^[A-Za-z]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(07|01)\d{8}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

  const values = {
    username: username.trim(),
    fname: fname.trim(),
    lname: lname.trim(),
    email: email.trim(),
    phone: phone.trim(),
    password: password.trim(),
    cpassword: cpassword.trim(),
  };

  const allEmpty = Object.values(values).every(v => !v);

  if (allEmpty) {
    setMessage("All fields are required");
    setMessageType("error");
    return;
  }

  const newErrors = {};

  if (!values.username) newErrors.username = "Username is required";
  if (!values.fname) newErrors.fname = "First name is required";
  if (!values.lname) newErrors.lname = "Last name is required";
  if (!values.email) newErrors.email = "Email is required";
  if (!values.phone) newErrors.phone = "Phone number is required";
  if (!values.password) newErrors.password = "Password is required";
  if (!values.cpassword) newErrors.cpassword = "Confirmation password is required";

  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    setMessageType("error");
    return;
  }

  // Format validation
  if (!usernameRegex.test(values.username))
    newErrors.username = "Invalid username format";

  if (!nameRegex.test(values.fname))
    newErrors.fname = "Only letters allowed";

  if (!nameRegex.test(values.lname))
    newErrors.lname = "Only letters allowed";

  if (!emailRegex.test(values.email))
    newErrors.email = "Invalid email format";

  if (values.phone.startsWith("254"))
    newErrors.phone = "Use 07XXXXXXXX";

  else if (!phoneRegex.test(values.phone))
    newErrors.phone = "Invalid phone number";

  if (!passwordRegex.test(values.password))
    newErrors.password = "Weak password";

  if (values.password !== values.cpassword)
    newErrors.cpassword = "Passwords do not match";

  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    setMessageType("error");
    return;
  }

  // Submit
  try {
    setLoading(true);

    const res = await API.post("/auth/register", {
      username: values.username,
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      phone: `254${values.phone.slice(1)}`,
      password: values.password,
    });

    localStorage.setItem("token", res.data.token);
    setMessage("Signup successful. Redirecting...");
    setMessageType("success");

    setTimeout(() => navigate("/dashboard"), 1000);
  } catch (err) {
    setMessage(err.response?.data?.message || "Signup failed");
    setMessageType("error");
  } finally {
    setLoading(false);
  }
};




  return (
    <>
  <div className="relative min-h-screen w-full">
    {/* Background image */}
    <img
      src="https://images.pexels.com/photos/34071190/pexels-photo-34071190.jpeg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 z-10 bg-gray-300/70 flex items-center justify-center px-4">
      <div className="flex flex-col gap-4 items-center w-full max-w-lg">
        
        {/* Header */}
        <div className="bg-white/60 p-4 rounded w-full text-center border-b-4 border-blue-500">
          <h3 className="text-2xl font-semibold">Sign Up</h3>
          <span className="text-sm text-gray-700">
            To get started with AIC Kiu Youth System
          </span>

          {message && (
            <p
              className={`mt-2 text-sm ${
                messageType === 'success'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Form */}
        <Form
          fname={fname}
          lname={lname}
          email={email}
          username={username}
          phone={phone}
          password={password}
          cpassword={cpassword}
          setFname={setFname}
          setLname={setLname}
          setEmail={setEmail}
          setUsername={setUsername}
          setPhone={setPhone}
          setPassword={setPassword}
          setCpassword={setCpassword}
          message={message}
          setMessage={setMessage}
          messageType={messageType}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleSignUp}
          loading={loading}
        />
      </div>
    </div>
  </div>

  <Footer />
</>

  
  )
}
