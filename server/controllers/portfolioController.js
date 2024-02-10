const Portfolio = require('../Model/portfolioModel');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Controller for creating a new portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
      folder: 'portfolios'
    });

    const newPortfolio = await Portfolio.create({
      user: req.user._id,
      title,
      description,
      imageUrl: uploadedImage.secure_url
    });

    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for updating a portfolio
exports.updatePortfolio = async (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;
    const { title, description, imageUrl } = req.body;

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
      folder: 'portfolios'
    });

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(portfolioId, {
      title,
      description,
      imageUrl: uploadedImage.secure_url
    }, { new: true });

    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a portfolio
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;

    const deletedPortfolio = await Portfolio.findByIdAndDelete(portfolioId);

    if (!deletedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting all portfolios
exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
