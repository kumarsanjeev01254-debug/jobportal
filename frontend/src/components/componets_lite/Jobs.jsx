import React from "react";
import Navbar from "./Navbar";
import Filtercard from "./Filtercard";
import Job from "./Job";
import { useSelector } from "react-redux";

function Jobs() {
  const allJobs = useSelector((state) => state.job.allJobs || []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">

          {/* Left Sidebar */}
          <div className="w-[20%]">
            <Filtercard />
          </div>

          {/* Right Side */}
          <div className="flex-1">
            {allJobs.length === 0 ? (
              <div className="flex items-center justify-center h-40">
                <span className="text-lg text-gray-500 font-medium">
                  No jobs found
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {allJobs.map((job) => (
                  <Job
                    key={job._id}
                    job={job}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Jobs;