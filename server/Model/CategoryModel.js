const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    description: String,
    Tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Reference to Tasks collection

  });
  
module.exports = mongoose.model('Category', categorySchema);
