import React from "react";
import Footer from "@/components/Footer";
import Form from "./CornfirmEmailForm";
import { useState } from "react";
import API from "@/service/api";
import { useNavigate } from "react-router-dom";

export default function CornfirmEmail() {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({});
    setMessage("");
    setMessageType("");

    const values = {
      identifier: identifier.trim(),
    };

    if (!values.identifier) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    const newErrors = {};

    if (!values.identifier)
      newErrors.identifier = "Email or username is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/cornfirmIdentifier", {
        identifier: values.identifier,
      });
     
      localStorage.setItem("userId", res.data?.userId)
      
      const msg = "Redirecting to reset...";
      setMessage(msg);
      setMessageType("success");

      setTimeout(() => navigate("/reset_password"), 4000);
    } catch (err) {
      setMessage(err.response?.data?.message);
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
                ">
          <div className="flex flex-col gap-4 items-center w-full max-w-lg animate__animated animate__zoomIn animate__delay-1s">
            {/* Header */}
            <div className="bg-white/60 p-4 rounded w-full text-center border-b-4 border-blue-500">
              <h3 className="text-2xl font-semibold ">Cornfirm Email</h3>
              <span className="text-sm text-gray-700 ">
                To reset your password
              </span>
            </div>

            {/* Form */}
            <Form
              identifier={identifier}
              setIdentifier={setIdentifier}
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
  );
}
