// Import the Task model
const Task = require("../Model/TaskModel");
const userModel = require("../Model/userModel.js");
const { sendMail } = require("../utils/sendMail.js");
const cloudinary = require('cloudinary').v2;

// Controller method to create a new task
const createTask = async (req, res) => {
  try {
    // Extract task details from the request body
    const {
      title,
      description,
      price,
      durationDays,
      category,
      skills,
    } = req.body;
    let { doc } = req.body


    // const img = req.file.path;
    const createdBy = req.userId;
    const creatorDetails = await userModel.findById(createdBy);
    const email = creatorDetails.email;
    console.log(email);

    const userBalance = creatorDetails.balance;
    if (price > userBalance) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    creatorDetails.balance -= price;

    const maxLength = 250;
    if (description.length > maxLength) {
      return res
        .status(400)
        .json({ message: `Text must be less than ${maxLength} characters` });
    }
    if (doc) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      doc = uploadedResponse.secure_url;
    }

    // Create a new task object with the extracted details
    const newTask = new Task({
      title,
      description,
      price,
      durationDays,
      category,
      skills,
      client: createdBy,
    });
    await newTask.save();
    await creatorDetails.save()

    // const existingTask = await Task.findOne({ _id: newTask._id }).populate("client");
    // if (existingTask) {
    //   return res.status(400).json({ error: "Task already been posted" });
    // }
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });

    try {
      await sendMail({
        email: email, // Sending email to the user who created the task
        subject: "New Task Created",
        template: "new-task-create.ejs", // Path to the EJS template file
        data: { user: { name: creatorDetails.name }, task: newTask }, // Pass task data to the template
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  } catch (error) {
    // Handle any errors that occur during task creation
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller method to delete a task by ID
const deleteTask = async (req, res) => {
  try {
    // Extract the task ID from the request parameters
    const taskId = req.params.id;
    // Find the task in the database by its ID
    const task = await Task.findById(taskId);
    // Check if the task exists
    if (!task) {
      // If task not found, return a 404 error
      return res.status(404).json({ error: "Task not found" });
    }

    // Check if the current user is the creator of the task or an admin
    if (
      task.createdBy.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      // If user is not authorized to delete the task, return a 403 error
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Remove visibility of the task to other users
    task.visibleTo = [];
    // Save the updated task to the database
    await task.save();

    // Respond with a success message
    res.json({ message: "Task hidden successfully" });
  } catch (error) {
    // Handle any errors that occur during task deletion
    console.error("Error hiding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller method to get all tasks
const getAllTasks = async (req, res) => {
  // try {
  //   // Fetch all tasks from the database
  //   const tasks = await Task.find();
  //   // Respond with the list of tasks
  //   res.json(tasks);
  // } catch (error) {
  //   // Handle any errors that occur during task retrieval
  //   console.error("Error getting tasks:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }

  try {
    console.log(req.userId)
    const tasks = await Task.find({ client: req.userId });
    console.log(tasks)
    // if (!courses) return res.status(404).json({ msg: "No courses found" });
    res.status(200).json(courses);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Controller method to get a task by ID
const getTask = async (req, res) => {
  try {
    // Extract the task ID from the request parameters
    const taskId = req.params.id;
    // Find the task in the database by its ID
    const task = await Task.findById(taskId);
    // Check if the task exists
    if (!task) {
      // If task not found, return a 404 error
      return res.status(404).json({ error: "Task not found" });
    }

    // Respond with the task
    res.json(task);
  } catch (error) {
    // Handle any errors that occur during task retrieval
    console.error("Error getting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export the controller methods
module.exports = { createTask, deleteTask, getAllTasks, getTask };
