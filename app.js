const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
require("dotenv").config();
process.env.ACCESS_TOKEN_SECRET;
require("./config/db.js");

app.use(express.json({ extended: false }));

// health check
app.get("/", (req, res) =>
	res.json({ msg: "Welcome to the Contact keeper API..." })
);
// routes for the server
app.use("/api/users", require("./Routes/users"));
app.use("/api/auth", require("./Routes/admin"));
app.use("/api/protected", require("./Routes/protected"));

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
