const express = require("express");
const router = express.Router();
const {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
} = require("../controllers/taskController");
const verifyJWT = require("../middleware/verifyJWT");
const { Admin, Client, Freelancer } = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

// Route to create a new task
router.post("/create", verifyJWT, verifyRoles(Admin, Client), createTask);

// Route to delete a task by ID
router.delete("/:id", verifyJWT, verifyRoles(Admin), deleteTask);

// Route to get all tasks
router.get("/", verifyJWT, verifyRoles(Admin, Client), getAllTasks);

// Route to get a task by ID
router.get("/:id", verifyJWT, verifyRoles(Admin, Client), getTask);

module.exports = router;
