import mongoose from "mongoose";

const ImdbSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  imdbID: { type: String, required: true, unique: true },
  Type: { type: String, enum: ["movie", "series", "episode"], required: true },
  Poster: { type: String, required: true },
});

const Imdb = mongoose.model("Imdb", ImdbSchema);

export default Imdb;
