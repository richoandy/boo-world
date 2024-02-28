const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mbti: {
        type: String,
        required: true
    },
    enneagram: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        required: true
    },
    tritype: {
        type: Number,
        required: true
    },
    socionics: {
        type: String,
        required: true
    },
    sloan: {
        type: String,
        required: true
    },
    psyche: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
}, {
    timestamps: true
});

profileSchema.pre('save', async function (next) {
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

let profile = mongoose.model('profiles', profileSchema)

module.exports = profile;
