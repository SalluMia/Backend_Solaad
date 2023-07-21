const Service = require('../models/services');
const StrategicExecution = require('../models/strategic');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dur0modpu',
    api_key: '618839871375686',
    api_secret: 'ItHRC_2_-qKKhQnmpqW0UiyqL7o',
  });



  exports.addService = async (req, res, next) => {
    try {
      const { strategy_id, title, description } = req.body;
      const image = req.file;
  
      // If a file was uploaded, Multer will populate req.file
      if (!image) {
        return res.status(400).json({ message: "No image file provided" });
      }
  
      // Create a new service instance
      const newService = new Service({
        title,
        description,
        strategy_id,
        image: image.filename, // Assuming you stored the filename in the Service model
      });
  
      // Save the service to the database
      await newService.save();
  
      // Return the added service
      return res.status(200).json(newService);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  exports.updateService = async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      const { title, description } = req.body;
      const image = req.file;
  
      // Find the service by ID
      const service = await Service.findById(serviceId);
  
      // Check if the service exists
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
  
      // Update the service details
      if (image) {
        // Delete existing image from the server (if any)
        // Assuming you stored the image in the 'uploads/' directory
        if (service.image) {
          const fs = require('fs');
          fs.unlinkSync(`uploads/${service.image}`);
        }
  
        // Update the image filename with the new file's filename
        service.image = image.filename;
      }
  
      if (title) {
        service.title = title;
      }
  
      if (description) {
        service.description = description;
      }
  
      // Save the updated service to the database
      await service.save();
  
      // Return the updated service
      return res.status(200).json(service);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };


  exports.deleteService = async (req, res, next) => {
    try {
      const { serviceId } = req.params;
  
      // Find the service by ID
      const service = await Service.findById(serviceId);
  
      // Check if the service exists
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
  
      // If the service has a file, delete it from the server (if any)
      // Assuming you stored the image in the 'uploads/' directory
      if (service.image) {
        const fs = require('fs');
        fs.unlinkSync(`uploads/${service.image}`);
      }
  
      // Delete the service from the database
      await service.deleteOne();
  
      // Return a success message
      return res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };





// exports.addService = async (req, res, next) => {
//   try {
//     const { strategy_id, title, description } = req.body;
//     const image = req.file;

//     // Upload the image to Cloudinary
//     const result = await cloudinary.uploader.upload(image.path);

//     // Create a new service instance
//     const newService = new Service({
//       title,
//       description,
//       strategy_id,
//       image: {
//         url: result.secure_url,
//         public_id: result.public_id,
//       },
//     });

//     // Save the service to the database
//     await newService.save();

//     // Return the added service
//     return res.status(200).json(newService);
//   } catch (error) {
//     // Handle any errors
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// exports.updateService = async (req, res, next) => {
//   try {
//     const { serviceId } = req.params;
//     const { title, description } = req.body;
//     const image = req.file;

//     // Find the service by ID
//     const service = await Service.findByIdAndUpdate(serviceId);

//     // Check if the service exists
//     if (!service) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     // Delete the previous image from Cloudinary if a new image is uploaded
//     if (image) {
//       await cloudinary.uploader.destroy(service.image.public_id);
//       const result = await cloudinary.uploader.upload(image.path);
//       service.image.url = result.secure_url;
//       service.image.public_id = result.public_id;
//     }
    
//     if(title){
//       service.title = title;
//     }
//     // Update the service details

//     if(description){
//       service.description = description;
//     }

//     // Save the updated service to the database
//     await service.save();

//     // Return the updated service
//     return res.status(200).json(service);
//   } catch (error) {
//     // Handle any errors
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// exports.deleteService = async (req, res, next) => {
//   try {
//     const { serviceId } = req.params;

//     // Find the service by ID
//     const service = await Service.findById(serviceId);

//     // Check if the service exists
//     if (!service) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     // Delete the image from Cloudinary
//     await cloudinary.uploader.destroy(service.image.public_id);

//     // Delete the service from the database
//     await service.deleteOne();

//     // Return a success message
//     return res.status(200).json({ message: "Service deleted successfully" });
//   } catch (error) {
//     // Handle any errors
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

exports.getServices = async (req, res, next) => {
  try {
    // Fetch all services from the database
    const services = await Service.find();

    // Return the services
    return res.status(200).json(services);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// exports.getServiceWithStrategicExecutions = async (req, res, next) => {
//     try {
//       const { serviceId } = req.params;
//       const service = await StrategicExecution.find({service:serviceId}).populate('service');
  
//       // Check if the service exists
//       if (!service) {
//         return res.status(404).json({ message: "Service not found" });
//       }
//       return res.status(200).json(service);
//     } catch (error) {
//       return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
//   };
  
  exports.getServiceWithStrategicExecutions = async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      const service = await Service.findById(serviceId).populate('strategy_id');
  
      // Check if the service exists
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  