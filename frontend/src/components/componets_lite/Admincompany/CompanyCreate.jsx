import React, { useState } from "react";
import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

import { COMPANY_API_ENDPOINT } from "@/utilis/data";
import { setSingleCompany } from "@/redux/CompanySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] =
    useState("");

  const [companyDescription, setCompanyDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const registerNewCompany = async (e) => {
    e.preventDefault();

    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    if (!companyDescription.trim()) {
      toast.error(
        "Company description is required"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        {
          companyName: companyName.trim(),
          companyDescription:
            companyDescription.trim(),
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "Create Company Response:",
        response.data
      );

      if (response.data?.success) {
        dispatch(
          setSingleCompany(
            response.data.company
          )
        );

        toast.success(
          response.data.message ||
            "Company created successfully"
        );

        navigate(
          `/admin/company/${response.data.company._id}`
        );
      }
    } catch (error) {
      console.error(
        "Create Company Error:",
        error.response?.data ||
          error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to create company"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 mb-6"
          onClick={() =>
            navigate("/admin/company")
          }
        >
          <ArrowLeft size={18} />
          Back
        </Button>

        <h1 className="text-2xl font-bold">
          Create Company
        </h1>

        <p className="text-gray-500 mt-1 mb-6">
          Enter your company details.
        </p>

        <form
          onSubmit={registerNewCompany}
          className="border rounded-lg p-6 shadow-sm space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Company Name
            </label>

            <input
              type="text"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              placeholder="Enter company name"
              className="w-full border rounded-md p-2.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Company Description
            </label>

            <textarea
              value={companyDescription}
              onChange={(e) =>
                setCompanyDescription(
                  e.target.value
                )
              }
              placeholder="Enter company description"
              rows={5}
              className="w-full border rounded-md p-2.5 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Company"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                navigate("/admin/company")
              }
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCreate;