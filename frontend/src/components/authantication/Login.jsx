import React, { useState } from "react";
import Navbar from "../componets_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUser,
} from "../../redux/authslice.js";

import { USER_API_ENDPOINT } from "../../utilis/data.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "Student",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email.trim() || !input.password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    try {
      dispatch(setLoading(true));

      console.log("========== LOGIN START ==========");
      console.log("Email:", input.email);
      console.log("Role:", input.role);
      console.log("API:", `${USER_API_ENDPOINT}/login`);

      const response = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        {
          email: input.email.trim(),
          password: input.password,
          role: input.role,
        },
        {
          withCredentials: true,
        }
      );

      console.log("LOGIN DATA:", response.data);
      console.log("Status:", response.status);
      console.log("Data:", response.data);
      console.log("User:", response.data?.user);

      if (!response.data?.success) {
        toast.error(
          response.data?.message || "Login failed"
        );
        return;
      }

      // IMPORTANT
      if (!response.data?.user) {
        console.error(
          "LOGIN SUCCESS BUT USER IS MISSING:",
          response.data
        );

        toast.error(
          "Login successful but user data was not returned"
        );

        return;
      }

      //Save user into Redux
      dispatch(setUser(response.data.user));

      console.log("USER BEING SENT TO REDUX:", response.data.user);
      console.log(response.data.user);

      toast.success(
        response.data.message || "Login successful"
      );
   

      // Recruiter -> admin
      if (response.data.user.role === "Recruiter") {
        navigate("/admin", {
          replace: true,
        });
      } else {
        // Student -> home
        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      console.error(
        "========== LOGIN ERROR =========="
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Response:",
        error.response?.data
      );

      console.error(
        "Message:",
        error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-300 rounded-md p-6 my-10 shadow-md"
        >
          <h1 className="text-2xl font-bold text-center mb-5">
            Login
          </h1>

          {/* EMAIL */}
          <div className="my-4">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="my-4">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* ROLE */}
          <div className="my-5">
            <label className="block mb-3 font-medium">
              Role
            </label>

            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                />

                Student
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                />

                Recruiter
              </label>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-5"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          {/* REGISTER */}
          <p className="text-center mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;