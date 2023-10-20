const { JWT_ACCESS_KEYS, JWT_REFRESH_KEYS } = process.env
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const client = require("../config/redis")
const authModel = require("../models/auth")
const wrapper = require("../utils/wrapper")

module.exports = {
	login: async (request, response) => {
		try {
			const { username, password } = request.body
			const checkUser = await authModel.getUserByUsername(username)
			if (checkUser.length < 1) {
				return wrapper.response(response, 404, "Username not Registered", null)
			}
			const matchPassword = bcrypt.compareSync(
				password,
				checkUser.data[0].password,
			)
			if (!matchPassword) {
				return wrapper.response(response, 401, "Wrong Password", null)
			}

			const payload = {
				id: checkUser.data[0].id,
				role: !checkUser.data[0].role ? "1" : checkUser.data[0].role,
			}
			delete payload.password
			const token = jwt.sign(payload, JWT_ACCESS_KEYS, { expiresIn: "1d" })

			const refreshToken = jwt.sign(payload, JWT_REFRESH_KEYS, {
				expiresIn: "1d",
			})

			return wrapper.response(response, 200, "Login Successful", {
				username,
				role: payload.role,
				token,
				refreshToken,
			})
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	logout: async (request, response) => {
		try {
			let token = request.headers.authorization
			token = token.split(" ")[1]

			client.setEx(`accessToken:${token}`, 3600 * 48, token)
			return wrapper.response(response, 200, "Logout Successful")
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	refresh: async (request, response) => {
		try {
			const { refreshToken } = request.headers
			if (!refreshToken) {
				return wrapper.response(response, 400, "Refresh Token Required", null)
			}
			const checkBlacklistToken = await client.get(
				`refreshToken:${refreshToken}`,
			)
			if (checkBlacklistToken) {
				return wrapper.response(
					response,
					403,
					"Your token has been Destroyed please re-login",
					null,
				)
			}

			let token, payload, newRefreshToken
			jwt.verify(refreshToken, JWT_REFRESH_KEYS, (error, result) => {
				if (error) {
					return wrapper.response(response, 401, "Invalid Token", null)
				}
				payload = {
					id: result.id,
					role: !result.role ? "1" : result.role,
				}
				token = jwt.sign(payload, JWT_ACCESS_KEYS, { expiresIn: "1d" })
				newRefreshToken = jwt.sign(payload, JWT_REFRESH_KEYS, {
					expiresIn: "2h",
				})
				client.setEx(`refreshToken:${refreshToken}`, 3600 * 2, refreshToken)
			})
			return wrapper.response(response, 200, "Success Refresh Token", {
				id: payload.id,
				token,
				refreshToken: newRefreshToken,
			})
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
