const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerDesignation: {
      type: String,
      required: true,
    },
    customerFeedback: {
      type: String,
      required: true,
    },
    customerImage: {
      type: String,
      required: true,
    },
    customerImagePublicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
