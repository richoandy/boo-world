const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user');
const user = require('../routes/user');

module.exports = {
    signUp: async function (req, res) {
        const hashedPassword = await bcrypt.hash(
            req.body.password,
            256
        );

        const result = await userRepository.create({
            username: req.body.username,
            password: hashedPassword
        });

        return res.status(201).json(result);
    },

    signIn: async function (req, res) {
        let user;
        try {
            user = await userRepository.getOne(req.body.username);

            if (!user) {
                throw res.status(400).json({
                    error_code: 'INCORRECT_USERNAME',
                    error_message: null,
                })
            }
        } catch (error) {
            throw res.status(500).json({
                error_code: 'DATABASE_ERROR',
                error_message: null,
            })
        }

        if (!await bcrypt.compare(req.body.password, user.password)) {
            throw res.status(400).json({
                error_code: 'INCORRECT_PASSWORD',
                error_message: null,
            })
        }

        return res.status(200).json({
            session: jwt.sign(
                {
                    user_id: user.id,
                    username: user.username,
                },
                'secret',
                {
                    expiresIn: 24 * 365 + 'h'
                }
            )
        })
    },
};