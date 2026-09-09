import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

const Latestjobs = () => {
  const allJobs = useSelector(
    (state) => state.job.allJobs || []
  );

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold">
        <span className="text-[#6B3AC2]">
          Latest & Top
        </span>{" "}
        Job Openings
      </h2>

      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length === 0 ? (
          <span>No jobs available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Latestjobs;