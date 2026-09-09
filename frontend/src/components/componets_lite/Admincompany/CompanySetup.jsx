import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import { COMPANY_API_ENDPOINT } from "@/utilis/data";

const CompanySetup = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState("");

  // =========================
  // GET COMPANY BY ID
  // =========================
  useEffect(() => {
    const getCompanyById = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log(
          "Company By ID:",
          response.data
        );

        if (response.data?.success) {
          const companyData = response.data.company;

          setCompany(companyData);

          // IMPORTANT:
          // Backend uses name and description
          setFormData({
            name: companyData.name || "",
            description: companyData.description || "",
            website: companyData.website || "",
            location: companyData.location || "",
            logo: null,
          });

          if (companyData.logo) {
            setLogoPreview(companyData.logo);
          }
        } else {
          toast.error(
            response.data?.message ||
              "Company not found"
          );
        }
      } catch (error) {
        console.error(
          "Get Company Error:",
          error.response?.data ||
            error.message
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to fetch company"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getCompanyById();
    }
  }, [id]);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // LOGO CHANGE
  // =========================
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select an image file"
      );
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error(
        "Logo must be less than 2MB"
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setLogoPreview(
      URL.createObjectURL(file)
    );
  };

  // =========================
  // UPDATE COMPANY
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error(
        "Company name is required"
      );
      return;
    }

    if (!formData.description.trim()) {
      toast.error(
        "Company description is required"
      );
      return;
    }

    if (!formData.location.trim()) {
      toast.error(
        "Company location is required"
      );
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();

      // IMPORTANT:
      // Backend updateCompany expects:
      // name, description, website, location

      data.append(
        "name",
        formData.name
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "website",
        formData.website
      );

      data.append(
        "location",
        formData.location
      );

      if (formData.logo instanceof File) {
        data.append(
          "file",
          formData.logo
        );
      }

      const response = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${id}`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log(
        "Update Company:",
        response.data
      );

      if (response.data?.success) {
        toast.success(
          response.data.message ||
            "Company updated successfully"
        );

        navigate("/admin/company");
      } else {
        toast.error(
          response.data?.message ||
            "Update failed"
        );
      }
    } catch (error) {
      console.error(
        "Update Company Error:",
        error.response?.data ||
          error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update company"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Back Button */}
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

        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            Loading company...
          </div>
        )}

        {/* Company Not Found */}
        {!loading && !company && (
          <div className="bg-white border rounded-lg p-8 text-center">

            <h2 className="text-xl font-semibold">
              Company not found
            </h2>

            <Button
              className="mt-4"
              onClick={() =>
                navigate("/admin/company")
              }
            >
              Go Back
            </Button>

          </div>
        )}

        {/* Company Form */}
        {!loading && company && (
          <div className="bg-white border rounded-lg shadow-sm p-6">

            <h1 className="text-2xl font-bold">
              Company Setup
            </h1>

            <p className="text-gray-500 mt-1 mb-6">
              Update your company information
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Logo */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Logo
                </label>

                <div className="flex items-center gap-6">

                  <div className="w-28 h-28 border rounded-lg flex items-center justify-center overflow-hidden bg-white">

                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Company Logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">
                        No Logo
                      </span>
                    )}

                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="border p-3 rounded-md"
                  />

                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full border rounded-md p-3"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter company description"
                  rows={5}
                  className="w-full border rounded-md p-3 resize-none"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full border rounded-md p-3"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Chandigarh, India"
                  className="w-full border rounded-md p-3"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    navigate("/admin/company")
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting
                    ? "Saving..."
                    : "Save Company"}
                </Button>

              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};

export default CompanySetup;