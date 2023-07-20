const HolidayContent = require("../models/holiday");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dur0modpu",
  api_key: "618839871375686",
  api_secret: "ItHRC_2_-qKKhQnmpqW0UiyqL7o",
});

exports.addHolidayEvent = async (req, res, next) => {
  try {
    const { event_title, description } = req.body;
    const file = req.file;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    // Create a new holiday/event instance
    const newHolidayEvent = new HolidayContent({
      event_title,
      description,
      event_Picture: result.secure_url,
      event_PicturePublicId: result.public_id,
    });

    // Save the holiday/event to the database
    await newHolidayEvent.save();

    // Return the added holiday/event
    return res.status(200).json(newHolidayEvent);
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateHolidayEvent = async (req, res, next) => {
    try {
        // const { holidayEventId } = req.params;
        const {holidayEventId, event_title, description } = req.body;
        const file = req.file;
    
        // Find the holiday/event by ID
        const holidayEvent = await HolidayContent.findByIdAndUpdate(holidayEventId);
    
        // Check if the holiday/event exists
        if (!holidayEvent) {
          return res.status(404).json({ message: "Holiday/Event not found" });
        }
    
        // Update the holiday/event details
      
        holidayEvent.event_title = event_title;
        holidayEvent.description = description;
    
        if (file) {
          // Delete existing image from Cloudinary
          await cloudinary.uploader.destroy(holidayEvent.event_PicturePublicId);
    
          // Upload new image to Cloudinary
          const result = await cloudinary.uploader.upload(file.path);
    
          // Update the event picture URL and public ID
          holidayEvent.event_Picture = result.secure_url;
          holidayEvent.event_PicturePublicId = result.public_id;
        }
    
        // Save the updated holiday/event to the database
        await holidayEvent.save();
    
        // Return the updated holiday/event
        return res.status(200).json(holidayEvent);
      } catch (error) {
        // Handle any errors
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
};

exports.deleteHolidayEvent = async (req, res, next) => {
  try {
    const { holidayEventId } = req.params;

    // Find the holiday/event by ID
    const holidayEvent = await HolidayContent.findById(holidayEventId);

    // Check if the holiday/event exists
    if (!holidayEvent) {
      return res.status(404).json({ message: "Holiday/Event not found" });
    }

    // Delete the event picture from Cloudinary
    await cloudinary.uploader.destroy(holidayEvent.event_PicturePublicId);

    // Delete the holiday/event from the database
    await holidayEvent.deleteOne();

    // Return a success message
    return res
      .status(200)
      .json({ message: "Holiday/Event deleted successfully" });
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getHomePageHeroContent = async (req, res, next) => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Find the relevant holiday or event content based on the current date
    // const content = await HolidayContent.findOne({ startingDate: { $lte: currentDate }, endingDate: { $gte: currentDate } });
    const content = await HolidayContent.find();

    // Check if content exists
    if (!content) {
      return res.status(404).json({ message: "No content found" });
    }

    // Return the content
    return res.status(200).json(content);
  } catch (error) {
    // Handle any errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
