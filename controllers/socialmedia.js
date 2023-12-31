const SocialMediaLink = require('../models/social');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dur0modpu',
    api_key: '618839871375686',
    api_secret: 'ItHRC_2_-qKKhQnmpqW0UiyqL7o',
  });

  exports.addSocialMediaLink = async (req, res, next) => {
    try {
      const { platform, url } = req.body;
      const file = req.file;
  
      // If a file was uploaded, Multer will populate req.file
      if (!file) {
        return res.status(400).json({ message: "No image file provided" });
      }
  
      // Create a new social media link instance
      const newSocialMediaLink = new SocialMediaLink({
        platform,
        url,
        image: file.filename, // Assuming you stored the filename in the SocialMediaLink model
      });
  
      // Save the social media link to the database
      await newSocialMediaLink.save();
  
      // Return the added social media link
      return res.status(200).json(newSocialMediaLink);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  exports.updateSocialMediaLink = async (req, res, next) => {
    try {
      const { socialMediaLinkId } = req.params;
      const { platform, url } = req.body;
      const file = req.file;
  
      // Find the social media link by ID
      const socialMediaLink = await SocialMediaLink.findById(socialMediaLinkId);
  
      // Check if the social media link exists
      if (!socialMediaLink) {
        return res.status(404).json({ message: "Social Media Link not found" });
      }
  
      // Update the social media link details
      socialMediaLink.platform = platform;
      socialMediaLink.url = url;
  
      // If a new file was uploaded, update the image filename
      if (file) {
        // Delete existing image from the server (if any)
        // Assuming you stored the image in the 'uploads/' directory
        if (socialMediaLink.file) {
          const fs = require('fs');
          fs.unlinkSync(`uploads/${socialMediaLink.file}`);
        }
  
        // Update the image filename with the new file's filename
        socialMediaLink.image = file.filename;
      }
  
      // Save the updated social media link to the database
      await socialMediaLink.save();
  
      // Return the updated social media link
      return res.status(200).json(socialMediaLink);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  exports.deleteSocialMediaLink = async (req, res, next) => {
    try {
      const { socialMediaLinkId } = req.params;
  
      // Find the social media link by ID
      const socialMediaLink = await SocialMediaLink.findById(socialMediaLinkId);
  
      // Check if the social media link exists
      if (!socialMediaLink) {
        return res.status(404).json({ message: "Social Media Link not found" });
      }
  
      // If the social media link has a file, delete it from the server (if any)
      // Assuming you stored the image in the 'uploads/' directory
      if (socialMediaLink.image) {
        const fs = require('fs');
        fs.unlinkSync(`uploads/${socialMediaLink.image}`);
      }
  
      // Delete the social media link from the database
      await socialMediaLink.deleteOne();
  
      // Return a success message
      return res.status(200).json({ message: "Social Media Link deleted successfully" });
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };  

// exports.addSocialMediaLink = async (req, res, next) => {
//   try {
//     const { platform, url } = req.body;
//     const file = req.file;

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(file.path);

//     // Create a new social media link instance
//     const newSocialMediaLink = new SocialMediaLink({
//       platform,
//       url,
//       image: result.secure_url,
//       imagePublicId: result.public_id,
//     });

//     // Save the social media link to the database
//     await newSocialMediaLink.save();

//     // Return the added social media link
//     return res.status(200).json(newSocialMediaLink);
//   } catch (error) {
//     // Handle any errors
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// exports.updateSocialMediaLink = async (req, res, next) => {
//   try {
//     const { socialMediaLinkId } = req.params;
//     const { platform, url } = req.body;
//     const file = req.file;

//     // Find the social media link by ID
//     const socialMediaLink = await SocialMediaLink.findByIdAndUpdate(socialMediaLinkId);

//     // Check if the social media link exists
//     if (!socialMediaLink) {
//       return res.status(404).json({ message: "Social Media Link not found" });
//     }

//     // Update the social media link details
//     socialMediaLink.platform = platform;
//     socialMediaLink.url = url;

//     if (file) {
//       // Delete existing image from Cloudinary
//       await cloudinary.uploader.destroy(socialMediaLink.imagePublicId);

//       // Upload new image to Cloudinary
//       const result = await cloudinary.uploader.upload(file.path);

//       // Update the image URL and public ID
//       socialMediaLink.image = result.secure_url;
//       socialMediaLink.imagePublicId = result.public_id;
//     }

//     // Save the updated social media link to the database
//     await socialMediaLink.save();

//     // Return the updated social media link
//     return res.status(200).json(socialMediaLink);
//   } catch (error) {
//     // Handle any errors
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// exports.deleteSocialMediaLink = async (req, res, next) => {
//   try {
//     const { socialMediaLinkId } = req.params;

//     // Find the social media link by ID
//     const socialMediaLink = await SocialMediaLink.findById(socialMediaLinkId);

//     // Check if the social media link exists
//     if (!socialMediaLink) {
//       return res.status(404).json({ message: "Social Media Link not found" });
//     }

//     // Delete the image from Cloudinary
//     await cloudinary.uploader.destroy(socialMediaLink.imagePublicId);

//     // Delete the social media link from the database
//     await socialMediaLink.deleteOne();

//     // Return a success message
//     return res.status(200).json({ message: "Social Media Link deleted successfully" });
//   } catch (error) {
//     // Handle any errors
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

exports.getSocialMediaLinks = async (req, res, next) => {
  try {
    // Fetch all social media links from the database
    const socialMediaLinks = await SocialMediaLink.find();

    // Return the social media links
    return res.status(200).json(socialMediaLinks);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
