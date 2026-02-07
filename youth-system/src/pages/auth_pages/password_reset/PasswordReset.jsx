import React from "react";
import Footer from "@/components/Footer";
import Form from "./PassForm";
import API from "@/service/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("");
    setMessageType("");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    const values = {
     
   
      password: password.trim(),
      cpassword: cpassword.trim(),
    };

    const allEmpty = Object.values(values).every((v) => !v);

    if (allEmpty) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    const newErrors = {};

    if (!values.password) newErrors.password = "Password is required";
    if (!values.cpassword)
      newErrors.cpassword = "Confirmation password is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setMessageType("error");
      return;
    }

    // Format validation


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

      const id = localStorage.getItem("userId")

      const res = await API.put(`/auth/resetPassword/${id}`, {       
      
        password: values.password,
      });

      
      setMessage("Success. Redirecting to login...");
      setMessageType("success");

      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen w-full">
       
        {/* Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4
        animate__animated animate__zoomIn animate__delay-1s
        ">
          <div className="flex flex-col gap-4 items-center w-full max-w-lg ">
            {/* Header */}
            <div className="bg-white/60 p-4 rounded w-full text-center border-b-4 border-blue-500 ">
              <h3 className="text-2xl font-semibold ">Reset Password</h3>
              <span className="text-sm text-gray-700 ">
                To login to AIC Kiu Youth System
              </span>

              {message && (
                <p
                  className={`mt-2 text-sm ${
                    messageType === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>

            {/* Form */}
            <Form
               password={password}
              cpassword={cpassword}
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
  );
}
