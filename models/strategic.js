const mongoose = require('mongoose');

const strategicExecutionSchema = mongoose.Schema(
  {
    
    stratImage: {
      type: String,
      required: true,
    },
    // stratImagePublicId: { // Add new field for storing public_id
    //   type: String,
    //   required: true,
    // },
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
