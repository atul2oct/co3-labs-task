

const express = require('express');
const router = express.Router();

// Import the required controllers functions
const { getUser } = require("../controllers/user");

// Route for fetch user
router.get('/get-user-info',getUser);

// Export the router for use in the main application
module.exports = router;