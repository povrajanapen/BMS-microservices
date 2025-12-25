"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { UserPlus } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:3004"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${AUTH_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 409) {
          setError("An account with this email already exists. Try logging in instead.")
        } else if (res.status === 400) {
          setError("Please fill in all fields correctly and try again.")
        } else {
          setError(data?.message || "Unable to create account. Please try again.")
        }

        toast({
          title: "Sign up failed",
          description:
            data?.message ||
            (res.status === 409
              ? "Email already registered"
              : res.status === 400
                ? "Invalid sign up details"
                : "Unable to create account"),
          variant: "destructive",
        })
        return
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem("auth_token", data.token)
        window.localStorage.setItem("auth_user", JSON.stringify(data.user))
      }

      toast({
        title: "Account created",
        description: `Welcome, ${data.user.name}`,
      })

      router.push("/")
    } catch (err: any) {
      setError("Something went wrong while creating your account. Please try again.")
      toast({
        title: "Sign up failed",
        description: err.message || "Unable to create account",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Create account</h1>
          </div>
          <Link href="/login" className="text-xs text-primary hover:underline">
            Already have an account? Login
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </Button>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </main>
  )
}
