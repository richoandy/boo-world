const Profile = require('../models/profile');

module.exports = {
    create: async function (profile) {
        const newProfile = new Profile({
            name: profile.name,
            description: profile.description,
            mbti: profile.mbti,
            enneagram: profile.enneagram,
            variant: profile.variant,
            tritype: profile.tritype,
            socionics: profile.socionics,
            sloan: profile.sloan,
            psyche: profile.psyche,
            image: profile.image || 'https://soulverse.boo.world/images/1.png',
        });

        try {
            return await newProfile.save();
        } catch (error) {
            throw error;
        }
    },

    getOne: async function (id) {
        try {
            const profile = await Profile.findOne({ id });
            return profile;
        } catch (error) {
            throw error;
        }
    }
}