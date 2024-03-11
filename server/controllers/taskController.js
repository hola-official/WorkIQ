const Task = require("../Model/TaskModel");
const { sendMail } = require("../utils/sendMail.js");
const cloudinary = require("cloudinary").v2;

//Get all courses categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create task title
const createTitle = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ msg: "Please enter title" });
    const maxLength = 70;
    if (title.length > maxLength) {
      return res.status(401).json({ error: `Title must be less than ${maxLength} characters` });
    }
    const userId = req.userId;
    const task = new Task({ title, client: userId });
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

// // Controller method to create a new task
// const createTask = async (req, res) => {
//   try {
//     const { title, description, price, durationDays, category, skills } = req.body;
//     const { doc } = req.body;
//     const createdBy = req.userId;

//     const creatorDetails = await userModel.findById(createdBy);
//     const email = creatorDetails.email;

//     if (price > creatorDetails.balance) {
//       return res.status(400).json({ error: "Insufficient balance" });
//     }

//     creatorDetails.balance -= price;
//     await creatorDetails.save();

//     const maxTitleLength = 50;
//     if (title.length > maxTitleLength) {
//       return res.status(400).json({ message: `Text must be less than ${maxTitleLength} characters` });
//     }

//     const maxLength = 250;
//     if (description.length > maxLength) {
//       return res.status(400).json({ message: `Title must be less than ${maxLength} characters` });
//     }

//     if (doc) {
//       const uploadedResponse = await cloudinary.uploader.upload(doc);
//       doc = uploadedResponse.secure_url;
//     }

//     const newTask = await Task.create({
//       title,
//       description,
//       price,
//       durationDays,
//       category,
//       skills,
//       client: createdBy,
//     });

//     res.status(201).json({ message: "Task created successfully", task: newTask });

//     try {
//       await sendMail({
//         email,
//         subject: "New Task Created",
//         template: "new-task-create.ejs",
//         data: { user: { name: creatorDetails.username }, task: newTask },
//       });
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   } catch (error) {
//     console.error("Error creating task:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Controller method to delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (
      task.createdBy.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    task.visibleTo = [];
    await task.save();

    res.json({ message: "Task hidden successfully" });
  } catch (error) {
    console.error("Error hiding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller method to get all tasks
const getAllClientTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ client: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Controller method to get a task by ID
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error getting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export the controller methods
module.exports = {
  // createTask,
  getCategories,
  createTitle,
  deleteTask,
  getAllClientTasks,
  getTaskById,
};
