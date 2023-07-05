const mongoose = require('mongoose');

const holidayContentSchema = mongoose.Schema(
  {
    startingDate: {
      type: Date,
      required: true,
    },
    endingDate: {
      type: String,
      required: true,
    },
    event_title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    event_Picture: {
      type: String,
      required: true,
    },
    event_PicturePublicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HolidayContent = mongoose.model('HolidayContent', holidayContentSchema);

module.exports = HolidayContent;
