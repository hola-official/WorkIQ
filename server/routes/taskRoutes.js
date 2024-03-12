const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  getAllClientTasks,
  getTaskById,
  createTitle,
  getCategories,
  updateTaskCategory,
} = require("../controllers/taskController");
const verifyJWT = require("../middleware/verifyJWT");
const { Admin, Client, Freelancer } = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

router.get("/task-categories", verifyJWT, getCategories);

router.post(
  "/create-title",
  verifyJWT,
  verifyRoles(Admin, Client),
  createTitle
);

router.get(
  "/all-tasks",
  verifyJWT,
  verifyRoles(Admin, Client),
  getAllClientTasks
);

router.put(
  "/edit-task/:id",
  verifyJWT,
  verifyRoles(Admin, Client),
  updateTask
);

router.put(
  "/edit-task/:id/category",
  verifyJWT,
  verifyRoles(Admin, Client),
  updateTaskCategory
);
// Route to delete a task by ID
router.delete("/:id", verifyJWT, verifyRoles(Admin), deleteTask);

// Route to get a task by ID
router.get("/:id", verifyJWT, verifyRoles(Admin, Client), getTaskById);

module.exports = router;
