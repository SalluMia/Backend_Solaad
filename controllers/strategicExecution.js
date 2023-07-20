const StrategicExecution = require('../models/strategic');

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dur0modpu',
    api_key: '618839871375686',
    api_secret: 'ItHRC_2_-qKKhQnmpqW0UiyqL7o',
  });
  exports.addStrategicExecution = async (req, res, next) => {
    try {
      const { serviceId, strategic_title, strategic_description } = req.body;
  
      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      // Upload image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
  
      // Create a new strategic execution instance
      const newStrategicExecution = new StrategicExecution({
        service: serviceId,
        stratImage: uploadedImage.secure_url,
        stratImagePublicId: uploadedImage.public_id,
        strategic_title,
        strategic_description,
      });
  
      // Save the strategic execution to the database
      await newStrategicExecution.save();
  
      // Return the added strategic execution
      return res.status(200).json(newStrategicExecution);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  exports.updateStrategicExecution = async (req, res, next) => {
    try {
      // const { strategicExecutionId } = req.params;
      const { strategicExecutionId, strategic_title, strategic_description } = req.body;
  
      // Find the strategic execution by ID
      const strategicExecution = await StrategicExecution.findByIdAndUpdate(strategicExecutionId);
  
      // Check if the strategic execution exists
      if (!strategicExecution) {
        return res.status(404).json({ message: "Strategic Execution not found" });
      }
  
      // Check if a new image is uploaded
      if (req.file) {
        // Upload new image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(req.file.path);
        strategicExecution.stratImage = uploadedImage.secure_url;
        strategicExecution.stratImagePublicId = uploadedImage.public_id;
      }
     
      if(strategic_title){
        strategicExecution.strategic_title = strategic_title;
      }

      if(strategic_description){
        strategicExecution.strategic_description = strategic_description;
      }
     
      await strategicExecution.save();
  
      return res.status(200).json(strategicExecution);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  exports.deleteStrategicExecution = async (req, res, next) => {
    try {
      const { strategicExecutionId } = req.params;
  
      // Find the strategic execution by ID
      const strategicExecution = await StrategicExecution.findById(strategicExecutionId);
  
      // Check if the strategic execution exists
      if (!strategicExecution) {
        return res.status(404).json({ message: "Strategic Execution not found" });
      }
  
      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(strategicExecution.stratImagePublicId);
  
      // Delete the strategic execution from the database
      await strategicExecution.deleteOne();
  
      // Return a success message
      return res.status(200).json({ message: "Strategic Execution deleted successfully" });
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  


// const a= await StrategicExecution.find({service:serviceID}).populate("service")

exports.getStrategicExecution = async (req, res, next) => {
  try {

    // Find the strategic execution by ID
    const strategicExecution = await StrategicExecution.find();

    // Check if the strategic execution exists
    if (!strategicExecution) {
      return res.status(404).json({ message: "Strategic Execution not found" });
    }

    // Return the strategic execution
    return res.status(200).json(strategicExecution);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
