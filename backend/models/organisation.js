const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
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