const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Organisation = require("../models/organisation");
const verify = require('./../middleware/authMiddleware')
const Technology = require("../models/technology");
const {v4: uuidv4} = require("uuid");


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


router.get('/:id', verify(['sysadmin']), async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to find organisations' });
  }
});


router.get('/getByOrg/:id', verify(['sysadmin']), async (req, res) => {
  try {
    const user = await User.find({ organisation_id: req.params.id });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to find organisations' });
  }
});

router.put('/', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
        {
          user_id: req.body.user_id,
          deleted_at: null
        },
        {
          user_id: req.body.user_id,
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          role: req.body.role,
          organisation_id: req.body.organisation_id,
          updated_at: Date.now,
        });

    return res.status(200).json(technology);
  } catch (error) {
    return res.status(500).json({ error: 'Could not update user' });
  }
});

router.delete('/', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await Organisation.findOneAndDelete({ user_id: user_id });
    return res.status(200).json(`Deleted user ${user.name}`);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Unable to delete user" });
  }
})

module.exports = router;