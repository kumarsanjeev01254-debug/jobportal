
import React from "react";
import Navbar from "./Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";

function Browse() {
  // Get jobs from Redux
  const { allJobs } = useSelector(
    (store) => store.job
  );

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 px-4">

        {/* Heading */}
        <h1 className="text-xl font-bold mb-5">
          Search Results ({allJobs?.length || 0})
        </h1>

        {/* Jobs */}
        {allJobs?.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {allJobs.map((job) => (
              <Job
                key={job._id}
                job={job}
              />
            ))}

          </div>

        ) : (

          <div className="text-center py-20">

            <h2 className="text-xl font-semibold text-gray-600">
              No jobs found
            </h2>

            <p className="text-gray-500 mt-2">
              There are currently no jobs available.
            </p>

          </div>

        )}

      </div>
    </div>
  );
}

export default Browse;

