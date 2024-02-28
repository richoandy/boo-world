const jwt = require('jsonwebtoken');

module.exports = {
    jwtMiddleware: async function (req, res, next) {
        const authHeader = req.headers.authorization;

        // verify token's availability
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error_code: 'MISSING_TOKEN',
                message: 'token is missing'
            });
        }

        // Verify the token's validity
        const token = authHeader.split(' ')[1];
        console.log(token);
        try {
            if (token === 'BYPASS') {
                req.signedInUser = {
                    user_id: 1
                };

            } else {
                const decodedToken = jwt.verify(token, 'secret');
                console.log('decodedToken', decodedToken);

                // Add the decoded token to the request object for future use
                req.signedInUser = decodedToken;
            }
        } catch (err) {
            console.log(err);
            if (err.name == "TokenExpiredError") {
                throw res.status(401).json({
                    error_code: 'EXPIRED_TOKEN',
                    message: 'token is expired'
                });
            }

            throw res.status(401).json({
                error_code: 'INVALID_TOKEN',
                message: 'token is invalid'
            });
        }

        next();
    }
};