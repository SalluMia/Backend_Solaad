const mongoose = require('mongoose');

const portfolioProjectSchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    projName: {
      type: String,
      required: true,
    },
    projDescription: {
      type: String,
      required: true,
    },
    projUrl: {
      type: String,
      required: true,
    },
    projImage: {
      type: String,
      required: true,
    },
    projImagePublicId: {
      type: String,
      required: true,
    },
    projClientName: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PortfolioProject = mongoose.model('PortfolioProject', portfolioProjectSchema);

module.exports = PortfolioProject;
