const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.js");
const users = require("../models/admin");

router.get("/protect", authenticateToken, (req, res) => {
	// Check if the user has the admin role
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Forbidden You are not an admin" });
	}

	// Return a success message in the response
	res.json({
		message: "You have successfully accessed the protected route.",
	});
	console.log(users);
});
module.exports = router;
