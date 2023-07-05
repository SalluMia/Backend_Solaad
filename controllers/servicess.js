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
    const { title, description } = req.body;
    const image = req.file;

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path);

    // Create a new service instance
    const newService = new Service({
      title,
      description,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
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

    // Delete the previous image from Cloudinary if a new image is uploaded
    if (image) {
      await cloudinary.uploader.destroy(service.image.public_id);
      const result = await cloudinary.uploader.upload(image.path);
      service.image.url = result.secure_url;
      service.image.public_id = result.public_id;
    }

    // Update the service details
    service.title = title;
    service.description = description;

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

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(service.image.public_id);

    // Delete the service from the database
    await service.deleteOne();

    // Return a success message
    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

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

exports.getServiceWithStrategicExecutions = async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      console.log(serviceId)
      // Find the service by ID and populate its strategic executions
    //   const service = await Service.findById(serviceId).populate('service');
      const service = await StrategicExecution.find({service:serviceId}).populate('service');
  
      // Check if the service exists
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
  
      // Return the service with its strategic executions
      return res.status(200).json(service);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  