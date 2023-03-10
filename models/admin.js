const mongoose = require("mongoose");

const admin = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
});
const usersdata = mongoose.model("admin", admin);
module.exports = usersdata;
