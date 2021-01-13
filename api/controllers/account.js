const accountDAO = require('../models/account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const transporter = require('../configs/nodemailer');
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
				const checkUser2 = await accountDAO.findOne({ email: email });
				if (checkUser === null && checkUser2 === null) {
					password = await bcrypt.hash(password, salt);
					const newAccount = new accountDAO({
						username: username,
						password: password,
						name: name,
						email: email,
						isAdmin: isAdmin,
						isOnline: false,
						isLocked: false,
						cups: 0,
						wins: 0,
						loses: 0,
						draws: 0,
						isConfirmed: isAdmin ? true : false,
						inRoom: false
					});
					await newAccount.save();

					if (!isAdmin) {
						await transporter.sendMail({
							from: '1712785 - 1712813',
							to: newAccount.email,
							subject: 'Tic-Tac-Toe Online Email Verification',
							html: '<p>Click <a href="' + process.env.DOMAIN_NAME +
								'mail-verification/' + newAccount._id + '"' +
								'> here </a> to verify your account </p>'
						})
					}
					
					res.status(200).json({
						message: "Successful"
					});
				} else {
					res.status(409).json({
						message: "This username/email is used"
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

	verifyEmail: async (req, res, next) => {
		try {
			const id = req.query.id;
			if (id === undefined) {
				res.status(400).json({
					message: 'Id is undefined'
				});
				return;
			}

			const user = await accountDAO.findById(id);
			if (user === null) {
				res.status(404).json({
					message: 'Id is undefined'
				})
			} else {
				user.isConfirmed = true;
				await user.save();
				res.status(200).json({
					message: 'OK'
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

			if (account.isLocked) {
				res.status(402).json({
					message: 'Account is locked'
				});
				return;
			}

			if (!account.isConfirmed) {
				res.status(403).json({
					message: 'Account is not activated'
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
			if (account === null || !account.isAdmin) {
				res.status(401).json({
					message: "Username not existed."
				});
				return;
			}

			if (account.isLocked) {
				res.status(402).json({
					message: 'Account is locked'
				});
				return;
			}

			if (!account.isConfirmed) {
				res.status(403).json({
					message: 'Account is not activated'
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

	getListUser: async (req, res, next) => {
		try {
			const users = await accountDAO.find({ isAdmin: false });
			res.status(200).json({
				message: 'Successful',
				users: users
			});
		} catch (e) {
			res.status(500).json({
				message: e.message
			});
		}
	},

	getUserInfo: async (req, res, next) => {
		const userId = req.query.userId;
		try {
			const user = await accountDAO.findById(userId);
			if (user === null) {
				res.status(401).json({
					message: 'User is not exist'
				});
				return;
			}

			res.status(200).json({
				message: 'Successful',
				user: user
			});
		} catch (e) {
			res.status(500).json({
				message: e.message
			});
		}
	},

	lockUser: async (req, res, next) => {
		const userId = req.body.userId;
		try {
			const user = await accountDAO.findById(userId);
			if (user === null) {
				res.status(401).json({
					message: 'User is not exist'
				});
			}

			user.isLocked = true;
			await user.save();
			res.status(200).json({
				message: 'Successful'
			});
		} catch (e) {
			res.status(500).json({
				message: e.message
			});
		}
	},

	sendMailForgotPass: async (req, res, next) => {
		try {
			const mail = req.body.email;
			const user = await accountDAO.findOne({ email: mail });

			if (user === null || user === undefined) {
				res.status(400).json({
					message: 'User is not existed'
				});
				return;
			}

			await transporter.sendMail({
				from: '1712785 - 1712813',
				to: mail,
				subject: 'Tic-Tac-Toe Online Email To Rest Password',
				html: '<p>Click <a href="' + process.env.DOMAIN_NAME +
					'reset-password/' + user._id + '"' +
					'> here </a> to rest password </p>'
			})

			res.status(200).json({
				message: 'OK'
			})
		} catch (e) {
			res.status(500).json({
				message: e.message
			});
		}
	},

	resetPassword: async (req, res, next) => {
		try {
			const { id, password } = req.body;
			const user = await accountDAO.findById(id);
			if (user === null || user === undefined) {
				res.status(400).json({
					message: 'User is not existed'
				});
				return;
			}

			const newPass = await bcrypt.hash(password, salt);
			user.password = newPass;

			await user.save();
			res.status(200).json({
				message: 'OK'
			});
		} catch (e) {
			res.status(500).json({
				message: e.message
			})
		}
	},

	checkToken: async (req, res, next) => {
		try {
			res.status(200).json({
				message: 'OK'
			});
		} catch (error) {
			res.status(500).json({
				message: e.message
			})
		}
	},

	getRankingBoard: async (req, res, next) => {
		try {
			const SIZE = 4;
			let page = req.query.page;
			if (page === undefined) page = 1; else page = parseInt(page);

			const totalPlayers = await accountDAO.countDocuments({isAdmin: false});
			let totalPages = Math.floor(totalPlayers / SIZE);
			totalPlayers % SIZE > 0 && totalPages++;
			const skip = SIZE * (page - 1);
			const result = await accountDAO.find({isAdmin: false}).sort('-cups').skip(skip).limit(SIZE).lean();

			for (let i = 0; i < result.length; i++){
				result[i].no = (i + 1) + skip;
			}

			res.status(200).json({
				message: 'OK',
				data: result,
				curPage: page,
				totalPages: totalPages
			})
		} catch (error) {
			res.status(500).json({
				message: error.message
			})
		}
	}
}