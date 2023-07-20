const PortfolioProject = require("../models/portfolio");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dur0modpu",
  api_key: "618839871375686",
  api_secret: "ItHRC_2_-qKKhQnmpqW0UiyqL7o",
});

// Add a new portfolio project
exports.addPortfolioProject = async (req, res, next) => {
  try {
    const {
      categoryName,
      projName,
      projDescription,
      projUrl,
      projClientName,
      releaseDate,
    } = req.body;

    const { projImage } = req.file;
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    // Create a new portfolio project instance
    const newPortfolioProject = new PortfolioProject({
      categoryName,
      projName,
      projDescription,
      projUrl,
      projImage: uploadedImage.secure_url,
      projImagePublicId: uploadedImage.public_id,
      projClientName,
      releaseDate,
    });

    // Save the portfolio project to the database
    await newPortfolioProject.save();

    // Return the added portfolio project
    return res.status(200).json(newPortfolioProject);
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Update a portfolio project
exports.updatePortfolioProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const {
      categoryName,
      projName,
      projDescription,
      projUrl,
      projClientName,
      releaseDate,
    } = req.body;

    // Find the portfolio project by ID
    const portfolioProject = await PortfolioProject.findByIdAndUpdate(
      projectId
    );

    // Check if the portfolio project exists
    if (!portfolioProject) {
      return res.status(404).json({ message: "Portfolio project not found" });
    }

    // Check if a new image is uploaded
    if (req.file) {
      // Upload new image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      portfolioProject.projImage = uploadedImage.secure_url;
      portfolioProject.projImagePublicId = uploadedImage.public_id;
    }

    // Update the portfolio project details
    if (categoryName) {
      portfolioProject.categoryName = categoryName;
    }
    if (projName) {
      portfolioProject.projName = projName;
    }
    if (projDescription) {
      portfolioProject.projDescription = projDescription;
    }
    if (projUrl) {
      portfolioProject.projUrl = projUrl;
    }
    if (projClientName) {
      portfolioProject.projClientName = projClientName;
    }
    if (releaseDate) {
      portfolioProject.releaseDate = releaseDate;
    }

    // Save the updated portfolio project to the database
    await portfolioProject.save();

    // Return the updated portfolio project
    return res.status(200).json(portfolioProject);
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete a portfolio project
exports.deletePortfolioProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Find the portfolio project by ID
    const portfolioProject = await PortfolioProject.findById(projectId);

    // Check if the portfolio project exists
    if (!portfolioProject) {
      return res.status(404).json({ message: "Portfolio project not found" });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(portfolioProject.projImagePublicId);

    // Delete the portfolio project from the database
    await portfolioProject.deleteOne();

    // Return a success message
    return res
      .status(200)
      .json({ message: "Portfolio project deleted successfully" });
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all portfolio projects
exports.getPortfolioProjects = async (req, res, next) => {
  try {
    // Fetch all portfolio projects from the database
    const portfolioProjects = await PortfolioProject.find().select(
      "categoryName projImage projName projDescription"
    );

    // Return the portfolio projects
    return res.status(200).json(portfolioProjects);
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// getSingle project detail page

exports.getSinglePortfolioProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Find the portfolio project by ID
    const portfolioProject = await PortfolioProject.findById(projectId);

    // Check if the portfolio project exists
    if (!portfolioProject) {
      return res.status(404).json({ message: "Portfolio project not found" });
    }

    // Return the portfolio project details
    return res.status(200).json(portfolioProject);
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getRelatedProjects = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Find the portfolio project by ID
    const portfolioProject = await PortfolioProject.findById(projectId);

    // Check if the portfolio project exists
    if (!portfolioProject) {
      return res.status(404).json({ message: "Portfolio project not found" });
    }

    // Get the category name of the portfolio project
    const categoryName = portfolioProject.categoryName;

    // Find other projects with the same category name (excluding the current project)
    const relatedStrategies = await PortfolioProject.find({
      categoryName,
      _id: { $ne: projectId },
    }).select("projImage projName");

    // Return the related strategies
    return res.status(200).json(relatedStrategies);
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getRelatedProjects = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Find the portfolio project by ID
    const portfolioProject = await PortfolioProject.findById(projectId);

    // Check if the portfolio project exists
    if (!portfolioProject) {
      return res.status(404).json({ message: "Portfolio project not found" });
    }

    // Get the category name of the portfolio project
    const categoryName = portfolioProject.categoryName;

    // Find other projects with the same category name (excluding the current project)
    const relatedStrategies = await PortfolioProject.find({
      categoryName,
      _id: { $ne: projectId },
    }).select("projImage projName");

    // Return the related strategies
    return res.status(200).json(relatedStrategies);
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
