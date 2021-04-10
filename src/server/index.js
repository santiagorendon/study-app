const express = require('express');
const app = express();
require("./db.js");
var hash =require('pbkdf2-password')()
require('dotenv').config({path: '/Users/santiagorendon/Desktop/study-group-app/.env'}); // put ur own path
const os = require('os');
const mongoose = require('mongoose');
const User = mongoose.model('User');
app.use(express.static('dist'));
app.use(express.urlencoded({extended: false}));
const session = require('express-session');

const sessionOptions = {
	secret: '#@iCs;W&/zT^Tb(',
	saveUninitialized: false,
	resave: false
};
app.use(session(sessionOptions));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

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
					res.json({'success':true});
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
					new User({
            email: email,
			      username: username,
						salt: salt,
			      hash: hash
			    }).save(function(err){
			      if(err){
			        res.json({'error': 'Error saving data'})
			      }
			      else{
			        res.json({'success': true});
			      }
			    });
			  });
			}
		}
  });

});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
