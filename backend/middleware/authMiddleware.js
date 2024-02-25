const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '/../.env' })

const verify = (roles) => {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ error: "Unauthorized" });
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (roles.includes(decoded.role)) {
            next();
        } else {
            res.status(403).json({ error: "Forbidden" })
        }
    }
}

module.exports = verify;