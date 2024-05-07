const Task = require("../Model/TaskModel");
const userModel = require("../Model/userModel.js");

// Controller logic for creating an order
const createOrder = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const {  freelancerId } = req.body;
    const clientId = req.userId; // Assuming the freelancer's information is in the request user object
    console.log(clientId);
    console.log(sectionId);

    const task = await Task.findOne({
      "sections._id": sectionId,
      client: clientId,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Find the section in the task
    const section = task.sections.find(
      (sec) => sec._id.toString() === sectionId
    );
    if (!section) {
      return res.status(404).json({ message: "Section not found in the task" });
    }

    // Find the proposal for this section and freelancer
    const proposal = section.proposal.find(
      (prop) => prop.freelancer.toString() === freelancerId
    );
    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found for this freelancer and section",
      });
    }

    // Create the order
    const order = {
      client: task.client, // Use the client from the task object
      freelancerId: proposal.freelancer, // Use the freelancer's ID from the request
      task: task._id, // Use the task's ID from the task object
      sectionPrice: proposal.sectionPrice, // Use the price from the proposal
      status: "pending",
    };

    // Add the order to the section's orders array
    section.order.push(order);

    // Update the section's assignTo and isAssigned fields
    section.assignTo = freelancerId;
    section.isAssigned = true;

    // Save the section
    await task.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const submitRequirements = async (req, res) => {
  try {
    const { taskId, sectionId, orderId } = req.params;
    const { coverLetter, attachments } = req.body;

    // Check if the task exists
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Find the section in the task
    const section = task.sections.find(
      (sec) => sec._id.toString() === sectionId
    );
    if (!section) {
      return res.status(404).json({ message: "Section not found in the task" });
    }

    // Check if the order exists within the section
    const order = section.order.find((o) => o._id.toString() === orderId);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found in the section" });
    }

    // Update the order with the submitted requirements
    order.requirements = {
      coverLetter: coverLetter,
      attachments: attachments || [],
      isSubmitted: true,
    };

    // Start delivery countdown if requirements are submitted
    if (order.requirements.isSubmitted) {
      // Calculate remaining delivery days based on section's durationDays
      const currentDate = new Date();
      const deliveryStartDate = currentDate;
      const deliveryEndDate = new Date(
        currentDate.getTime() + section.durationDays * 24 * 60 * 60 * 1000
      );
      const remainingDeliveryDays =
        Math.round(
          (deliveryEndDate.getTime() - currentDate.getTime()) /
            (24 * 60 * 60 * 1000)
        ) + 1;

      // Update the order with delivery details
      order.deliveryStartDate = deliveryStartDate;
      order.deliveryEndDate = deliveryEndDate;
      order.remainingDeliveryDays = remainingDeliveryDays;
    }

    // Save the task
    await task.save();

    res
      .status(200)
      .json({ message: "Requirements submitted successfully", order });
  } catch (error) {
    console.error("Error submitting requirements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { sectionId, orderId } = req.params;

    // Find the task containing the section
    const task = await Task.findOne({ "sections._id": sectionId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Find the section
    const section = task.sections.find(sec => sec._id.toString() === sectionId);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Find the order by ID within the section
    const order = section.order.id(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  submitRequirements,
  getOrderById,
};
