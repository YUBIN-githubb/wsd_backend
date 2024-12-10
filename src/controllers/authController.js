const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 회원가입
exports.register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name });
        await user.save();
        res.status(201).json({ status: 'success', message: 'User registered successfully' });
    } catch (err) {
        next(err);
    }
};

// 로그인
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: 'success', token });
    } catch (err) {
        next(err);
    }
};
