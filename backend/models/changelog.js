const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const { v4: uuidv4 } = require('uuid');

const ChangeLogSchema = new Schema({
    changelog_id: { type: String, required: true, index: { unique: true }, default: uuidv4() },
    technology_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Technology' },
    version_increment: { type: Number, required: true },
    created_at: { type: Date, required: true, default: Date.now() }
});

module.exports = mongoose.model('ChangeLog', ChangeLogSchema)