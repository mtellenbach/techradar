const express = require('express');
const router = express.Router();
const Organisation = require('../models/organisation');
const verify = require("../middleware/authMiddleware");

require('dotenv').config({ path: '/../.env' })

router.post('/create', verify(['sysadmin']), async (req, res) => {
    const { name } = req.body;
    try {
        const organisation = new Organisation({ name });
        await organisation.save();
        res.status(201).json({ message: 'Organisation created successfully' });
    } catch (error) {
        res.status(500).json({ error: "Could not create organisation" });
    }
})

router.get('/', verify(['sysadmin']), async (req, res) => {
    try {
        const organisations = await Organisation.find();
        res.status(200).json(organisations);
    } catch (error) {
        res.status(500).json({ error: 'Unable to find organisations' });
    }
});

router.get('/:id', verify(['sysadmin']), async (req, res) => {
    try {
        const organisations = await Organisation.findOne({ organisation_id: req.params.id });
        res.status(200).json(organisations);
    } catch (error) {
        res.status(500).json({ error: 'Unable to find organisations' });
    }
});

router.put('/', verify(['sysadmin']), async (req, res) => {
    try {
        const { organisation_id, name } = req.body;
        const organisation = await Organisation.findOneAndUpdate(
            { organisation_id: organisation_id },
            { name: name });
        res.status(200).json(`Updated organisation ${organisation.name}`);
    } catch (error) {
        res.status(500).json({ error: 'Could not update organisation' });
    }
});

router.delete('/', verify(['sysadmin']), async (req, res) => {
    try {
        const { organisation_id } = req.body;
        const organisation = await Organisation.findOneAndDelete({ organisation_id: organisation_id });
        res.status(200).json(`Deleted organisation ${organisation.name}`);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Unable to delete organisation" });
    }
})

module.exports = router;