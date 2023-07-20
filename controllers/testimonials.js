const Testimonials = require("../models/testi");

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dur0modpu',
  api_key: '618839871375686',
  api_secret: 'ItHRC_2_-qKKhQnmpqW0UiyqL7o',
});

// Add a new testimonial
exports.addTestimonial = async (req, res, next) => {
  try {
    const { customerName, customerDesignation, customerFeedback } = req.body;

    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    // Create a new testimonial instance
    const newTestimonial = new Testimonials({
      customerName,
      customerDesignation,
      customerFeedback,
      customerImage: uploadedImage.secure_url,
      customerImagePublicId: uploadedImage.public_id,
    });

    // Save the testimonial to the database
    await newTestimonial.save();

    // Return the added testimonial
    return res.status(200).json(newTestimonial);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update a testimonial
// exports.updateTestimonialByid = async (req, res, next) => {
//     try {
//       const { testimonialId } = req.params;
//       const { customerName, customerDesignation, customerFeedback } = req.body;
  
//       // Find the testimonial by ID
//       const testimonial = await Testimonials.findById(testimonialId);
  
//       // // Check if the testimonial exists
//       if (!testimonial) {
//         return res.status(404).json({ message: "Testimonial not found" });
//       }
  
//       // Check if a new image is uploaded
//       if (req.file) {
//         // Upload new image to Cloudinary
//         const uploadedImage = await cloudinary.uploader.upload(req.file.path);
//         testimonial.customerImage = uploadedImage.secure_url;
//         testimonial.customerImagePublicId = uploadedImage.public_id;
//       }
  
//       // Update the testimonial details
//       if (customerName) {
//         testimonial.customerName = customerName;
//       }
//       if (customerDesignation) {
//         testimonial.customerDesignation = customerDesignation;
//       }
//       if (customerFeedback) {
//         testimonial.customerFeedback = customerFeedback;
//       }
  
//       // Save the updated testimonial to the database
//       await testimonial.save();
  
//       // Return the updated testimonial
//       return res.status(200).json(testimonial);
//     } catch (error) {
//       // Handle any errors
//       return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
//   };
  


exports.updateTestimonialByid = async (req, res, next) => {
  try {
    const { testimonialId } = req.params;
    const testimonial = await Testimonials.findById(testimonialId);
    return res.status(200).json(testimonial);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


  exports.updateTestimonial = async (req, res, next) => {
    try {

      const{testimonialId}=req.params;
      const {customerName, customerDesignation, customerFeedback } = req.body;
  
      // Find the testimonial by ID
      const testimonial = await Testimonials.findByIdAndUpdate(testimonialId);
  
      // Check if the testimonial exists
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
  
      // Check if a new image is uploaded
      if (req.file) {
        // Upload new image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(req.file.path);
        testimonial.customerImage = uploadedImage.secure_url;
        testimonial.customerImagePublicId = uploadedImage.public_id;
      }
  
      // Update the testimonial details
      if (customerName) {
        testimonial.customerName = customerName;
      }
      if (customerDesignation) {
        testimonial.customerDesignation = customerDesignation;
      }
      if (customerFeedback) {
        testimonial.customerFeedback = customerFeedback;
      }
  
      // Save the updated testimonial to the database
      await testimonial.save();
  
      // Return the updated testimonial
      return res.status(200).json(testimonial);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
 


// Delete a testimonial
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const { testimonialId } = req.params;

    // Find the testimonial by ID
    const testimonial = await Testimonials.findById(testimonialId);

    // Check if the testimonial exists
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(testimonial.customerImagePublicId);

    // Delete the testimonial from the database
    await testimonial.deleteOne();

    // Return a success message
    return res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all testimonials
exports.getTestimonials = async (req, res, next) => {
  try {
    // Fetch all testimonials from the database
    const testimonials = await Testimonials.find();

    // Return the testimonials
    return res.status(200).json(testimonials);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
