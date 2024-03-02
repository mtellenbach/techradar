const express = require('express');
const router = express.Router();
const Technology = require('../models/technology');
const ChangeLog = require('../models/changelog');
const verify = require("../middleware/authMiddleware");

require('dotenv').config({ path: '/../.env' })

router.post('/create', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const uuid = require("uuid");
        const technology = new Technology({
            technology_id: uuid.v4(),
            user_id: req.body.user_id,
            organisation_id: req.body.organisation_id,
            name: req.body.name,
            maturity: req.body.maturity,
            type: req.body.type,
            description: req.body.description,
            decision: req.body.decision,
            is_published: req.body.is_published
        });
        await technology.save();
        const changelog = createChangeLog(technology);
        technology.changelogs.push(changelog._id);
        return res.status(200).json(technology);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Could not create technology" });
    }
})

router.get('/', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const technology = await Technology.find({
            deleted_at: null
        }).sort('type');
        return res.status(200).json(technology);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to find organisations' });
    }
});


router.get('/getByOrg/:id/isPublished', verify(['sysadmin', 'cto', 'techlead', 'user']), async (req, res) => {
    try {
        const technology = await Technology.find({
            organisation_id: req.params.id,
            is_published: 1,
            deleted_at: null
        }).sort('type').populate(['changelogs', 'organisation_id', 'user_id']).exec();
        return res.status(200).json(technology);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to find organisations' });
    }
});

router.get('/:id', verify(['sysadmin', 'cto', 'techlead', 'user']), async (req, res) => {
    try {
        const technology = await Technology.findOne({
            _id: req.params.id,
            deleted_at: null
        }).populate(['changelogs', 'organisation_id', 'user_id']).exec();
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
        }).sort('type').populate(['changelogs', 'organisation_id', 'user_id']).exec();
        return res.status(200).json(technologies);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to find technologies' });
    }
});

router.put('/', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const technology = await Technology.findOneAndUpdate(
        {
            _id: req.body.id
        },
        {
            user_id: req.body.user_id,
            organisation_id: req.body.organisation_id,
            name: req.body.name,
            maturity: req.body.maturity,
            type: req.body.type,
            description: req.body.description,
            decision: req.body.decision,
            is_published: req.body.is_published,
            updated_at: Date.now()
        });
        createChangeLog(technology);
        return res.status(200).json(technology);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Could not update technology' });
    }
});

router.put('/publish', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const { technology_id, is_published } = req.body;
        const technology = await Technology.findOneAndUpdate(
            {
                _id: technology_id,
                deleted_at: null
            },
            {
                is_published: is_published,
                updated_at: Date.now()
            });
        await createChangeLog(technology)
        return res.status(200).json(technology);
    } catch (error) {
        return res.status(500).json({ error: 'Could not update technology' });
    }
});

router.delete('/:id', verify(['sysadmin', 'cto', 'techlead']), async (req, res) => {
    try {
        const technology = await Technology.findOneAndDelete(
            { _id: req.params.id }
            );
        return res.status(200).json(technology);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Unable to delete technology" });
    }
})

async function createChangeLog(technology) {
    const uuid = require('uuid')
    const latestTechnologyChangeLog = await ChangeLog.findOne({ technology_id: technology.id })
        .sort([['created_at', -1]]).limit(1).exec();
    let version_increment = 0;
    if (latestTechnologyChangeLog) {
        version_increment = latestTechnologyChangeLog.version_increment
    }
    const changeLog = new ChangeLog({
        technology_id: technology.id,
        version_increment: parseInt(version_increment) + 1,
        changelog_id: uuid.v4()
    });
    await changeLog.save();
    return changeLog;
}

module.exports = router;