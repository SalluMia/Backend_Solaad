const Technology = require("../models/tech");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dur0modpu',
  api_key: '618839871375686',
  api_secret: 'ItHRC_2_-qKKhQnmpqW0UiyqL7o',
});


exports.addTechnology = async (req, res, next) => {
  try {
    const { techName } = req.body;
    const file = req.file;

    // If no file is uploaded, return an error
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Create a new technology instance
    const newTechnology = new Technology({
      techName,
      image: file.filename, // Assuming you stored the filename in the Technology model
    });

    // Save the technology to the database
    await newTechnology.save();

    // Return the added technology
    return res.status(200).json(newTechnology);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateTechnology = async (req, res, next) => {
  try {
    const { technologyId } = req.params;
    const { techName } = req.body;
    const file = req.file;

    // Find the technology by ID
    const technology = await Technology.findById(technologyId);

    // Check if the technology exists
    if (!technology) {
      return res.status(404).json({ message: "Technology not found" });
    }

    // If a new file was uploaded, update the image filename
    if (file) {
      // Delete existing image from the server (if any)
      // Assuming you stored the image in the 'uploads/' directory
      if (technology.image) {
        const fs = require('fs');
        fs.unlinkSync(`uploads/${technology.image}`);
      }

      // Update the image filename with the new file's filename
      technology.image = file.filename;
    }

    // Update the technology details if provided
    if (techName) {
      technology.techName = techName;
    }

    // Save the updated technology to the database
    await technology.save();

    // Return the updated technology
    return res.status(200).json(technology);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteTechnology = async (req, res, next) => {
  try {
    const { technologyId } = req.params;

    // Find the technology by ID
    const technology = await Technology.findById(technologyId);

    // Check if the technology exists
    if (!technology) {
      return res.status(404).json({ message: "Technology not found" });
    }

    // If the technology has an image, delete it from the server (if any)
    // Assuming you stored the image in the 'uploads/' directory
    if (technology.image) {
      const fs = require('fs');
      fs.unlinkSync(`uploads/${technology.image}`);
    }

    // Delete the technology from the database
    await technology.deleteOne();

    // Return a success message
    return res.status(200).json({ message: "Technology deleted successfully" });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};





// Add a new technology
// exports.addTechnology = async (req, res, next) => {
//   try {
//     const { techName } = req.body;

//     // Check if a file is uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Upload image to Cloudinary
//     const uploadedImage = await cloudinary.uploader.upload(req.file.path);

//     // Create a new technology instance
//     const newTechnology = new Technology({
//       techName,
//       image: uploadedImage.secure_url,
//       imagePublicId: uploadedImage.public_id,
//     });

//     // Save the technology to the database
//     await newTechnology.save();

//     // Return the added technology
//     return res.status(200).json(newTechnology);
//   } catch (error) {
//     // Handle any errors
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // Update a technology
// exports.updateTechnology = async (req, res, next) => {
//     try {
//       const { technologyId } = req.params;
//       const { techName } = req.body;
  
//       // Find the technology by ID
//       const technology = await Technology.findByIdAndUpdate(technologyId);
  
//       // Check if the technology exists
//       if (!technology) {
//         return res.status(404).json({ message: "Technology not found" });
//       }
  
//       // Check if a new image is uploaded
//       if (req.file) {
//         // Upload new image to Cloudinary
//         const uploadedImage = await cloudinary.uploader.upload(req.file.path);
//         technology.image = uploadedImage.secure_url;
//         technology.imagePublicId = uploadedImage.public_id;
//       }
  
//       // Update the technology details if techName is provided
//       if (techName) {
//         technology.techName = techName;
//       }
  
//       // Save the updated technology to the database
//       await technology.save();
  
//       // Return the updated technology
//       return res.status(200).json(technology);
//     } catch (error) {
//       // Handle any errors
//       return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
//   };
  
  

// // Delete a technology
// exports.deleteTechnology = async (req, res, next) => {
//   try {
//     const { technologyId } = req.params;

//     // Find the technology by ID
//     const technology = await Technology.findById(technologyId);

//     // Check if the technology exists
//     if (!technology) {
//       return res.status(404).json({ message: "Technology not found" });
//     }

//     // Delete the image from Cloudinary
//     await cloudinary.uploader.destroy(technology.imagePublicId);

//     // Delete the technology from the database
//     await technology.deleteOne();

//     // Return a success message
//     return res.status(200).json({ message: "Technology deleted successfully" });
//   } catch (error) {
//     // Handle any errors
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// Get all technologies
exports.getTechnologies = async (req, res, next) => {
  try {
    // Fetch all technologies from the database
    const technologies = await Technology.find();

    // Return the technologies
    return res.status(200).json(technologies);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
