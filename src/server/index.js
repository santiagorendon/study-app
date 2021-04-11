const express = require('express');
const app = express();
var hash =require('pbkdf2-password')()
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '/.env')}); // put ur own path
require("./db.js");
const os = require('os');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const StudyGroup = mongoose.model('StudyGroup');
const Message = mongoose.model('Message');
app.use(express.static('dist'));
app.use(express.urlencoded({extended: false}));
const session = require('express-session');

const sessionOptions = {
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
};
app.use(session(sessionOptions));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/fetch-all', (req, res) => {
  StudyGroup.find({}, (issue, studyGroups) => {
    if(issue) {
      res.json({'err': issue});
    }
    res.json({studyGroups});
  });
});

app.post('/api/fetch-one-room', (req, res) => {
	const id = req.body.id;
	console.log(id);
	StudyGroup.findById(id, (issue, group) => {

		  console.log(group);
    if(issue) {
      res.json({'err': issue});
    }
    res.json({group});
	})

})

app.post('/api/find-user', (req, res) => {
	const id = req.body.id;
	User.findById(id, (issue, user) => {
		if(!user) {
			return res.json({"err": "user not found"});
		}
		return res.json({
			email: user["email"],
			username: user["username"],
			profileImage: user["profileImage"],
			major: user["major"],
			bio: user["bio"],
			studyGroups: user["studyGroups"]
		});
	});
});

app.post('/api/get-message-board', (req, res) => {
	const studyGroup = req.body.studyGroup;
	StudyGroup.find({name: studyGroup}, (issue, groups) => {
		const group = groups[0];
		if(issue) {
			res.status(200).json({error: issue});
		}
		res.json({ "messages": group["messageList"] });
	});
});

app.post('/api/create-message', (req, res) => {
	const text = req.body.text;
	const sender = req.body.sender;
	const studyGroup = req.body.studyGroup;
	StudyGroup.find({name: studyGroup}, (issue, groups) => {
		if(issue) {
			res.status(200).json({error: issue});
		}
		const group = groups[0];
    if(!group) { // group DNE
      err = "Group does not exist";
      res.status(200).json({error: err});
    }
		const message = new Message({ // create message
			text: text,
			sender: sender,
			studyGroup: group
		});
		message.save(function(err){
			if(err){
        res.json({'error': 'Error saving data'});
      }
			group.messageList.push(message);
			group.save((err, product)=>{
				if(err) {
					res.json({'error': 'Error saving data'});
				}
				res.json({'success': true});
			});

		});
	});
});

app.post('/api/create-room', (req, res) => {
  const admin = req.body.admin;
  const name = req.body.name;
  const bio = req.body.bio;
  const userList = [];
  userList.push(admin);

  StudyGroup.find({name: name}, (issue, groups) => {
    const group = groups[0];
    if(group) {
      err = "Group name exists";
      res.status(200).json({error: err});
    }
    else{
      // create new study group
      new StudyGroup({
        admin: admin,
        name: name,
        userList: userList,
        bio: bio,
				messageList: []
      }).save(function(err){
        if(err){
          res.json({'error': 'Error saving data'})
        }
        else{ // if study group is made
          User.findOne({username: admin}, (issue, user)=>{
            if(issue){
              res.json(issue);
            }
            if(user.studyGroups) {
              user.studyGroups.append(name);
            }
            user.save((err, product) => {
              if(err){
                res.json(err);
              }
              else{
                res.json({'success': true});
              }
            });
          });
        }
      });
    }
  })


});

app.get('/api/logout', (req, res) => {
	req.session.user = undefined;
  res.send('logged out');
});

app.post('/api/login', (req, res) => {
	const email = req.body.email;
	const password  = req.body.password;
	let err = '';
	User.find({email: email}, (issue, users)=>{
		const user = users[0];
		if(!(email && password)){
			err = "Please fill in both fields";
		}
		else if(!user){
			err = "Email does not exist";
		}
		if(err){
			res.status(200).json({error: err});
		}
		//valid username
		else{
			hash({ password: password, salt: user.salt }, function (err, pass, salt, hash) {
				if(err){
					err = "Password and Email do not match";
					res.status(200).json({error: err});
				}
        else if (hash === user.hash){
					req.session.user = user['_id'];
					res.json({'success': user['_id']});
				}
				else{
					err = "Password and Email do not match";
					res.status(200).json({error: err});
				}
      });
		}
	});
});

app.post('/api/create-account', (req, res) => {
  const email = req.body.email;
	const username = req.body.username;
	const password  = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	let err = "";

	User.find({username: username}, (issue, users)=>{
    if(users[0]){
			err = "Username exists";
			res.status(200).json({error: err});
		}
		//new user
		else{
			if(!(username && password && confirmPassword)){
				err = "All fields must be filled";
			}
			else if(username === password){
				err = "Password cannot be username";
			}
			else if(password !== confirmPassword){
				err = "Passwords must match";
			}
			else if(password.length < 8){
				err = "Password must be at least 8 characters long";
			}
			if(err){
				res.status(200).json({error: err});
			}
			else{
				hash({ password: password }, function (err, pass, salt, hash) {
			    if (err) throw err;
			    // store the salt & hash in the "db"
					const newUser = new User({
            email: email,
			      username: username,
						salt: salt,
			      hash: hash,
            studyGroups: []
			    });
          newUser.save(function(err){
			      if(err){
			        res.json({'error': 'Error saving data'})
			      }
			      else{
			        res.json({'success': newUser['_id']});
			      }
			    });
			  });
			}
		}
  });

});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
