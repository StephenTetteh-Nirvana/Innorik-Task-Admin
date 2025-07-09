'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginForm = () => {

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const userInfo = {
      username: formData.get("username"),
      password: formData.get("password")
    }
    
    try{
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/login`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
      })
      
      if(res.status === 200){
        toast("Login successful",{
          duration: 1500,
          position: "top-center",
          action: {
            label: "OK",
            onClick: () => console.log("success"),
          },
        })
        const data = await res.json();
        localStorage.setItem("token",JSON.stringify(data.token))
        router.push('/dashboard')
      }else if(res.status === 401){
        toast("Wrong Credentials",{
          position: "top-center",
          action: {
            label: "OK",
            onClick: () => console.log("error"),
          },
        })
      }else{
        console.log("An internal server occured...please try again later")
      }
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center w-full h-full">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => login(e)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Admin223"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  name="password" 
                  id="password" 
                  type="password" 
                  required 
                />
              </div>
            </div>
            {loading ?
              <Button className="w-full mt-5" disabled={true}>
                Loading...Please Wait
              </Button>
              :
              <Button type="submit" className="w-full mt-5">
                Login
              </Button>
            }
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default LoginForm
