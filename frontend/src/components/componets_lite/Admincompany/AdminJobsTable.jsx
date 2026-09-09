
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = ({ allJobs = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Table>

        <TableCaption>
          Your Recent Posted Jobs
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {allJobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-10"
              >
                No jobs available
              </TableCell>
            </TableRow>
          ) : (

            allJobs.map((job) => {

              const applicantCount =
                Array.isArray(job?.application)
                  ? job.application.length
                  : 0;

              return (
                <TableRow key={job?._id}>

                  <TableCell className="font-medium">
                    {job?.title || "N/A"}
                  </TableCell>

                  <TableCell>
                    {job?.companyId?.name ||
                      job?.company?.name ||
                      "N/A"}
                  </TableCell>

                  <TableCell>
                    {job?.location || "N/A"}
                  </TableCell>

                  <TableCell>
                    {job?.salary || "N/A"}
                  </TableCell>

                  <TableCell>
                    <span className="font-semibold">
                      {applicantCount}
                    </span>
                  </TableCell>

                  <TableCell>
                    {job?.createdAt
                      ? new Date(
                          job.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </TableCell>

                  {/* ACTION */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">

                      {/* EDIT */}
                      <button
                        type="button"
                        title="Edit Job"
                        onClick={() => {
                          console.log(
                            "EDIT JOB:",
                            job?._id
                          );

                          navigate(
                            `/admin/jobs/${job?._id}/edit`
                          );
                        }}
                        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {/* EYE */}
                      <button
                        type="button"
                        title="View Applicants"
                        onClick={() => {
                          console.log(
                            "OPEN APPLICANTS:",
                            job?._id
                          );

                          navigate(
                            `/admin/jobs/${job?._id}/applicants`
                          );
                        }}
                        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                    </div>
                  </TableCell>

                </TableRow>
              );
            })
          )}

        </TableBody>

      </Table>
    </div>
  );
};

export default AdminJobsTable;

