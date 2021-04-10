const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/.env") }); // put ur own path
console.log(path.join(__dirname, "/.env"));
const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  major: {
    type: String,
  },
  bio: {
    type: String,
  },
  hash: {
    type: String,
  },
  salt: {
    type: String,
  },
});

const StudyGroup = new mongoose.Schema({
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  bio: {
    type: String,
  },
});

mongoose.model("User", User);
mongoose.model("StudyGroup", StudyGroup);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then((db) => console.log(`DB is connected`))
  .catch((err) => console.error(err));
