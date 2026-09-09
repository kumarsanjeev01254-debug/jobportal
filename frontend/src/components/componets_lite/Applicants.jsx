
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { JOB_API_ENDPOINT } from "@/utilis/data";
import Navbar from "./Navbar";

const Applicants = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= GET APPLICANTS =================
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("========== APPLICANTS ==========");
        console.log("Job ID:", id);

        const response = await axios.get(
          `${JOB_API_ENDPOINT}/get/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log(
          "JOB WITH APPLICANTS:",
          response.data
        );

        if (response.data.success) {
          setJob(response.data.job);
        } else {
          setError(
            response.data.message ||
              "Job not found"
          );
        }
      } catch (error) {
        console.error(
          "APPLICANTS ERROR:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load applicants"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplicants();
    }
  }, [id]);

  // ================= UPDATE STATUS =================
  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      console.log(
        "APPLICATION ID:",
        applicationId
      );

      console.log(
        "NEW STATUS:",
        status
      );

      const response = await axios.put(
        `${JOB_API_ENDPOINT}/application/${applicationId}/status`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "STATUS RESPONSE:",
        response.data
      );

      if (response.data.success) {
        // Update status in current page
        setJob((prevJob) => ({
          ...prevJob,

          application:
            prevJob.application.map(
              (application) =>
                application._id ===
                applicationId
                  ? {
                      ...application,
                      status,
                    }
                  : application
            ),
        }));
      }
    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status"
      );
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="max-w-6xl mx-auto py-10 px-4">
          <h1 className="text-2xl font-bold">
            Loading applicants...
          </h1>
        </div>
      </>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <>
        <Navbar />

        <div className="max-w-6xl mx-auto py-10 px-4">

          <div className="p-4 bg-red-50 border border-red-300 text-red-600 rounded-md">
            {error}
          </div>

          <Button
            className="mt-4"
            variant="outline"
            onClick={() =>
              navigate("/admin/jobs")
            }
          >
            Back to Jobs
          </Button>

        </div>
      </>
    );
  }

  // ================= APPLICATIONS =================
  const applications =
    job?.application || [];

  const applicantCount =
    applications.length;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-4">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Applicants
            </h1>

            <p className="text-gray-500 mt-2">
              Job:{" "}
              <span className="font-semibold text-black">
                {job?.title || "N/A"}
              </span>
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              navigate("/admin/jobs")
            }
          >
            Back to Jobs
          </Button>

        </div>

        {/* ================= JOB INFO ================= */}
        <div className="mb-8 p-6 rounded-lg border bg-white shadow-sm">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <p className="text-sm text-gray-500">
                Job Title
              </p>

              <p className="font-semibold mt-1">
                {job?.title || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="font-semibold mt-1">
                {job?.location || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Applicants
              </p>

              <p className="font-semibold text-2xl mt-1">
                {applicantCount}
              </p>
            </div>

          </div>

        </div>

        {/* ================= NO APPLICANTS ================= */}
        {applicantCount === 0 ? (
          <div className="border rounded-lg p-10 text-center">

            <h2 className="text-xl font-semibold">
              No candidates applied yet
            </h2>

            <p className="text-gray-500 mt-2">
              Candidates who apply for this
              job will appear here.
            </p>

          </div>
        ) : (

          /* ================= APPLICANT LIST ================= */
          <div className="space-y-6">

            {applications.map(
              (application, index) => {

                const applicant =
                  application?.applicant;

                const profile =
                  applicant?.profile || {};

                const status =
                  application?.status ||
                  "Pending";

                return (
                  <div
                    key={
                      application?._id ||
                      index
                    }
                    className="border rounded-xl p-6 bg-white shadow-sm"
                  >

                    {/* ================= TOP ================= */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                      {/* APPLICANT BASIC INFO */}
                      <div className="flex items-start gap-4">

                        <img
                          src={
                            profile?.profilePhoto ||
                            "https://via.placeholder.com/100"
                          }
                          alt={
                            applicant?.fullname ||
                            "Applicant"
                          }
                          className="w-20 h-20 rounded-full object-cover border"
                        />

                        <div>

                          <h2 className="text-2xl font-bold">
                            {applicant?.fullname ||
                              "Unknown Candidate"}
                          </h2>

                          <p className="text-gray-600 mt-1">
                            {applicant?.email ||
                              "No email"}
                          </p>

                          <p className="text-gray-600">
                            {applicant?.phonenumber ||
                              "No phone number"}
                          </p>

                          <p className="text-sm text-gray-500 mt-2">
                            Candidate #{index + 1}
                          </p>

                        </div>

                      </div>

                      {/* ================= STATUS ================= */}
                      <div className="w-full lg:w-52">

                        <label className="block text-sm font-medium mb-2">
                          Application Status
                        </label>

                        <select
                          value={status}
                          onChange={(e) =>
                            handleStatusChange(
                              application?._id,
                              e.target.value
                            )
                          }
                          className="w-full border rounded-md p-2 bg-white"
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Selected">
                            Selected
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>
                        </select>

                      </div>

                    </div>

                    {/* ================= FULL DETAILS ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                      {/* BIO */}
                      <div className="border rounded-lg p-5">

                        <h3 className="font-semibold text-lg">
                          Bio
                        </h3>

                        <p className="text-gray-600 mt-2">
                          {profile?.bio ||
                            "No bio available"}
                        </p>

                      </div>

                      {/* SKILLS */}
                      <div className="border rounded-lg p-5">

                        <h3 className="font-semibold text-lg">
                          Skills
                        </h3>

                        {Array.isArray(
                          profile?.skills
                        ) &&
                        profile.skills.length > 0 ? (

                          <div className="flex flex-wrap gap-2 mt-3">

                            {profile.skills.map(
                              (
                                skill,
                                skillIndex
                              ) => (
                                <span
                                  key={
                                    skillIndex
                                  }
                                  className="px-3 py-1 bg-gray-100 border rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              )
                            )}

                          </div>

                        ) : (
                          <p className="text-gray-500 mt-2">
                            No skills available
                          </p>
                        )}

                      </div>

                      {/* PHONE */}
                      <div className="border rounded-lg p-5">

                        <h3 className="font-semibold text-lg">
                          Phone
                        </h3>

                        <p className="text-gray-600 mt-2">
                          {applicant?.phonenumber ||
                            "No phone number"}
                        </p>

                      </div>

                      {/* EMAIL */}
                      <div className="border rounded-lg p-5">

                        <h3 className="font-semibold text-lg">
                          Email
                        </h3>

                        <p className="text-gray-600 mt-2 break-all">
                          {applicant?.email ||
                            "No email available"}
                        </p>

                      </div>

                      {/* RESUME NAME */}
                      <div className="border rounded-lg p-5">

                        <h3 className="font-semibold text-lg">
                          Resume
                        </h3>

                        <p className="text-gray-600 mt-2">
                          {profile?.resumeOriginalname ||
                            "Resume uploaded"}
                        </p>

                        {profile?.resume && (
                          <Button
                            type="button"
                            className="mt-4"
                            onClick={() =>
                              window.open(
                                profile.resume,
                                "_blank"
                              )
                            }
                          >
                            View Resume
                          </Button>
                        )}

                      </div>

                      {/* APPLICATION DATE */}
                      <div className="border rounded-lg p-5">

                        <h3 className="font-semibold text-lg">
                          Applied On
                        </h3>

                        <p className="text-gray-600 mt-2">
                          {application?.createdAt
                            ? new Date(
                                application.createdAt
                              ).toLocaleString()
                            : "Date not available"}
                        </p>

                      </div>

                    </div>

                    {/* ================= STATUS TEXT ================= */}
                    <div className="mt-6 pt-5 border-t">

                      <span className="text-sm text-gray-500">
                        Current Status:
                      </span>

                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          status === "Selected"
                            ? "bg-green-100 text-green-700"
                            : status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {status}
                      </span>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>
    </>
  );
};

export default Applicants;

