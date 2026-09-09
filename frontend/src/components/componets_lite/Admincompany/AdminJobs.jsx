
import React, { useEffect, useState } from "react";

import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { JOB_API_ENDPOINT } from "@/utilis/data";
import { setAllAdminJobs } from "@/redux/jobSlice";

import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= REDUX =================
  const allAdminJobs = useSelector(
    (state) => state.job?.allAdminJobs ?? []
  );

  // ================= GET ADMIN JOBS =================
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        setLoading(true);
        setError("");

        console.log(
          "========== GET ADMIN JOBS =========="
        );

        const res = await axios.get(
          `${JOB_API_ENDPOINT}/admin/jobs`,
          {
            withCredentials: true,
          }
        );

        console.log(
          "ADMIN JOBS RESPONSE:",
          res.data
        );

        if (res.data.success) {
          dispatch(
            setAllAdminJobs(
              res.data.jobs || []
            )
          );
        } else {
          setError(
            res.data.message ||
              "Failed to fetch jobs"
          );
        }
      } catch (err) {
        console.error(
          "GET ADMIN JOBS ERROR:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to fetch jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminJobs();
  }, [dispatch]);

  // ================= SEARCH =================
  const filteredJobs = allAdminJobs.filter(
    (job) => {
      const searchText =
        search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      return (
        job?.title
          ?.toLowerCase()
          .includes(searchText) ||

        job?.location
          ?.toLowerCase()
          .includes(searchText) ||

        job?.companyId?.name
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search jobs..."
            className="border border-input bg-background rounded-md p-2 w-80 outline-none focus:ring-2 focus:ring-ring"
          />

          <Button
            type="button"
            onClick={() =>
              navigate("/admin/jobs/create")
            }
          >
            Post New Job
          </Button>

        </div>

        {/* ================= TITLE ================= */}
        <h2 className="text-xl font-semibold mb-4">
          Manage Jobs
        </h2>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="border rounded-lg p-8 text-center">
            <p>Loading jobs...</p>
          </div>
        )}

        {/* ================= ERROR ================= */}
        {!loading && error && (
          <div className="border rounded-lg p-8 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* ================= NO JOBS ================= */}
        {!loading &&
          !error &&
          filteredJobs.length === 0 && (
            <div className="border rounded-lg p-8 text-center">

              <p className="text-muted-foreground">
                {search
                  ? "No job found."
                  : "No jobs available."}
              </p>

              {!search && (
                <Button
                  className="mt-4"
                  onClick={() =>
                    navigate(
                      "/admin/jobs/create"
                    )
                  }
                >
                  Create New Job
                </Button>
              )}

            </div>
          )}

        {/* ================= JOB TABLE ================= */}
        {!loading &&
          !error &&
          filteredJobs.length > 0 && (
            <div className="border rounded-lg bg-card p-2">

              <AdminJobsTable
                allJobs={filteredJobs}
              />

            </div>
          )}

      </div>
    </div>
  );
};

export default AdminJobs;

