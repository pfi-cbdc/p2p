const mongoose = require('mongoose');

const ResetPassword = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token_id: {
        type: String,
    },
    isValid: {
        type: Boolean,
        require: true,
        default: true
    },
    createdOn: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ResetPassword', ResetPassword);