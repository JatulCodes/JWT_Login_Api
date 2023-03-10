const express = require("express");
const router = express.Router();
const users = require("../models/admin");
const jwt = require("jsonwebtoken");

require("dotenv").config();
process.env.ACCESS_TOKEN_SECRET;

//createing post req for registration
router.post("/registerd", async (req, res) => {
	const { email, password, role } = req.body;
	if (!email || !password || !role) {
		return res.status(422).json({ error: "plase fill the form properly" });
	}
	try {
		// checking here if user already exist
		const finduserExist = await users.findOne({ email: email });
		console.log(finduserExist);
		if (finduserExist) {
			return res.status(422).json({ error: "Email allready exist" });
		} else {
			// saveing user in datatbase
			const user = new users({ email, password, role });

			await user.save();
			console.log(`${user} user registerd scuss`);

			res.status(201).json({ message: "successfully saved" });
		}
	} catch (err) {
		console.log(err);
	}
});

router.post("/login", async (req, res) => {
	// Get the email and password from the request body
	const { email, password } = req.body;

	const user = await users.findOne({ email: email });

	// If user not found or password is incorrect, return error response
	if (!user || user.password !== password) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	// Sign a JWT token with the user id and role
	const accessToken = jwt.sign(
		{ id: user.id, role: user.role },
		process.env.ACCESS_TOKEN_SECRET
	);

	// Return the JWT token in the response
	console.log(user);
	res.json({ token: accessToken });
});
module.exports = router;
