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
        return res.status(201).json(organisation);
    } catch (error) {
        console.log(req.body, error)
        return res.status(500).json({ error: "Could not create organisation" });
    }
})

router.get('/', verify(['sysadmin']), async (req, res) => {
    try {
        const organisations = await Organisation.find();
        return res.status(200).json(organisations);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to find organisations' });
    }
});

router.get('/:id', verify(['sysadmin']), async (req, res) => {
    try {
        const organisations = await Organisation.findOne({ _id: req.params.id });
        return res.status(200).json(organisations);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to find organisations' });
    }
});

router.put('/', verify(['sysadmin']), async (req, res) => {
    try {
        const { id, name } = req.body;
        const organisation = await Organisation.findOneAndUpdate(
            { _id: id },
            { name: name });
        return res.status(200).json(`Updated organisation ${organisation.name}`);
    } catch (error) {
        return res.status(500).json({ error: 'Could not update organisation' });
    }
});

router.delete('/', verify(['sysadmin']), async (req, res) => {
    try {
        const { organisation_id } = req.body;
        const organisation = await Organisation.findOneAndDelete({ _id: organisation_id });
        return res.status(200).json(`Deleted organisation ${organisation.name}`);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Unable to delete organisation" });
    }
})

module.exports = router;