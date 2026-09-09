import Job from "../models/jobmodel.js";

// =================== Create Job ===================
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      jobType,
      position,
      companyId,
      experience,
      requirement,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !jobType ||
      !position ||
      !companyId ||
      !experience ||
      !requirement
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      location,
      salary,
      jobType,
      position,
      companyId,
      experience,
      requirement,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// =================== Get All Jobs ===================
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { requirement: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { position: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate({ path: "companyId" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// =================== Get Job By Id ===================
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate("companyId")
      .populate({
        path: "application",
        populate: {
          path: "applicant",
          select: "fullname email profile",
        },
      });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// =================== Get Admin Jobs ===================
export const getAdminJobs = async (req, res) => {
  try {
    console.log("========== GET ADMIN JOBS ==========");
    console.log("Admin ID:", req.id);

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const jobs = await Job.find({
      created_by: req.id,
    })
      .populate("companyId")
      .populate({
        path: "application",
        populate: {
          path: "applicant",
          select: "fullname email profile",
        },
      })
      .sort({ createdAt: -1 });

    console.log("Admin Jobs:", jobs);

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("GET ADMIN JOBS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =================== Update Job ===================
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    console.log("========== UPDATE JOB ==========");
    console.log("Job ID:", jobId);
    console.log("User ID:", userId);
    console.log("Updated Data:", req.body);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Find job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Only the recruiter who created the job can update it
    if (job.created_by.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job",
      });
    }

    const {
      title,
      description,
      location,
      salary,
      jobType,
      position,
      experience,
      requirement,
    } = req.body;

    // Update fields
    job.title = title;
    job.description = description;
    job.location = location;
    job.salary = salary;
    job.jobType = jobType;
    job.position = position;
    job.experience = experience;
    job.requirement = requirement;

    const updatedJob = await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




