import React, { useState } from "react";
import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import usegetAllCompany from "@/hooks/usegetAllCompany";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Company() {
  const navigate = useNavigate();
  const { loading, error } = usegetAllCompany();
  const [search, setSearch] = useState("");
  const { company = [] } = useSelector((state) => state.company);

  const filteredCompany = company.filter((item) =>
    item?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company..."
            className="border border-input bg-background rounded-md p-2 w-80 outline-none focus:ring-2 focus:ring-ring"
          />
          <Button onClick={() => navigate("/admin/company/create")}>
            Add Company
          </Button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-foreground">Companies</h2>

        {loading && <div className="text-center py-10 text-muted-foreground">Loading companies...</div>}
        {!loading && error && <div className="text-center py-10 text-destructive">{error}</div>}

        {!loading && !error && filteredCompany.length === 0 && (
          <div className="border rounded-lg p-8 text-center bg-card">
            <p className="text-muted-foreground">
              {search ? "No company found." : "No companies available."}
            </p>
            {!search && (
              <Button className="mt-4" onClick={() => navigate("/admin/company/create")}>
                Create Company
              </Button>
            )}
          </div>
        )}

        {!loading && !error && filteredCompany.length > 0 && (
          <div className="border rounded-lg bg-card overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">Logo</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead className="max-w-md">Description</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompany.map((item) => (
                  <TableRow key={item._id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="w-12 h-12 rounded-md border bg-background flex items-center justify-center overflow-hidden">
                        {item.logo ? (
                          <img src={item.logo} alt={item.name || "Company Logo"} className="w-full h-full object-contain p-1" />
                        ) : (
                          <span className="text-sm font-semibold text-muted-foreground">
                            {item.name?.charAt(0)?.toUpperCase() || "C"}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.name || "N/A"}</TableCell>
                    <TableCell className="text-muted-foreground truncate max-w-[300px]">{item.description || "No description"}</TableCell>
                    <TableCell>{item.location || "India"}</TableCell>
                    <TableCell>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/admin/company/${item._id}`)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Company;
