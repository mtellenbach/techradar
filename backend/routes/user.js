const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Organisation = require("../models/organisation");
const verify = require('./../middleware/authMiddleware')


router.post('/create', verify(['sysadmin']), async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    organisation_id: req.body.organisation_id,
    role: req.body.role,
    email: req.body.email
  });
  try {
    await user.save();
    return res.status(201).json({ message: 'User registered successfully' + user });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      let user = await User.findOne({ email: username });

      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.user_id, role: user.role, organisation_id: user.organisation_id },
      process.env.SECRET_KEY, {
        expiresIn: '1 hour'
      }
    );
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/', verify(['sysadmin']), async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to find users' });
  }
});

module.exports = router;