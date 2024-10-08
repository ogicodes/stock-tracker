"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// This function is used to login a user
export async function loginAction( currentState: any, formData: FormData ): Promise<string> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const res = await fetch("http://localhost:3001/api/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    const json = await res.json()
    if (res.ok) {
        cookies().set("token", json.token, { path: "/", secure: true, sameSite: "strict", httpOnly: true })
    } else {
        return json.error
    }
    redirect("/dashboard")
}

// This function is used to sign up a user
export async function signUpAction( currentState: any, formData: FormData ): Promise<string> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    const res = await fetch("http://localhost:3001/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
    })
    const json = await res.json()
    if (res.ok) {
        cookies().set("token", json.token, { path: "/", secure: true, sameSite: "strict", httpOnly: true })
    } else {
        return json.error
    }
    redirect("/dashboard")
}

// This function is used to logout a user
export async function logoutAction(): Promise<void> {
    cookies().delete("token");
    redirect("/");
}