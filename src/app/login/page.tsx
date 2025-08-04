"use client";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import { getLoginUser } from "../services/users";
 import { useForm } from 'react-hook-form';
import { UserLogin } from "../interface/userType";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const [isValidUser, setIsValidUser] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState<UserLogin | null>();

  const handleUserLogin = async (data: { username: string; password: string }) => {    
    const loginUserDetails = await getLoginUser(data);
    
    if (loginUserDetails) {
      router.push("/");
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
    }
    setIsUserLogin(data);
  };

  const handleCustomChange = () => {
    setIsValidUser(false);
    setIsUserLogin(null);
;  }


  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Card className="p-4 w-[30vw]">
          <h3>Login</h3>
          <b className="mb-2">Don't have an account? <Link href="/signup">Sign Up</Link></b>
          <div>
            <form onSubmit={handleSubmit(handleUserLogin)}>
              <div>
                <label className="form-label">Username:</label>
                <input
                  type="text"
                  placeholder="john.doe@example.com"
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  onChange={handleCustomChange}
                  className="form-field py-2"
                />
                { errors.username && (
                  <p className="text-danger small mt-0">{errors.username.message as string}</p>
                )}

              </div>

              <div>
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  placeholder="password@123"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  onChange={handleCustomChange}
                  className="form-field py-2"
                />
                {errors.password && (
                  <p className="text-danger small mt-1 mb-0">{errors.password.message  as string}</p>
                )}
              </div>

              <div className="text-end mt-3">
                <Link href="/forgotpassword" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary w-100 p-2">
                  Login
                </button>
                { isUserLogin && !isValidUser && (
                  <p className="text-danger small mt-1 text-start">The email or password you entered is incorrect. Please try again.</p>
                )}
              </div>
              <div>
                <p className="text-center mt-3">or Login with</p>
                <div className="d-flex">
                  {/* <Button className="btn btn-light w-50 m-1"><GoogleOutlined /></Button>
                  <Button className="btn btn-light w-50 m-1"><FacebookFilled /></Button> */}
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Login;
