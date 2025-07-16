const jwt = require('jsonwebtoken');
const JWT_SECRET = 'supersecret';

const authorize = (roles = []) => {
    return (req, res, next) => {

        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace(/^Bearer\s/, '')

        if(!token) {
            return res.status(401).json({error: 'Token is missing!'});
        }

        try {
            const payload = jwt.verify(token, JWT_SECRET);
            if(!roles.includes(payload.role)) {
                return res.status(403).json({error: 'Forbidden'});
            }

            req.user = payload;
            next();
        } catch (error) {
            return res.status(401).json({error: 'Invalid token'});
        }
    }
}

module.exports = { authorize };