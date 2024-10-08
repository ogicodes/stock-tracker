"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction, signUpAction } from "@/actions/auth"
import { useFormState } from "react-dom"

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")
  const toggleForm = () => setIsLogin(!isLogin)
  const choseFormAction = isLogin ? loginAction : signUpAction
  const [error, formAction] = useFormState(choseFormAction, undefined)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#04040D] text-white">
      <div className="bg-[#121533] p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form action={formAction} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input name="name" value={name} onChange={ (e) => setName(e.target.value) } id="name" type="text" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" value={email} onChange={ (e) => setEmail(e.target.value) } id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" value={password} onChange={ (e) => setPassword(e.target.value) } id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={toggleForm} className="text-sm text-blue-600 hover:underline">
            {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  )
}