
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import { JOB_API_ENDPOINT } from "@/utilis/data";

const CreateJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirement: "",
    location: "",
    salary: "",
    jobType: "",
    position: "",
    experience: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${JOB_API_ENDPOINT}/create`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("CREATE JOB RESPONSE:", response.data);

      if (response.data.success) {
        alert("Job posted successfully");

        navigate("/admin/jobs");
      }
    } catch (err) {
      console.error("CREATE JOB ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Failed to create job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">

        <h1 className="text-3xl font-bold mb-8">
          Create New Job
        </h1>

        {error && (
          <div className="mb-5 p-3 rounded-md bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block font-medium mb-2">
              Job Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              placeholder="Software Developer"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded-md p-3"
              placeholder="Job description"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Requirement
            </label>

            <textarea
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-md p-3"
              placeholder="MERN, React, Node.js..."
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Location
            </label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              placeholder="Gurugram"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Salary
            </label>

            <input
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              placeholder="30"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Job Type
            </label>

            <input
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              placeholder="Full Time"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Position
            </label>

            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              placeholder="20"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Experience
            </label>

            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              placeholder="0"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Company ID
            </label>

            <input
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              placeholder="Company ID"
              required
            />
          </div>

          <div className="flex gap-3">

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Posting..."
                : "Post Job"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate("/admin/jobs")
              }
            >
              Cancel
            </Button>

          </div>

        </form>
      </div>
    </>
  );
};

export default CreateJob;

