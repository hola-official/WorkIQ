const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const sectionSchema = new Schema({
  title: String,
  description: String,
  durationDays: {
    type: Number,
    default: 3,
    // required: true
  },
  isPublished: Boolean,
  price: { 
    type: Number,
    default: 5,
   },
  attachments: [
		{
			name: String,
			url: String,
		},
	],
});

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    // required: true
  },
  price: {
    type: Number,
    default: 0,
    // required: true,
  },
  durationDays: {
    type: Number,
    // required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  skills: [{ type: String }],
  sections: [sectionSchema],
  isPublished: {
    type: Boolean,
    default: false,
  },
  client: { type: Schema.Types.ObjectId, ref: "User" },
  // status: {
  //   type: String,
  //   enum: ["pending", "approved", "completed", "rejected"],
  //   default: "pending",
  // },
  // visibleTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
