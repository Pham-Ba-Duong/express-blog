const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    // collection: "categories",
    timestamps: true,
  }
);

module.exports = mongoose.model("CategoryEntity", CategorySchema, "categories");
