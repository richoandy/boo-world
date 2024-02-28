const Joi = require('joi');
const _ = require('lodash');
const commentRepository = require('../repositories/comment');

const commentJoiSchema = Joi.object({
    profile_id: Joi.number().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    voting_mbti: Joi.string().optional().valid(
        'INFP',
        'INFJ',
        'ENFP',
        'ENFJ',
        'INTJ',
        'INTP',
        'ENTP',
        'ENTJ',
        'ISFP',
        'ISFJ',
        'ESFP',
        'ESFJ',
        'ISTP',
        'ISTJ',
        'ESTP',
        'ESTJ'
    ),
    voting_enneagram: Joi.string().optional().valid(
        '1w2',
        '2w3',
        '3w2',
        '3w4',
        '4w3',
        '4w5',
        '5w4',
        '5w6',
        '6w5',
        '6w7',
        '7w6',
        '7w8',
        '8w7',
        '8w9',
        '9w8',
        '9w1'
    ),
    voting_zodiac: Joi.string().optional().valid(
        'aries',
        'taurus',
        'gemini',
        'cancer',
        'leo',
        'virgo',
        'libra',
        'scorpio',
        'sagitarius',
        'capricorn',
        'aquarius',
        'pisces'
    )
});

module.exports = {
    create: async function (req, res) {
        try {
            await commentJoiSchema.validateAsync(req.body);
        } catch (error) {
            throw res.status(400).json({
                error_code2: "VALIDATION_ERROR",
                error_message: error.details,
            })
        }

        try {
            const newComment = await commentRepository.create({
                ...req.body,
                user_id: req.signedInUser.user_id,
            });

            return res.status(200).json(newComment);
        } catch (error) {
            res.status(500).json({
                error_code: 'DATABASE_ERROR',
                error_message: error
            })
        }
    },

    like: async function (req, res) {
        const signedInUserId = req.signedInUser.user_id;

        try {
            const comment = await commentRepository.getOne(req.params.id);

            const liked = _.find(comment.likes, (i) => i === signedInUserId);

            console.log(liked);

            if (liked === undefined) {
                await commentRepository.updateOne(req.params.id, {
                    like_count: comment.like_count + 1,
                    likes: [...comment.likes, signedInUserId]
                });

                const updatedComment = await commentRepository.getOne(req.params.id);
                console.log(updatedComment);

                return res.status(200).json(updatedComment);
            } else {
                return res.status(200).json(comment);
            }
        } catch (error) {
            res.status(500).json({
                error_code: 'DATABASE_ERROR',
                error_message: error
            })
        }
    },

    getComments: async function (req, res) {
        // TODO
        // implement sorting later recent/number of likes
        // implement filters by personality systems

        const profileId = req.params.id;

        if (req.query.sorting === 'latest') {
            sortingOptions = 'latest';
        } else if (req.query.sorting === 'top-liked') {
            sortingOptions = 'top-liked';
        }

        const filterOptions = {}

        if (req.query.voting_mbti === 'true') {
            Object.assign(filterOptions, {
                voting_mbti: true
            });
        }

        if (req.query.voting_enneagram === 'true') {
            Object.assign(filterOptions, {
                voting_enneagram: true
            });
        }

        if (req.query.voting_zodiac === 'true') {
            Object.assign(filterOptions, {
                voting_zodiac: true
            });
        }

        try {
            const comments = await commentRepository.list(profileId, sortingOptions, filterOptions);

            return res.status(200).json(comments);
        } catch (error) {
            console.log(error);
            throw res.status(500).json({
                error_code: 'DATABASE_ERROR',
                error_message: error
            })
        }
    },
};