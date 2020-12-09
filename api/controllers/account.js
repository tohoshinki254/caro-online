const accountDAO = require('../models/account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = 8;

module.exports = {
    register: async (req, res, next) => {
        try {
            const username = req.body.username;
            let password = req.body.password;
            const name = req.body.name;
            const email = req.body.email;
            const isAdmin = req.body.isAdmin;

            if (username && password && name && email && isAdmin !== undefined) {
                const checkUser = await accountDAO.findOne({ username: username });
                if (checkUser === null) {
                    password = await bcrypt.hash(password, salt);
                    const newAccount = new accountDAO({
                        username: username,
                        password: password,
                        name: name,
                        email: email,
                        isAdmin: isAdmin,
                        isOnline: false
                    });
                    await newAccount.save();
                    res.status(200).json({
                        message: "Successful"
                    });
                } else {
                    res.status(409).json({
                        message: "This username existed"
                    });
                }
            } else {
                res.status(400).json({
                    message: "username or password or name or email is undefined."
                })
            }
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    },

    loginUser: async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const account = await accountDAO.findOne({ username: username });
            if (account === null || account.isAdmin) {
                res.status(401).json({
                    message: "Username not existed."
                });
                return;
            }
            const isMatch = await bcrypt.compare(password, account.password);
            if (isMatch) {
                const payload = { _id: account.id, name: account.name, username: account.username };
                const token = jwt.sign(payload, process.env.SECRET_KEY);
                res.status(200).json({
                    message: "Successful",
                    token: token
                });
            } else {
                res.status(401).json({
                    message: 'Password is wrong.'
                });
            }
        } else {
            res.status(400).json({
                message: "username or password is undefined."
            });
        }
    },

    loginAdmin: async (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const account = await accountDAO.findOne({ username: username });
            if (account === null || !isAdmin) {
                res.status(401).json({
                    message: "Username not existed."
                });
                return;
            }
            const isMatch = await bcrypt.compare(password, account.password);
            if (isMatch) {
                const payload = { _id: account.id, name: account.name, username: account.username };
                const token = jwt.sign(payload, process.env.SECRET_KEY);
                res.status(200).json({
                    message: "Successful",
                    token: token
                });
            } else {
                res.status(401).json({
                    message: 'Password is wrong.'
                });
            }
        } else {
            res.status(400).json({
                message: "username or password is undefined."
            });
        }
    },

    update: async (req, res, next) => {
        try {
            const name = req.body.name;
            const newPassword = req.body.newPassword;
            const oldPassword = req.body.oldPassword;
            const email = req.body.email;

            const account = await accountDAO.findById(req.user._id);
            if (name) {
                account.name = name;
            }
            if (email) {
                account.email = email;
            }

            if (newPassword && oldPassword) {
                const isMatch = await bcrypt.compare(oldPassword, account.password);
                if (!isMatch) {
                    res.status(400).json({
                        message: "old password is wrong."
                    });
                    return;
                }

                const hash = await bcrypt.hash(newPassword, salt);
                account.password = hash;
            }

            await account.save();
            const payload = { _id: account._id, name: account.name, username: account.username };
            const token = jwt.sign(payload, process.env.SECRET_KEY);
            res.status(200).json({
                message: "Successful",
                token: token
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    },
}