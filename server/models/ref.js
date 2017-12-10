const mongoose = require("mongoose");

const RefSchema = new mongoose.Schema({
  book:     { type: String, trim: true },
  composer: { type: String, trim: true },
  piece:    { type: String, trim: true },
  quote:    { type: String, trim: true },
  page:     { type: Number },
  genre:    { type: String, trim: true },
  spotifyId: [String]
});

module.exports = mongoose.model("Ref", RefSchema, "Refs");
