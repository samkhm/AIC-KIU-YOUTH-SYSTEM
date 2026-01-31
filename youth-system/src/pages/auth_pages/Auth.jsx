import { useState } from "react"
import Login from "./login/Login"
import Signup from "./register/Signup"

export default function Auth() {
  const [mode, setMode] = useState("login") // default

  return (
    <>
      {mode === "login" ? (
        <Login switchToRegister={() => setMode("register")} />
      ) : (
        <Signup switchToLogin={() => setMode("login")} />
      )}
    </>
  )
}
