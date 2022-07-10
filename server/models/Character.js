const { Schema } = require("mongoose");

//use for the User's saveChararcter array in User.js

const characterSchema = new Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
		required: true,
	},
	characterId: {
		type: String,
		require: true,
	},
	image: {
		type: String,
	},
});

// const Character = model("Character", characterSchema);
module.exports = characterSchema;
