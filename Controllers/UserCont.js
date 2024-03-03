const User = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Login = async(req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).send({
                error: 'all field are required .'
            });
        }
        const user = await User.findOne({ email })
        if (user) {
            const passCheck = password == user.password
            if (!passCheck) {
                return res.status(422).send({
                    error: 'invalid info .'
                });
            } else {
                const token = jwt.sign({ userId: user._id },
                    "qwertyuioplkjhgfdsazxcvbnmklpii", { expiresIn: "1d" });
                return res.status(200).send({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    },
                    token
                });
            }
        } else {
            return res.status(422).send({
                error: 'invalid info .'
            });
        }
    } catch (error) {
        return res.status(422).send({
            error: error.message
        });
    }
};


getUser = async(req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'no user' });
    }
};







module.exports = { Login, getUser };