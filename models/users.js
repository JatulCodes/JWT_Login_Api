const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
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
const usersdata = mongoose.model("user", usersSchema);

module.exports = usersdata;
