const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    city: String,
    state: String,
    country: String,
    street: String,
});

const userSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    gender: String,
    name: {
        first: String,
        last: String,
    },
    address: addressSchema,
    email: String,
    age: Number,
    picture: String,
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
