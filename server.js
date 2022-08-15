import "dotenv/config";
import path from "path";

import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));

//create DB Schema and Model
const postSchema = mongoose.Schema({
  title: String,
  description: String,
});
const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  res.send("express is here");
});

app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});
app.delete("/posts/delete/:_id", (req, res) => {
  Post.findByIdAndDelete({ _id: req.params._id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.post("/createpost", (req, res) => {
  Post.create({
    title: req.body.title,
    description: req.body.description,
  })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
app.put("/post/updatepost/:_id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params._id },
    { title: req.body.title, description: req.body.description }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.listen(3001, () => {
  console.log("server is running in 3001");
});
