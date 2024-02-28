const mongoose = require('mongoose'),
    Schema = mongoose.Schema
const {v4: uuidv4} = require("uuid");

const TechnologySchema = new Schema({
    technology_id: { type: String, required: true, index: { unique: true }, default: uuidv4() },
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    organisation_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Organisation' },
    name: { type: String, required: true },
    maturity: { type: Number, required: true },
    type: { type: Number, required: true },
    description: { type: String, required: true },
    is_published: { type: Boolean },
    created_at: { type: Date, required: true, default: Date.now() },
    updated_at: { type: Date },
    deleted_at: { type: Date },
    changelogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'ChangeLog'
    }]
});

module.exports = mongoose.model('Technology', TechnologySchema)