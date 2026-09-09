import React from "react";
import { Badge } from "../ui/badge";


const JobCard=({ job }) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl">

      <div>
        <h1 className="text-lg font-medium">
          {job?.companyId?.name || "Company Name"}
        </h1>

        <p className="text-gray-600 text-sm">
          {job?.location || "India"}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-bold my-2">
          {job?.title || "Job Title" }
        </h2>

        <p className="text-gray-600 text-sm">
          {job?.description || "No description available" }
        </p>
      </div>

      <div className="flex gap-2 mt-2 items-center flex-wrap">

        <Badge
          className="text-blue-600 font-bold"
          variant="ghost"
        >
          {job?.position || 0} positions
        </Badge>

        <Badge
          className="text-black font-bold"
          variant="ghost"
        >
          ₹{job?.salary || 0} LPA
        </Badge>

        <Badge
          className="text-[#f59e0b] font-bold"
          variant="ghost"
        >
          {job?.location || "Remote"}
        </Badge>

        <Badge
          className="text-[#FA4F09] font-bold"
          variant="ghost"
        >
          {job?.jobType || "Full Time"}
        </Badge>

      </div>
    </div>
  );
}

export default JobCard;