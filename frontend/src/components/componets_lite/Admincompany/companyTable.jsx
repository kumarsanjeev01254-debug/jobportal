import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Edit2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";





const CompanyTable = () => {
  const navigate = useNavigate();
  const { company } = useSelector((state) => state.company);
 

  return (
    <div className="w-full">
      <Table>
        <TableCaption>
          Your Recent Registered Companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Company Address</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!company || company.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6"
              >
                No company added
              </TableCell>
            </TableRow>
          ) : (
            company.map((item) => (
              <TableRow key={item._id}>
                {/* Company Logo */}
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={item.logo}
                      alt={item.name || "Company Logo"}
                    />

                    <AvatarFallback>
                      {item.name
                        ?.charAt(0)
                        ?.toUpperCase() || "C"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Company Name */}
                <TableCell className="font-medium">
                  {item.name || "N/A"}
                </TableCell>

                {/* Company Address */}
                <TableCell>
                  {item.location || "India"}
                </TableCell>

                {/* Created Date */}
                <TableCell>
                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                {/* Action */}
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <button
                        type="button"
                        className="cursor-pointer p-1 hover:bg-gray-100 rounded-md"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-40">
  <div
   onClick={() =>
  navigate(`/admin/company/${item._id}`)
}
    className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
  >
    <Edit2 className="w-4 h-4" />
    <span>Edit</span>
  </div>
</PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyTable;