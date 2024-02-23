const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 15,
  },
  password: { type: String, required: true, minlength: 8 },
});

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
