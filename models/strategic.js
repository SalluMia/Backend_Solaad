const mongoose = require('mongoose');

const strategicExecutionSchema = mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Services',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    strategic_title: {
      type: String,
      required: true,
    },
    strategic_description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StrategicExecution = mongoose.model('StrategicExecution', strategicExecutionSchema);

module.exports = StrategicExecution;
