const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '/.env')}); // put ur own path

const Message = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId
  },
  text: {
    type: String
  }
}, {
  timestamps: true
});

const StudyGroup= new mongoose.Schema({
  admin: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  playlistUrl: {
    type: String,
    default: 'https://www.youtube.com/embed/reRYtjr1BNo'
  },
  userList: [String],
  bio: {
    type: String,
    default: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicer'

  },
  messageList: [Message]
}, {
  timestamps: true
});

const User= new mongoose.Schema({

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
    default: 'Default'
  },
  bio: {
    type: String,
    default: 'Default'
  },
  hash: {
    type: String,
  },
  salt: {
    type: String,
  },
  studyGroups: [String]
});

mongoose.model("User", User);
mongoose.model("StudyGroup", StudyGroup);
mongoose.model("Message", Message);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then((db) => console.log(`DB is connected`))
  .catch((err) => console.error(err));
