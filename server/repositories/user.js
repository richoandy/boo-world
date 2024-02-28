const User = require('../models/user');
const user = require('../routes/user');

module.exports = {
    create: async function (user) {
        const newUser = new User({
            username: user.username,
            password: user.password,
        });

        try {
            return await newUser.save();
        } catch (error) {
            throw error;
        }
    },

    getOne: async function (username) {
        try {
            return await User.findOne({ username });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};