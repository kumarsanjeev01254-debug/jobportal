
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import { JOB_API_ENDPOINT } from "@/utilis/data";

const PostJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirement: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    position: "",
  });

  // ================= GET JOB =================
  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("========== EDIT JOB ==========");
        console.log("JOB ID:", id);

        const response = await axios.get(
          `${JOB_API_ENDPOINT}/get/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log(
          "SINGLE JOB RESPONSE:",
          response.data
        );

        if (response.data.success) {
          const job = response.data.job;

          setFormData({
            title: job.title || "",
            description: job.description || "",
            requirement: job.requirement || "",
            location: job.location || "",
            salary: job.salary || "",
            jobType: job.jobType || "",
            experience: job.experience ?? "",
            position: job.position || "",
          });
        } else {
          setError("Job not found");
        }
      } catch (error) {
        console.error(
          "GET JOB ERROR:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load job"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= UPDATE JOB =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      console.log("========== UPDATE JOB ==========");
      console.log("JOB ID:", id);
      console.log("DATA:", formData);

      const response = await axios.put(
        `${JOB_API_ENDPOINT}/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(
        "UPDATE RESPONSE:",
        response.data
      );

      if (response.data.success) {
        alert("Job updated successfully");

        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(
        "UPDATE JOB ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update job"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="max-w-4xl mx-auto py-10 px-4">
          <h1 className="text-2xl font-bold">
            Loading job...
          </h1>
        </div>
      </>
    );
  }

  // ================= PAGE =================
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4">

        <h1 className="text-3xl font-bold mb-2">
          Edit Job
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Job ID: {id}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* TITLE */}
          <div>
            <label className="block font-medium mb-2">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          {/* DESCRIPTION */}
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
              required
            />
          </div>

          {/* REQUIREMENT */}
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
              required
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block font-medium mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          {/* SALARY */}
          <div>
            <label className="block font-medium mb-2">
              Salary
            </label>

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          {/* JOB TYPE */}
          <div>
            <label className="block font-medium mb-2">
              Job Type
            </label>

            <input
              type="text"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          {/* EXPERIENCE */}
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
              required
            />
          </div>

          {/* POSITION */}
          <div>
            <label className="block font-medium mb-2">
              Position
            </label>

            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full border rounded-md p-3"
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <Button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update Job"}
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

export default PostJobs;

