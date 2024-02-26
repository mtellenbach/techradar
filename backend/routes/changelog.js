const express = require('express');
const router = express.Router();
const ChangeLog = require('../models/changelog');
const verify = require("../middleware/authMiddleware");

require('dotenv').config({ path: '/../.env' })

router.get('/', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    const { technology_id } = req.body;
    try {
        const changelogs = await ChangeLog.find({ technology_id: technology_id });
        res.status(200).json(changelogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to find changelogs' });
    }
});

module.exports = router;