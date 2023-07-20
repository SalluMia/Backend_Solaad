const Contact = require("../models/contactSchema");

// Add contact details
exports.addContact = async (req, res, next) => {
  try {
    const { address, email, phone } = req.body;

    // Create a new contact instance
    const newContact = new Contact({
      address,
      email,
      phone,
    });

    // Save the contact details to the database
    await newContact.save();

    // Return the added contact details
    return res.status(200).json(newContact);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update contact details
exports.updateContact = async (req, res, next) => {
  try {
    // const { contactId } = req.params;
    const { contactId, address, email, phone } = req.body;

    // Find the contact details by ID
    const contact = await Contact.findByIdAndUpdate(contactId);

    // Check if the contact details exist
    if (!contact) {
      return res.status(404).json({ message: "Contact details not found" });
    }

    // Update the contact details
    if (address) {
      contact.address = address;
    }
    if (email) {
      contact.email = email;
    }
    if (phone) {
      contact.phone = phone;
    }

    // Save the updated contact details to the database
    await contact.save();

    // Return the updated contact details
    return res.status(200).json(contact);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete contact details
exports.deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    // Find the contact details by ID
    const contact = await Contact.findById(contactId);

    // Check if the contact details exist
    if (!contact) {
      return res.status(404).json({ message: "Contact details not found" });
    }

    // Delete the contact details from the database
    await contact.deleteOne();

    // Return a success message
    return res.status(200).json({ message: "Contact details deleted successfully" });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get contact details
exports.getContact = async (req, res, next) => {
  try {
    // Fetch the contact details from the database
    const contact = await Contact.find();

    // Return the contact details
    return res.status(200).json(contact);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
