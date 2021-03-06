const express = require("express");
const app = express();
var hash = require("pbkdf2-password")();
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/.env") }); // put ur own path
require("./db.js");
const os = require("os");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const StudyGroup = mongoose.model("StudyGroup");
const Message = mongoose.model("Message");
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));
const session = require("express-session");

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
};
app.use(session(sessionOptions));

app.use(function(req, res, next) {
  // Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
});

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get("/api/fetch-all", (req, res) => {
  StudyGroup.find({}, (issue, studyGroups) => {
    if (issue) {
      res.json({ "err": issue });
    }
    res.json({ studyGroups });
  });
});

app.post("/api/fetch-one-room", (req, res) => {
  const id = req.body.id;
  StudyGroup.findById(id, (issue, group) => {
    if (issue) {
      res.json({ "err": issue });
    }
    res.json({ group });
  });
});

app.post("/api/find-user", (req, res) => {
  const id = req.body.id;
  User.findById(id, (issue, user) => {
    if (!user) {
      return res.json({ "err": "user not found" });
    }
    return res.json({
      email: user["email"],
      username: user["username"],
      profileImage: user["profileImage"],
      major: user["major"],
      bio: user["bio"],
      studyGroups: user["studyGroups"],
    });
  });
});

app.post("/api/edit-user", (req, res) => {
  const id = req.body.id;
  const major = req.body.major;
  const bio = req.body.bio;
  User.findById(id, (issue, user) => {
    if (!user) {
      return res.json({ "err": "user not found" });
    }
    user.bio = bio;
    user.major = major;
    user.save((err) => {
      if (err) {
        res.json({ "error": "Error saving data" });
      }
      res.json({ "success": true });
    });
  });
});

app.post("/api/get-message-board", (req, res) => {
  const studyGroup = req.body.studyGroup;
  StudyGroup.find({ name: studyGroup }, (issue, groups) => {
    const group = groups[0];
    if (issue) {
      res.status(200).json({ error: issue });
    }
    res.json({ "messages": group["messageList"] });
  });
});

app.post("/api/create-message", (req, res) => {
  const text = req.body.text;
  const senderId = req.body.senderId;
  const studyGroup = req.body.studyGroup;
  console.log(senderId);
  StudyGroup.find({ name: studyGroup }, (issue, groups) => {
    if (issue) {
      res.json({ error: issue });
    } else {
      const group = groups[0];
      if (!group) {
        // group DNE
        err = "Group does not exist";
        res.json({ error: err });
      } else {
        const message = new Message({
          // create message
          text: text,
          senderId: senderId,
          studyGroup: group,
        });
        message.save(function (err) {
          if (err) {
            res.json({ "error": err });
          } else {
            group.messageList.push(message);
            group.save((err, product) => {
              if (err) {
                res.json({ "error": err });
              } else {
                res.json({ "success": true });
              }
            });
          }
        });
      }
    }
  });
});

app.post("/api/join-room", (req, res) => {
  const userId = req.body.userId;
  const roomName = req.body.roomName;
  User.findById(userId, (issue, user) => {
    if (issue) {
      res.json({ "err": issue });
    }
    user.studyGroups.push(roomName);
    user.save((err, product) => {
      if (err) {
        res.json({ "error": "Error saving data" });
      }
      StudyGroup.find({ name: roomName }, (issue, groups) => {
        const group = groups[0];
        if (!group) {
          err = "Group name does not exists";
          res.status(200).json({ error: err });
        }
        group.userList.push(user["username"]);
        group.save((err, product) => {
          if (err) {
            res.json({ "error": "Error saving data" });
          }
          res.json({ "success": "joined room" });
        });
      });
    });
  });
});

app.post("/api/create-room", (req, res) => {
  const admin = req.body.admin;
  const name = req.body.name;
  const bio = req.body.bio;
  let playlistUrl = req.body.playlistUrl ? req.body.playlistUrl : "";
  const userList = [];
  userList.push(admin);

  StudyGroup.find({ name: name }, (issue, groups) => {
    const group = groups[0];
    if (group) {
      err = "Group name exists";
      res.status(200).json({ error: err });
    }
    // create new study group
    new StudyGroup({
      admin: admin,
      name: name,
      userList: userList,
      playlistUrl: playlistUrl,
      bio: bio,
      messageList: [],
    }).save(function (err) {
      if (err) {
        res.json({ "error": "Error saving data" });
      } else {
        // if study group is made
        User.findOne({ username: admin }, (issue, user) => {
          if (issue) {
            res.json(issue);
          }
          if (user.studyGroups) {
            user.studyGroups.push(name);
          }
          user.save((err, product) => {
            if (err) {
              res.json(err);
            } else {
              res.json({ "success": true });
            }
          });
        });
      }
    });
  });
});

app.get("/api/logout", (req, res) => {
  req.session.user = undefined;
  res.send("logged out");
});

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let err = "";
  User.find({ email: email }, (issue, users) => {
    const user = users[0];
    if (!(email && password)) {
      err = "Please fill in both fields";
    } else if (!user) {
      err = "Email does not exist";
    }
    if (err) {
      res.status(200).json({ error: err });
    }
    //valid username
    else {
      hash(
        { password: password, salt: user.salt },
        function (err, pass, salt, hash) {
          if (err) {
            err = "Password and Email do not match";
            res.status(200).json({ error: err });
          } else if (hash === user.hash) {
            req.session.user = user["_id"];
            res.json({
              "success": {
                id: user["_id"],
                email: user["email"],
                username: user["username"],
                profileImage: user["profileImage"],
                major: user["major"],
                bio: user["bio"],
                studyGroups: user["studyGroups"],
              },
            });
          } else {
            err = "Password and Email do not match";
            res.status(200).json({ error: err });
          }
        }
      );
    }
  });
});

app.post("/api/create-account", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  let err = "";

  User.find({ username: username }, (issue, users) => {
    if (users[0]) {
      err = "Username exists";
      res.status(200).json({ error: err });
    }
    //new user
    else {
      if (!(username && password && confirmPassword)) {
        err = "All fields must be filled";
      } else if (username === password) {
        err = "Password cannot be username";
      } else if (password !== confirmPassword) {
        err = "Passwords must match";
      } else if (password.length < 8) {
        err = "Password must be at least 8 characters long";
      }
      if (err) {
        res.status(200).json({ error: err });
      } else {
        hash({ password: password }, function (err, pass, salt, hash) {
          if (err) throw err;
          // store the salt & hash in the "db"
          const newUser = new User({
            email: email,
            username: username,
            salt: salt,
            hash: hash,
            studyGroups: [],
          });
          newUser.save(function (err) {
            if (err) {
              res.json({ "error": "Error saving data" });
            } else {
              res.json({
                "success": {
                  id: newUser["_id"],
                  email: newUser["email"],
                  username: newUser["username"],
                },
              });
            }
          });
        });
      }
    }
  });
});

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.join(__dirname, 'dist')));
    app.use('/dist', express.static(path.join(__dirname, '../../dist')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
        //response.sendFile(path.join(__dirname, 'src/client/build', 'index.html'));
    });
}


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
