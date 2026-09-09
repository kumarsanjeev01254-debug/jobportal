import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

const Appliedjobs = () => {
  const appliedJobs = [
    {
      date: "27-07-2026",
      title: "Software Engineer",
      company: "Microsoft",
      status: "Selected",
    },
    {
      date: "26-07-2026",
      title: "Frontend Developer",
      company: "Google",
      status: "Pending",
    },
    {
      date: "25-07-2026",
      title: "Backend Developer",
      company: "Amazon",
      status: "Rejected",
    },
    {
      date: "24-07-2026",
      title: "Full Stack Developer",
      company: "Meta",
      status: "Interview",
    },
    {
      date: "23-07-2026",
      title: "React Developer",
      company: "Netflix",
      status: "Selected",
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appliedJobs.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell className="text-right">
                <Badge>{job.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Appliedjobs;