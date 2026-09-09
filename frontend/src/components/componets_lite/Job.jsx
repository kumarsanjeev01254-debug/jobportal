import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../ui/avatar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

import developer from "../../assets/AI POWER.jpg";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  if (!job) {
    return null;
  }

  const handleBookmark = () => {
    setSaved((prev) => !prev);
  };

  const handleViewDetails = () => {
    console.log("FULL JOB OBJECT:", job);
    console.log("JOB ID:", job._id);

    if (!job._id) {
      console.error("Job ID is missing:", job);
      return;
    }

    navigate(`/description/${job._id}`);
  };

  const getTimeAgo = (date) => {
    if (!date) {
      return "Recently Posted";
    }

    const created = new Date(date);

    if (Number.isNaN(created.getTime())) {
      return "Recently Posted";
    }

    const now = new Date();

    const diff = Math.max(
      0,
      now.getTime() - created.getTime()
    );

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    if (days < 30) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
      return `${months} month${months === 1 ? "" : "s"} ago`;
    }

    const years = Math.floor(days / 365);

    return `${years} year${years === 1 ? "" : "s"} ago`;
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {getTimeAgo(job.createdAt)}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleBookmark}
        >
          <Bookmark
            className={`h-5 w-5 transition-all ${
              saved
                ? "fill-yellow-400 text-yellow-500"
                : "text-gray-500"
            }`}
          />
        </Button>
      </div>

      {/* COMPANY */}
      <div className="flex items-center gap-3 mt-5">
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={job.companyId?.logo || developer}
            alt={job.companyId?.name || "Company"}
          />

          <AvatarFallback>
            {job.companyId?.name
              ?.charAt(0)
              ?.toUpperCase() || "C"}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="font-semibold text-lg">
            {job.companyId?.name || "Company Name"}
          </h2>

          <p className="text-sm text-gray-500">
            {job.location || "India"}
          </p>
        </div>
      </div>

      {/* JOB DETAILS */}
      <div className="mt-5">
        <h1 className="text-xl font-bold">
          {job.title || "Job Title"}
        </h1>

        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {job.description || "No description available."}
        </p>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-5">

        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          {job.position || 0} Positions
        </span>

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          {job.jobType || "Full Time"}
        </span>

        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
          ₹{job.salary || 0} LPA
        </span>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-6">

        <Button
          type="button"
          className="flex-1"
          onClick={handleViewDetails}
        >
          View Details
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={handleBookmark}
        >
          {saved ? "Saved" : "Save Job"}
        </Button>

      </div>
    </div>
  );
};

export default Job;