const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const { v4: uuidv4 } = require('uuid');

const OrganisationSchema = new Schema({
    organisation_id: { type: String, index: { unique: true }, default: uuidv4() },
    name: { type: String, required: true, index: { unique: true } },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    technologies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Technology'
    }]
});

module.exports = mongoose.model('Organisation', OrganisationSchema)