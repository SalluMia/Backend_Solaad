const mongoose = require('mongoose');

const socialMediaLinkSchema = mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    // imagePublicId: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const SocialMediaLink = mongoose.model('SocialMediaLink', socialMediaLinkSchema);

module.exports = SocialMediaLink;
