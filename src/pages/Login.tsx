import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../api/client";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { useAuthStore } from "../stores/auth";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoginAuthType {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must not exceed 15 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*])[A-Za-z\d@#$!%^&*]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export default function Login() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [passwordType, setPasswordType] = useState("password");
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const togglePasswordType = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const onSubmit = async (data: LoginAuthType) => {
    console.log("data",data)
      try{
      const res = await api.post('/auth/login', { email:data.email, password:data.password })
      setAuth(res.data.accessToken, res.data.user.id)
      nav('/')
    }catch(err: any){
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF5F9]  flex items-center  overflow-hidden w-full">
      <div className="min-h-screen basis-full flex flex-wrap w-full  justify-center overflow-y-auto">
        <div className=" min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center">
          <div className="max-w-[550px] w-full ">
            <div className="w-full bg-white rounded-lg p-8">
              <div className="mb-6">
                <h1 className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-[1000] text-center text-[#377DFF]">
                  task 👋
                </h1>
                <div className=" text-base text-default-600 mt-2 mb-3 text-center font-normal">
                  Sign in to access your account.
                </div>

              </div>
              <div className="">

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-5 xl:mt-7"
                >
                  <div className="space-y-8">
                    {/* Email Field */}
                    <div>
                      <Label
                        htmlFor="email"
                        className="mb-2 block font-bold text-default-600"
                      >
                        Email
                      </Label>
                      <Input
                      
                        {...register("email")}
                        type="email"
                        id="email"
                        className={cn("", {
                          "border-destructive": errors.email,
                        })}
                        placeholder="Email address"
                      />
                      {errors.email && (
                        <div className="text-destructive mt-2">
                          {errors.email.message}
                        </div>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <div className="flex justify-between items-center">
                        <Label
                          htmlFor="password"
                          className="mb-2 block font-bold text-default-600"
                        >
                          Password
                        </Label>
                        <div className="mb-2 text-right">
                          <Link
                            to="/auth/Recover"
                            className="text-sm text-[#97A4AF] border-b border-dashed border-[#97a4af]"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>

                      <div className="relative">
                        <Input
                          type={passwordType}
                          id="password"
                          {...register("password")}
                          className={cn("pr-10", {
                            "border-destructive": errors.password,
                          })}
                          placeholder="********"
                        />
                        <div
                          className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                          onClick={togglePasswordType}
                        >
                          {passwordType === "password" ? (
                            <Icon
                              icon="heroicons:eye"
                              className="w-5 h-5 text-default-400"
                            />
                          ) : (
                            <Icon
                              icon="heroicons:eye-slash"
                              className="w-5 h-5 text-default-400"
                            />
                          )}
                        </div>
                      </div>
                      {errors.password && (
                        <div className="text-destructive mt-2">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button className="w-full mt-4 cursor-pointer">
                Sign In
                  </Button>
                </form>

                {/* Signup Link */}
                <div className="mt-5 2xl:mt-8 text-base text-default-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary cursor-pointer">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className='max-w-md mx-auto p-6'>
//   <h1 className='text-2xl font-bold mb-4'>Login</h1>
//   <form onSubmit={submit} className='space-y-3'>
//     <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' className='w-full p-2 border rounded' />
//     <input required value={password} onChange={e=>setPassword(e.target.value)} type='password' placeholder='Password' className='w-full p-2 border rounded' />
//     {err && <div className='text-red-500'>{err}</div>}
//     <button className='px-4 py-2 bg-sky-600 text-white rounded'>Login</button>
//   </form>
//   <div className='mt-4'>Don't have an account? <Link to='/signup' className='text-sky-600'>Signup</Link></div>
// </div>
