const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ChangeLogSchema = new Schema({
    technology_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Technology' },
    version_increment: { type: Number, required: true },
    created_at: { type: Date, required: true, default: Date.now() }
});

module.exports = mongoose.model('ChangeLog', ChangeLogSchema)