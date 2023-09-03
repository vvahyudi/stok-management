const bcrypt = require("bcrypt")
const client = require("../config/redis")
const wrapper = require("../utils/wrapper")
const userModel = require("../models/user")

module.exports = {
	getUserByUsername: async (request, response) => {
		try {
			const { username } = request.params
			const result = await authModel.getUserByUsername(username)
			if (result.length < 1) {
				return wrapper.response(response, 404, "Username not found", [])
			}
			return wrapper.response(
				response,
				200,
				"Success Get User By Username",
				result.data,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
