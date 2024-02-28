const Comment = require('../models/comment');

module.exports = {
    create: async function (comment) {
        const newComment = new Comment({
            user_id: comment.user_id,
            profile_id: comment.profile_id,
            title: comment.title,
            content: comment.content,
            voting_mbti: comment.voting_mbti || null,
            voting_enneagram: comment.voting_enneagram || null,
            voting_zodiac: comment.voting_zodiac || null,
        });

        try {
            return await newComment.save();
        } catch (error) {
            throw error;
        }
    },

    getOne: async function (id) {
        try {
            const comment = await Comment.findOne({ id });
            return comment;
        } catch (error) {
            throw error;
        }
    },

    updateOne: async function (id, payload) {
        try {
            return await Comment.updateOne(
                { id },
                { $set: payload },
            )
        } catch (error) {
            throw error;
        }
    },

    list: async function (profileId, sortingOption = 'latest', filterOption = {}) {
        const whereCondition = { profile_id: profileId };

        if (sortingOption === 'latest') {
            sortingOption = { createdAt: -1 };
        } else if (sortingOption === 'top-liked') {
            sortingOption = { like_count: -1 };
        }

        if (filterOption.voting_mbti) {
            Object.assign(whereCondition, {
                voting_mbti: {
                    $ne: null
                }
            });
        }

        if (filterOption.voting_enneagram) {
            Object.assign(whereCondition, {
                voting_enneagram: {
                    $ne: null
                }
            });
        }

        if (filterOption.voting_zodiac) {
            Object.assign(whereCondition, {
                voting_zodiac: {
                    $ne: null
                }
            });
        }

        try {
            return await Comment.find(whereCondition).sort(sortingOption).exec();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};