
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

import { setSingleJob } from "@/redux/Jobslice";

import {
  APPLICANT_API_ENDPOINT,
  JOB_API_ENDPOINT,
} from "@/utilis/data";

function Description() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // =====================================================
  // Redux
  // =====================================================
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // =====================================================
  // Local State
  // =====================================================
  const [isApplied, setIsApplied] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // Fetch Single Job + Check Application
  // =====================================================
  useEffect(() => {
    const fetchJobAndApplication = async () => {
      if (!id) {
        toast.error("Job ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        console.log("=================================");
        console.log("Fetching Job ID:", id);
        console.log("Current User:", user?._id);
        console.log("=================================");

        // =================================================
        // 1. Fetch Single Job
        // =================================================
        const jobResponse = await axios.get(
          `${JOB_API_ENDPOINT}/get/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log(
          "Single Job Response:",
          jobResponse.data
        );

        if (!jobResponse.data.success) {
          toast.error(
            jobResponse.data.message ||
              "Job not found"
          );

          setLoading(false);
          return;
        }

        const job = jobResponse.data.job;

        // =================================================
        // Save Job To Redux
        // =================================================
        dispatch(setSingleJob(job));

        // =================================================
        // 2. Reset Applied Status
        // =================================================
        setIsApplied(false);

        // =================================================
        // 3. Check Application
        // =================================================
        if (user?._id) {
          try {
            const applicationResponse =
              await axios.get(
                `${APPLICANT_API_ENDPOINT}/get`,
                {
                  withCredentials: true,
                }
              );

            console.log(
              "Applied Jobs Response:",
              applicationResponse.data
            );

            if (applicationResponse.data.success) {
              // =================================================
              // Different possible response names
              // =================================================
              const applications =
                applicationResponse.data.applications ||
                applicationResponse.data.application ||
                applicationResponse.data.jobs ||
                applicationResponse.data.data ||
                [];

              console.log(
                "Applications:",
                applications
              );

              // =================================================
              // Check current job
              // =================================================
              const alreadyApplied =
                applications.some(
                  (application) => {
                    // Possible structures:
                    //
                    // application.job._id
                    // application.job
                    // application.jobId
                    // application.jobId._id

                    const appliedJobId =
                      application?.job?._id ||
                      application?.job ||
                      application?.jobId?._id ||
                      application?.jobId;

                    return (
                      String(appliedJobId) ===
                      String(id)
                    );
                  }
                );

              console.log(
                "Already Applied:",
                alreadyApplied
              );

              setIsApplied(
                Boolean(alreadyApplied)
              );
            }
          } catch (applicationError) {
            console.error(
              "Application Check Error:",
              applicationError.response?.data ||
                applicationError.message
            );

            // Don't block the page if checking
            // applications fails.
            setIsApplied(false);
          }
        }
      } catch (error) {
        console.error(
          "Fetch Job Error:",
          error.response?.data ||
            error.message
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to fetch job details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndApplication();
  }, [id, dispatch, user?._id]);

  // =====================================================
  // Apply Job
  // =====================================================
  const applyJobHandler = async () => {
    // =================================================
    // Check Job ID
    // =================================================
    if (!id) {
      toast.error("Job ID is missing");
      return;
    }

    // =================================================
    // Check Login
    // =================================================
    if (!user?._id) {
      toast.error(
        "Please login to apply for a job"
      );
      return;
    }

    // =================================================
    // Prevent Duplicate Click
    // =================================================
    if (isApplied) {
      toast.info(
        "You have already applied for this job."
      );
      return;
    }

    if (applyLoading) {
      return;
    }

    try {
      setApplyLoading(true);

      console.log(
        "Applying for Job:",
        id
      );

      // =================================================
      // POST Apply
      // =================================================
      const response = await axios.post(
        `${APPLICANT_API_ENDPOINT}/apply/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(
        "Apply Response:",
        response.data
      );

      // =================================================
      // Success
      // =================================================
      if (response.data.success) {
        setIsApplied(true);

        toast.success(
          response.data.message ||
            "Application submitted successfully"
        );

        // =================================================
        // Update Redux Job Application
        // =================================================
        if (singleJob) {
          const currentApplications =
            singleJob.application || [];

          const newApplication = {
            _id:
              response.data.application?._id ||
              Date.now(),

            applicant: user._id,

            job: id,
          };

          dispatch(
            setSingleJob({
              ...singleJob,

              application: [
                ...currentApplications,
                newApplication,
              ],
            })
          );
        }
      }
    } catch (error) {
      console.error(
        "Apply Job Error:",
        error.response?.data ||
          error.message
      );

      // =================================================
      // Duplicate Application
      // =================================================
      if (
        error.response?.status === 400 &&
        error.response?.data?.message ===
          "You have already applied for this job."
      ) {
        setIsApplied(true);

        toast.info(
          "You have already applied for this job."
        );

        return;
      }

      // =================================================
      // Other Errors
      // =================================================
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while applying"
      );
    } finally {
      setApplyLoading(false);
    }
  };

  // =====================================================
  // Loading Screen
  // =====================================================
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6">
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-gray-600 text-lg">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // Job Not Found
  // =====================================================
  if (!singleJob) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6">
        <div className="text-center">
          <p className="text-red-500 text-lg">
            Job not found
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">

      {/* =================================================
          Header
      ================================================= */}
      <div className="flex justify-between items-start gap-6 border-b pb-6">

        {/* Job Title + Tags */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {singleJob.title ||
              "Job Title"}
          </h1>

          <div className="flex gap-3 mt-4 flex-wrap">

            {/* Positions */}
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              {singleJob.position || 0} Positions
            </span>

            {/* Job Type */}
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
              {singleJob.jobType ||
                "Not specified"}
            </span>

            {/* Salary */}
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700">
              ₹{singleJob.salary || 0} LPA
            </span>

          </div>
        </div>

        {/* =================================================
            Apply Button
        ================================================= */}
        <Button
          type="button"
          disabled={
            isApplied ||
            applyLoading
          }
          onClick={applyJobHandler}
          className={
            isApplied
              ? "bg-gray-500 hover:bg-gray-500 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }
        >
          {applyLoading
            ? "Applying..."
            : isApplied
            ? "Already Applied"
            : "Apply Now"}
        </Button>
      </div>

      {/* =================================================
          Job Details
      ================================================= */}
      <div className="mt-8 space-y-6">

        {/* =================================================
            Role
        ================================================= */}
        <div className="flex flex-col sm:flex-row">
          <span className="font-semibold w-40">
            Role:
          </span>

          <span className="text-gray-600">
            {singleJob.title ||
              "Not specified"}
          </span>
        </div>

        {/* =================================================
            Location
        ================================================= */}
        <div className="flex flex-col sm:flex-row">
          <span className="font-semibold w-40">
            Location:
          </span>

          <span className="text-gray-600">
            {singleJob.location ||
              "Not specified"}
          </span>
        </div>

        {/* =================================================
            Experience
        ================================================= */}
        <div className="flex flex-col sm:flex-row">
          <span className="font-semibold w-40">
            Experience:
          </span>

          <span className="text-gray-600">
            {singleJob.experience || 0} Years
          </span>
        </div>

        {/* =================================================
            Salary
        ================================================= */}
        <div className="flex flex-col sm:flex-row">
          <span className="font-semibold w-40">
            Salary:
          </span>

          <span className="text-gray-600">
            ₹{singleJob.salary || 0} LPA
          </span>
        </div>

        {/* =================================================
            Job Type
        ================================================= */}
        <div className="flex flex-col sm:flex-row">
          <span className="font-semibold w-40">
            Job Type:
          </span>

          <span className="text-gray-600">
            {singleJob.jobType ||
              "Not specified"}
          </span>
        </div>

        {/* =================================================
            Vacancies
        ================================================= */}
        <div className="flex flex-col sm:flex-row">
          <span className="font-semibold w-40">
            Vacancies:
          </span>

          <span className="text-gray-600">
            {singleJob.position || 0}
          </span>
        </div>

        {/* =================================================
            Posted Date
        ================================================= */}
        <div className="flex flex-col sm:flex-row">
          <span className="font-semibold w-40">
            Posted Date:
          </span>

          <span className="text-gray-600">
            {singleJob.createdAt
              ? new Date(
                  singleJob.createdAt
                ).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        {/* =================================================
            Job Description
        ================================================= */}
        <div className="pt-4">
          <h2 className="text-xl font-semibold mb-3">
            Job Description
          </h2>

          <p className="text-gray-600 leading-7 whitespace-pre-line">
            {singleJob.description ||
              "No description provided."}
          </p>
        </div>

        {/* =================================================
            Requirements
        =================================================
        */}
        <div className="pt-2">
          <h2 className="text-xl font-semibold mb-3">
            Requirements
          </h2>

          {singleJob.requirement ? (
            <p className="text-gray-600 leading-7 whitespace-pre-line">
              {singleJob.requirement}
            </p>
          ) : (
            <p className="text-gray-500">
              No requirements specified.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Description;

