const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true, 
            trim: true, 
        }, 
        email: {
            type: String, 
            required: true, 
            unique: true, 
            match: [/.+@.+\..+/, "Must use a valid email address"]
        }, 
        password: {
            type: String,
            required: true,
        }
        // set savedCharacters to be an array of data that adheres to the characterSchema
        savedCharacters: [characterSchema],
    }, 
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// set up pre-save middleware to create password // hash user password
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `characterCount` with the number of saved Characters we have
// userSchema.virtual("characterCount").get(function () {
//     return this.savedCharacters.length;
// });

const User = model("User", userSchema);

model.exports = User;