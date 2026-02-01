import React from "react";
import Box from "@/pages/adminDashboard/components/subcomponets/Box";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
export default function Form({
  fname,
  lname,
  email,
 
  phone,
  password,
  cpassword,

  setFname,
  setLname,
  setEmail,
 
  setPhone,
  setPassword,
  setCpassword,

  errors,
  setErrors,
  onSubmit,
  loading,

  message,
  setMessage,
  messageType,

  switchToLogin
}) {
  const [showPass, setShowPass] = useState(false);
  const [showPassC, setShowPassC] = useState(false);
  return (
    <Box>
      <div className="w-full max-w-lg mx-auto px-2">
        <form
          onSubmit={onSubmit}
          onClick={() => setMessage("")}
          className="flex flex-col bg-white/80 backdrop-blur p-4 sm:p-6 rounded-lg gap-4 shadow-md animate__animated animate__zoomIn animate__delay-2s"
        >
         

          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium animate__animated animate__zoomIn animate__delay-2s">First Name</label>
              <input
                type="text"
                className="border rounded p-2 w-full text-sm animate__animated animate__zoomIn animate__delay-2s"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                  if (errors.fname) setErrors((p) => ({ ...p, fname: "" }));
                }}
              />
              <p className="text-xs text-red-500 animate__animated animate__zoomIn animate__delay-2s">{errors.fname}</p>
            </div>

            <div>
              <label className="text-sm font-medium animate__animated animate__zoomIn animate__delay-2s">Last Name</label>
              <input
                type="text"
                className="border rounded p-2 w-full text-sm animate__animated animate__zoomIn animate__delay-2s"
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                  if (errors.lname) setErrors((p) => ({ ...p, lname: "" }));
                }}
              />
              <p className="text-xs text-red-500 animate__animated animate__zoomIn animate__delay-2s">{errors.lname}</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium animate__animated animate__zoomIn animate__delay-2s">Email</label>
            <input
              type="email"
              className="border rounded p-2 w-full text-sm animate__animated animate__zoomIn animate__delay-2s"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((p) => ({ ...p, email: "" }));
              }}
            />
            <p className="text-xs text-red-500 animate__animated animate__zoomIn animate__delay-2s">{errors.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium animate__animated animate__zoomIn animate__delay-2s">Phone</label>
            <input
              type="text"
              className="border rounded p-2 w-full text-sm animate__animated animate__zoomIn animate__delay-2s  "
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
              }}
            />
            <p className="text-xs text-red-500">{errors.phone}</p>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium">Password</label>
              <div className="relative w-full">
                <input
                  type={showPass ? "text" : "password"}
                  className="border rounded p-2 w-full text-sm"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((p) => ({ ...p, password: "" }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-xs text-red-500">{errors.password}</p>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-sm font-medium">Confirm</label>
              <div className="relative w-full">
                <input
                  type={showPassC ? "text" : "password"}
                  className="border rounded p-2 w-full text-sm"
                  value={cpassword}
                  onChange={(e) => {
                    setCpassword(e.target.value);
                    if (errors.cpassword)
                      setErrors((p) => ({ ...p, cpassword: "" }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassC(!showPassC)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassC ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-xs text-red-500">{errors.cpassword}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-center sm:text-left">
              Already have an account?{" "}
              <button
  type="button"
  onClick={switchToLogin}
  className="text-blue-500 underline"
>
  Login
</button>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </Box>
  );
}
