const bcrypt = require("bcrypt")
const client = require("../config/redis")
const wrapper = require("../utils/wrapper")
const userModel = require("../models/user")

module.exports = {
	addUser: async (request, response) => {
		try {
			const { username, password } = request.body
			const { filename, mimetype } = request.file
			const setData = {
				username,
				password,
				picture: filename ? `${filename}.${mimetype.split("/")[1]}` : null,
				role: 1,
			}
			const salt = bcrypt.genSaltSync(10)
			const hashedPassword = bcrypt.hashSync(setData.password, salt)
			setData.password = hashedPassword

			await userModel.addUser(setData)
			return wrapper.response(response, 200, "Success Create User")
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	getAllUser: async (request, response) => {
		try {
			let { page, limit, sort, search } = request.query
			page = +page
			limit = +limit
			const totalData = await userModel.getCountUser()
			const totalPage = Math.ceil(totalData / limit)
			const pagination = {
				page,
				limit,
				totalPage,
				totalData,
			}
			const offset = (page - 1) * limit
			let sortColumn = "username"
			let sortType = "asc"
			if (sort) {
				sortColumn = sort.split(".")[0]
				sortType = sort.split(".")[1]
			}
			if (sortType.toLowerCase() === "asc") {
				sortType = true
			} else {
				sortType = false
			}

			const result = await userModel.getAllUser(
				offset,
				limit,
				sortColumn,
				search,
				sortType,
			)

			return wrapper.response(
				response,
				200,
				"Success Get All User",
				result.data,
				pagination,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
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
