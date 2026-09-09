
import mongoose from "mongoose";
import Application from "../models/application.js";
import Job from "../models/jobmodel.js";

// ======================================================
// Apply Job
// ======================================================
export const applyjobs = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    // Check authentication
    if (!userId) {
      return res.status(401).json({
        message: "User is not authenticated.",
        success: false,
      });
    }

    // Check Job ID
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }
    

    // Find Job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    // Create Application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Add application ID to Job
    job.application.push(application._id);

    // IMPORTANT: Save the Job
    await job.save();

    return res.status(201).json({
      message: "Application submitted successfully.",
      success: true,
      application,
    });

  } catch (error) {
    console.error("Apply Job Error:", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


// ======================================================
// Get Applied Jobs
// ======================================================
export const getAppliedjobs = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        message: "User is not authenticated.",
        success: false,
      });
    }

    const applications = await Application.find({
      applicant: userId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "companyId",
        },
      });

    return res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {
    console.error("Get Applied Jobs Error:", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


// ======================================================
// Get Applicants of a Job
// ======================================================
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        message: "Invalid Job ID.",
        success: false,
      });
    }

    const job = await Job.findById(jobId).populate({
      path: "application",
      options: {
        sort: {
          createdAt: -1,
        },
      },
      populate: {
        path: "applicant",
        select: "-password",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {
    console.error("Get Applicants Error:", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


// ======================================================
// Update Application Status
// ======================================================
export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!applicationId) {
      return res.status(400).json({
        message: "Application ID is required.",
        success: false,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        message: "Invalid Application ID.",
        success: false,
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    const application = await Application.findById(
      applicationId
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status.toLowerCase();

    await application.save();

    return res.status(200).json({
      message: "Application status updated successfully.",
      success: true,
      application,
    });

  } catch (error) {
    console.error("Update Status Error:", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

