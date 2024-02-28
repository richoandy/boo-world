const Joi = require('joi');
const profileRepository = require('../repositories/profile');

const profileJoiSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    mbti: Joi.string().required(),
    enneagram: Joi.string().required(),
    variant: Joi.string().required(),
    tritype: Joi.number().required(),
    socionics: Joi.string().required(),
    sloan: Joi.string().required(),
    psyche: Joi.string().required(),
    image: Joi.string(),
})

module.exports = {
    create: async function (req, res) {
        try {
            await profileJoiSchema.validateAsync(req.body);
        } catch (error) {
            throw res.status(400).json({
                error_code2: "VALIDATION_ERROR",
                error_message: error.details,
            })
        }

        try {
            const newProfile = await profileRepository.create(req.body);
            res.status(201).json(newProfile);
        } catch (error) {
            console.log(error);
            throw res.status(500).json({
                error_code: "DATABASE_ERROR",
                error_message: error,
            })
        }
    },

    getOne: async function (req, res) {
        try {
            Joi.assert(req.params.id, Joi.number().required());

        } catch (error) {
            throw res.status(400).json({
                error_code: "VALIDATION_ERROR",
                error_message: error.details,
            })
        }

        try {
            const profile = await profileRepository.getOne(req.params.id);

            res.render('profile_template', {
                profile,
            });
        } catch (error) {
            throw res.status(500).json({
                error_code: "DATABASE_ERROR",
                error_message: error,
            })
        }
    }
};