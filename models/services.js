const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    strategy_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StrategicExecution',
        required: true,
      }
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
        type: String,
        required: true,
      // public_id: {
      //   type: String,
      //   required: true,
      // },
    },
    
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Services', serviceSchema);

module.exports = Service;
