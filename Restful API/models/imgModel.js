const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type : String,
        required: true
    },
    img: {
      data: Buffer,
      contentType: String
    },
  },
  {
      collection: 'images'
  });

module.exports = mongoose.model('Image', imageSchema);