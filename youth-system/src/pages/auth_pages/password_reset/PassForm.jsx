import React from "react";
import Box from "@/pages/adminDashboard/components/subcomponets/Box";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
export default function PassForm({
 
  password,
  cpassword,

  setPassword,
  setCpassword,

  errors,
  setErrors,
  onSubmit,
  loading,

  message,
  setMessage,
  messageType,

 
}) {
  const [showPass, setShowPass] = useState(false);
  const [showPassC, setShowPassC] = useState(false);
  return (
    <Box>
      <div className="w-full max-w-lg mx-auto px-2
      animate__animated animate__zoomIn animate__delay-2s
      ">
        <form
          onSubmit={onSubmit}
          onClick={() => setMessage("")}
          className="flex flex-col bg-white/80 backdrop-blur p-4 sm:p-6 rounded-lg gap-4 shadow-md "
        >
         

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium ">Password</label>
              <div className="relative w-full">
                <input
                  type={showPass ? "text" : "password"}
                  className="border rounded p-2 w-full text-sm "
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-xs text-red-500 ">{errors.password}</p>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-sm font-medium ">Confirm</label>
              <div className="relative w-full">
                <input
                  type={showPassC ? "text" : "password"}
                  className="border rounded p-2 w-full text-sm "
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
                >
                  {showPassC ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-xs text-red-500 ">{errors.cpassword}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
       
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-40 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition   "
            >
              {loading ? "Reseting..." : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </Box>
  );
}
