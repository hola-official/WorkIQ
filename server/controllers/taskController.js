const Category = require("../Model/CategoryModel.js");
const Task = require("../Model/TaskModel");
const userModel = require("../Model/userModel.js");
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
    const user = await userModel.findById(userId).select("-password");

    const task = new Task({ title, client: userId });
    user.tasksCreated.push(task._id)
    await user.save()
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

const getAllClientTasks = async (req, res) => {
	try {
		// console.log(req.userId)
		const tasks = await Task.find({ client: req.userId });
		// console.log(courses)
		if (!tasks.length)
			return res.status(404).json({ msg: "No task found" });
		res.status(200).json(task);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const updateTask = async (req, res) => {
	try {
		const userId = req.userId; // Assuming you have user information stored in req.user after authentication

		// Check if userId exists
		if (!userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		// Check if the course exists and the user is the owner
		const taskOwner = await Task.findOne({
			_id: req.params.id,
			client: userId,
		});

		if (!taskOwner) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ msg: "Task not found" });
		}

		// Update the course price if provided in req.body
		if (req.body.price !== undefined) {
			task.price = req.body.price;
		}

		// Check if the task is free
		const isFree =
			task.price === 0 || task.price === null || task.price === "";

		// Update each chapter's isFree property
		if (isFree) {
			task.chapters.forEach((chapter) => {
				chapter.isFree = true;
			});
		}

		// Save additional property from req.body if present
		const propertyName = Object.keys(req.body)[0]; // Get the first (and only) property name
		if (propertyName && propertyName !== "price") {
			task[propertyName] = req.body[propertyName];
		}

		// Save the updated course
		const updatedTask = await task.save();

		res.status(200).json({ task: updatedTask });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateTaskCategory = async (req, res) => {
	const taskId = req.params.id;
	const categoryId = req.body.categoryId;

	try {
		const userId = req.userId; // Assuming you have user information stored in req.user after authentication

		// Check if userId exists
		if (!userId) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		// Check if the task exists and the user is the owner
		const taskOwner = await Task.findOne({
			_id: req.params.id,
			client: userId,
		});
		if (!taskOwner) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		// Find the task and update its category
		const task = await Task.findById(taskId);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		const oldCategoryId = task.categoryId;

		task.categoryId = categoryId;
		await task.save();

		// Update the old category
		if (oldCategoryId) {
			const oldCategory = await Task.findById(oldCategoryId);
			if (oldCategory) {
				oldCategory.tasks = oldCategory.tasks.filter(
					(id) => id.toString() !== taskId
				);
				await oldCategory.save();
			}
		}

		// Update the new category
		if (categoryId) {
			const newCategory = await Category.findById(categoryId);
			if (newCategory) {
				newCategory.tasks.push(taskId);
				await newCategory.save();
			}
		}

		res.status(200).json({ message: "Task category updated successfully" });
	} catch (error) {
		console.log("[UPDATE TASK CATEGORY]", error);
		res.status(500).json({ message: "Internal Server Error" });
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
  updateTask,
  updateTaskCategory,
  getCategories,
  createTitle,
  deleteTask,
  getAllClientTasks,
  getTaskById,
};
