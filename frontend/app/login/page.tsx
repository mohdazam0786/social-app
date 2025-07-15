"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (token) router.push("/");
  }, [token, router]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ⚠ replace /auth/login API as per backend
      const res = await axios.post("http://localhost:4000/auth/login", { username: username, password });
      localStorage.setItem("token", res.data.access_token);
      setToken(res.data.access_token);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to continue</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 rounded-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="mt-4 text-center text-gray-500">
              New user?{" "}
              <span className="text-blue-500 cursor-pointer" onClick={() => router.push('/signup')}>
                Create account
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
