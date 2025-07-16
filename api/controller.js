const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'supersecret';

const users = {
    u1: {id: 'u1', role: 'user'},
    u2: {id: 'u2', role: 'admin'},
}

const login = (req, res) => {
    const { id } = req.body;
    const user = users[id];

    if(!user) {
        return res.status(401).json({error: 'Invalid user'});
    }

    const token = jwt.sign({id: user.id, role: user.role}, jwtSecret, {expiresIn: '1h'});
    res.json({token});
}

const deletePost = (req, res) => {
    const { id } = req.params;
    const { role } = req.user;

    if(role !== 'admin') {
        return res.status(403).json({error: 'Unauthorized'});
    }

    res.json({ message: `Post ${id} deleted by ${req.user.id}` });
}

module.exports = { users, login, deletePost };