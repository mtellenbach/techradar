const express = require('express');
const router = express.Router();
const ChangeLog = require('../models/changelog');
const verify = require("../middleware/authMiddleware");

require('dotenv').config({ path: '/../.env' })

router.get('/:id', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const changelogs = await ChangeLog.find({ technology_id: req.params.id }).populate('technology_id').exec();
        return res.status(200).json(changelogs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to find changelogs' });
    }
});

module.exports = router;