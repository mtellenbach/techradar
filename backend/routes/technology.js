const express = require('express');
const router = express.Router();
const Technology = require('../models/technology');
const ChangeLog = require('../models/changelog');
const verify = require("../middleware/authMiddleware");

require('dotenv').config({ path: '/../.env' })

router.post('/create', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const technology = new Technology({
            user_id: req.body.user_id,
            organisation_id: req.body.organisation_id,
            name: req.body.name,
            maturity: req.body.maturity,
            type: req.body.type,
            description: req.body.description,
            is_published: req.body.is_published
        });
        await technology.save();
        const changelog = new ChangeLog({
            technology_id: technology.technology_id,
            version_increment: 1
        })
        await changelog.save();
        return res.status(201).json(technology);
    } catch (error) {
        return res.status(500).json({ error: "Could not create technology" });
    }
})

router.get('/', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const technology = await Technology.find({
            deleted_at: null
        });
        return res.status(200).json(technology);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to find organisations' });
    }
});

router.get('/:id', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const technology = await Technology.findOne({
            technology_id: req.params.id,
            deleted_at: null
        });
        return res.status(200).json(technology);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to find technologies' });
    }
});

router.get('/getByOrg/:organisation_id', verify(['sysadmin', 'cto', 'techlead', 'user']), async (req, res) => {
    try {
        const technologies = await Technology.find({
            organisation_id: req.params.organisation_id,
            deleted_at: null
        });
        return res.status(200).json(technologies);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to find technologies' });
    }
});

router.put('/', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const technology = await Technology.findOneAndUpdate(
            {
                technology_id: req.body.technology_id,
                deleted_at: null
            },
            {
                user_id: req.body.user_id,
                organisation_id: req.body.organisation_id,
                name: req.body.name,
                maturity: req.body.maturity,
                type: req.body.type,
                description: req.body.description,
                is_published: req.body.is_published,
                updated_at: Date.now()
            });

        await createChangeLog(technology.technology_id)
        res.status(200).json(technology);
    } catch (error) {
        res.status(500).json({ error: 'Could not update technology' });
    }
});

router.put('/publish', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const { technology_id, is_published } = req.body;
        const technology = await Technology.findOneAndUpdate(
            {
                technology_id: technology_id,
                deleted_at: null
            },
            {
                is_published: is_published,
                updated_at: Date.now()
            });
        await createChangeLog(technology.technology_id)
        res.status(200).json(technology);
    } catch (error) {
        res.status(500).json({ error: 'Could not update technology' });
    }
});

router.put('/delete', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const { technology_id } = req.body;
        const technology = await Technology.findOneAndUpdate(
            { technology_id: technology_id },
            {
                deleted_at: Date.now()
            }
            );
        res.status(200).json(`Deleted technology ${technology.name}`);
    } catch (error) {
        res.status(500).json({ error: "Unable to delete technology" });
    }
})

async function createChangeLog(id) {
    const latestTechnologyChangeLog = await ChangeLog.findOne({ technology_id: id })
        .sort([['created_at', -1]]).limit(1).exec();
    const changeLog = new ChangeLog({
        technology_id: id,
        version_increment: parseInt(latestTechnologyChangeLog.version_increment) + 1
    });
    await changeLog.save();
}

module.exports = router;