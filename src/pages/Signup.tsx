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

interface SignupAuthType {
  name: string;
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
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

  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   try{
  //     const res = await api.post('/auth/login', { email, password })
  //     setAuth(res.data.accessToken, res.data.user)
  //     nav('/')
  //   }catch(err: any){
  //     setErr(err?.response?.data?.message || 'Login failed')
  //   }
  // }

  const onSubmit = async (data: SignupAuthType) => {
    console.log("data", data);
    try {
      const res = await api.post("/auth/signup", {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
      });
      setAuth(res.data.accessToken, res.data.user);
      nav("/login");
    } catch (err: any) {
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
                    <div>
                      <Label
                        htmlFor="name"
                        className="mb-2 block font-bold text-default-600"
                      >
                        Name
                      </Label>
                      <Input
                        {...register("name")}
                        type="text"
                        id="name"
                        className={cn("", {
                          "border-destructive": errors.name,
                        })}
                        placeholder="Enter name"
                      />
                      {errors.name && (
                        <div className="text-destructive mt-2">
                          {errors.name.message}
                        </div>
                      )}
                    </div>

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

                    <div>
                      <div className="flex justify-between items-center">
                        <Label
                          htmlFor="password"
                          className="mb-2 block font-bold text-default-600"
                        >
                          Password
                        </Label>
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
                  <Button
                    className="w-full mt-4 cursor-pointer"
                  >
                   Create Account
                  </Button>
                </form>

                {/* Signup Link */}
                <div className="mt-5 2xl:mt-8 text-base text-default-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary cursor-pointer">
                    Login
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
