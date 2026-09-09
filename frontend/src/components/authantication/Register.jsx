import React, { useState } from "react";
import Navbar from "../componets_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../../utilis/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authslice";
import { Loader2 } from "lucide-react";

function Register() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: "",
    role: "Student",
    file: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !input.fullname ||
      !input.email ||
      !input.password ||
      !input.phonenumber
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phonenumber", input.phonenumber);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Registration Failed"
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
          <h1 className="font-bold text-2xl text-center mb-6">
            Register
          </h1>

          <div className="my-4">
            <label className="block mb-2 font-medium">
              Full Name
            </label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

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
            />
          </div>

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
            />
          </div>

          <div className="my-4">
            <label className="block mb-2 font-medium">
              Phone Number
            </label>
            <Input
              type="tel"
              name="phonenumber"
              value={input.phonenumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="my-5">
            <label className="block mb-3 font-medium">
              Role
            </label>

            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setInput({
                  ...input,
                  role: value,
                })
              }
              className="flex gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="Student"
                  id="student"
                />
                <label htmlFor="student">
                  Student
                </label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="Recruiter"
                  id="recruiter"
                />
                <label htmlFor="recruiter">
                  Recruiter
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="my-5">
            <label className="block mb-2 font-medium">
              Profile Photo
            </label>

            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
            />
          </div>

          {loading ? (
            <Button
              disabled
              className="w-full mt-5"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-5"
            >
              Register
            </Button>
          )}

          <p className="text-center mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;