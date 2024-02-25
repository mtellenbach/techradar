const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Organisation = require("../models/organisation");
const verify = require('./../middleware/authMiddleware')


// User registration
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
    res.status(201).json({ message: 'User registered successfully' + user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    res.json({ token });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/', verify(['sysadmin']), async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to find users' });
  }
});

module.exports = router;