const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new Schema({
    user_id: { type: String, default: uuidv4() },
    username: { type: String, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, index: { unique: true } },
    role: { type: String },
    organisation_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Organisation' },
    created_at: { type: Date, default: Date.now() },
    last_login: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
    technologies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Technology'
    }]
});

UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }

    const organisation = mongoose.model('Organisation');
    if (!user.isModified('organisation_id')) return next();
    if (typeof user.organisation_id === 'number') {
        organisation.findById(user.organisation_id);
    }

});

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema)