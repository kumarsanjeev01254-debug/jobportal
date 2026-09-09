import { Company } from "../models/company.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

// ===============================
// REGISTER COMPANY
// ===============================
export const registerCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyDescription,
    } = req.body;

    if (
      !companyName?.trim() ||
      !companyDescription?.trim()
    ) {
      return res.status(400).json({
        message:
          "Company name and description are required",
        success: false,
      });
    }

    const existingCompany =
      await Company.findOne({
        name: companyName.trim(),
      });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    const company = await Company.create({
      name: companyName.trim(),
      description: companyDescription.trim(),
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error(
      "Register Company Error:",
      error
    );

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// ===============================
// GET ALL COMPANIES
// ===============================
export const getAllCompany = async (req, res) => {
  try {
    const userId = req.id;

    const companies = await Company.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(
      "Get All Companies Error:",
      error
    );

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// ===============================
// GET COMPANY BY ID
// ===============================
export const getCompanyById = async (req, res) => {
  try {
    const company =
      await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(
      "Get Company By ID Error:",
      error
    );

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// ===============================
// UPDATE COMPANY
// ===============================
export const updateCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      website,
      location,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        message:
          "Company description is required",
        success: false,
      });
    }

    const updateData = {
      name: name.trim(),
      description: description.trim(),
      website: website?.trim() || "",
      location: location?.trim() || "",
    };

    // Upload logo if provided
    if (req.file) {
      const fileUri = getDataUri(req.file);

      const cloudResponse =
        await cloudinary.uploader.upload(
          fileUri.content
        );

      updateData.logo =
        cloudResponse.secure_url;
    }

    const company =
      await Company.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message:
        "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error(
      "Update Company Error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Internal Server Error",
      success: false,
    });
  }
};