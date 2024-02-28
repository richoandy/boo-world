const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    user_id: {
        type: Number,
        required: true,
    },
    profile_id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [{ // consisted of user-id
        type: Number,
    }],
    like_count: {
        type: Number,
        default: 0,
    },
    voting_mbti: {
        type: String,
    },
    voting_enneagram: {
        type: String,
    },
    voting_zodiac: {
        type: String,
    },
}, {
    timestamps: true
});

commentSchema.pre('save', async function (next) {
    try {
        if (!this.isNew) {
            return next();
        }

        // Find the highest customId in the collection
        const highestCustomId = await this.constructor.findOne({}, 'id').sort({ id: -1 });

        // Set the customId for the new document
        this.id = highestCustomId ? highestCustomId.id + 1 : 1;

        next();
    } catch (error) {
        next(error);
    }
});

let comment = mongoose.model('comments', commentSchema)

module.exports = comment;

