const express = require('express')
const router = express.Router()

// Import the required controllers functions
const { updateCoin } = require("../controllers/updateCoin");

// Route for updating coins
router.put('/update-coins', updateCoin);

// Export the router for use in the main application
module.exports = router