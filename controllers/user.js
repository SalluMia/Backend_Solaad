const admin = require('../models/userSchema');
const { validationResult } = require('express-validator');
const Logo = require('../models/logo');


const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dur0modpu',
  api_key: '618839871375686',
  api_secret: 'ItHRC_2_-qKKhQnmpqW0UiyqL7o',
});


exports.register = async (req, res, next) => {
    const { username, email, password, cpassword } = req.body;
  
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
  
      // Check if passwords match
      if (password !== cpassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      // Create a new user instance
      const newUser = new admin({
        username,
        email,
        password,
        cpassword,
      });
  
      await newUser.save();
      const token = newUser.getSignedToken();
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message  });
    }
  };
  
  
  
  //========================================== Barber's Registration Ending =====================================================
  
  
  //========================================== Barber's Login Start ======================================================
  exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await admin.findOne({ email }).select("+password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const token = user.getSignedToken();
  
      return res.status(200).json({ token, user });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  exports.addLogo = async (req, res, next) => {
    try {
      // Check if any logo already exists
      const existingLogo = await Logo.findOne();
      if (existingLogo) {
        return res.status(400).json({ message: "Logo already uploaded" });
      }
  
      // Upload the logo to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Create a new logo instance
      const newLogo = new Logo({
        logopic: result.secure_url,
      });
  
      // Save the logo to the database
      await newLogo.save();
  
      // Return the added logo
      return res.status(200).json(newLogo);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  
  exports.editLogo = async (req, res, next) => {
    try {
      const { logoId } = req.params;
  
      // Find the logo by ID
      const logo = await Logo.findById(logoId);
  
      // Check if the logo exists
      if (!logo) {
        return res.status(404).json({ message: "Logo not found" });
      }
  
      // Delete the existing logo from cloudinary
      await cloudinary.uploader.destroy(logo.logopic);
  
      // Upload the new logo to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Update the logo's logopic
      logo.logopic = result.secure_url;
  
      // Save the updated logo to the database
      await logo.save();
  
      // Return the updated logo
      return res.status(200).json(logo);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  exports.deleteLogo = async (req, res, next) => {
    try {
      const { logoId } = req.params;
  
      // Find the logo by ID
      const logo = await Logo.findById(logoId);
  
      // Check if the logo exists
      if (!logo) {
        return res.status(404).json({ message: "Logo not found" });
      }
  
      // Delete the logo from the database
      await logo.deleteOne();
  
      // Return a success message
      return res.status(200).json({ message: "Logo deleted successfully" });
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
  exports.getLogo = async (req, res, next) => {
    try {
      // Find the logo
      const logo = await Logo.findOne();
  
      // Check if a logo exists
      if (!logo) {
        return res.status(404).json({ message: "Logo not found" });
      }
  
      // Return the logo details
      return res.status(200).json(logo);
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  

  