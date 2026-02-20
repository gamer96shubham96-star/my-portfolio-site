const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/portfolio");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String
});

const Project = mongoose.model("Project", projectSchema);

// Get all projects
app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});