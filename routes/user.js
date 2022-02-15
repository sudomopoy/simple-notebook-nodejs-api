var express = require('express');
const auth = require('../src/auth');
var router = express.Router();
const User = require('../src/models/user');
const { compare, encrypt } = require('../src/utils/encryption');
router.post('/login', async function (req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username) return res.status(401).send({
            code: "InvalidUsername",
            message: "Invalid Username",
        });
        const user = await User.findOne({
            username: username
        }).exec();

        if (user) {
            if (!await compare(password, user.password)) return res.status(403).send({
                code: "InvalidPassword",
                message: "Invalid Password",
            });
            return res.status(200).json({
                token: auth.signToken({
                    username: user.username
                })
            });
        } else {
            try {
                const newUser = User({
                    username: username,
                    password: await encrypt(password)
                });
                await newUser.save();
                return res.status(201).json({
                    token: auth.signToken({
                        username: username
                    })
                });
            } catch (err) {
                return res.status(500).send({
                    code: "AnonymousError",
                    message: `Anonymous Error ${err}`,
                });
            }
        }
    } catch (err) {
        return res.status(500).send({
            code: err
        });
    }
});

module.exports = router;
