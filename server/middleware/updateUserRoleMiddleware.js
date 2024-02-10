const User = require('../models/User');

// Middleware to update user role based on portfolio existence
const updateUserRoleMiddleware = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Check if the user has a portfolio
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.portfolios && user.portfolios.length > 0) {
      // User has a portfolio, update role to freelancer
      req.user.role = 'freelancer';
    } else {
      // User does not have a portfolio, set role to client
      req.user.role = 'client';
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateUserRoleMiddleware;
