const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.js");
const users = require("../models/users");

router.post("/user", authenticateToken, async (req, res) => {
	// createing user with middleware
	const { email, password, role } = req.body;
	try {
		// checking user Email
		const userExist = await users.findOne({ email: email });
		console.log(userExist);
		// checking if admin or not
		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Forbidden" });
		}
		if (userExist) {
			// checking user if already exist
			return res.status(422).json({ error: "Email allready exist" });
		} else {
			// insert data to user database
			const newUser = users({ email, password, role });
			const result = await users.insertMany(newUser);
			console.log(result);

			res.send(newUser);
		}
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
