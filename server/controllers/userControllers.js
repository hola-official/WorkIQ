const bcrypt = require("bcrypt");
const userModel = require('../Model/userModel');
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

// Controller for updating user details
const updateUser = async (req, res) => {
  const userId = req.userId;
  const { name, email, username, password, location, website, skills, category, socialMedia } = req.body;
  let { profilePic, bio } = req.body;
  try {
    let user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (userId.toString() !== req.params.userId)
      return res.status(400).json({ error: "You cannot update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Check if the information being updated is the same as existing information
    if (
      user.name === name &&
      user.email === email &&
      user.username === username &&
      user.bio === bio &&
      user.location === location &&
      user.website === website &&
      user.skills === skills &&
      user.category === category &&
      user.socialMedia.twitter === socialMedia.twitter &&
      user.socialMedia.linkedin === socialMedia.linkedin &&
      user.socialMedia.github === socialMedia.github
    ) {
      return res.status(400).json({ error: "No changes detected" });
    }
    console.log(bio)
    const maxLength = 350;
    if (bio.length > maxLength) {
      return res.status(401).json({ message: `Bio must be less than ${maxLength} characters` });
    }
    // Update avatar

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
      console.log(profilePic);
    }

    // Update other user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.avatar = profilePic || user.avatar;
    user.bio = bio || user.bio;
    user.location = location || user.location;
    user.website = website || user.website;
    user.skills = skills || user.skills;
    user.category = category || user.category;
    user.socialMedia = {
      twitter: socialMedia.twitter || user.socialMedia.twitter,
      linkedin: socialMedia.linkedin || user.socialMedia.linkedin,
      github: socialMedia.github || user.socialMedia.github,
    };

    // Save updated user data
    user = await user.save();
    user.password = null; // Remove password from response
    res.status(200).json(user);
  } catch (err) {
    console.error("Error in Update User: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Controller for deleting a user
const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for fetching user details
const getUserProfile = async (req, res) => {
  // We fetch the user profile either by username or userId
  // The query parameter can be either username or userId

  try {
    let user;
    const query = req.params.query;

    // Check if the query is a valid ObjectId (userId)
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await userModel.findById(query);
    } else {
      // If the query is not a valid ObjectId, assume it's a username
      user = await userModel.findOne({ username: query });
    }

    console.log(user)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getUserProfile,
  updateUser,
  deleteUser,
};