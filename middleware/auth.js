const jwt = require("jsonwebtoken");
require("dotenv").config();
process.env.ACCESS_TOKEN_SECRET;
// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	console.log(token, "+++++++++++++");
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};
module.exports = authenticateToken;
