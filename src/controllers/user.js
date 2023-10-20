const bcrypt = require("bcrypt")
const client = require("../config/redis")
const wrapper = require("../utils/wrapper")
const userModel = require("../models/user")

module.exports = {
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
	getUserById: async (request, response) => {
		try {
			const { id } = request.params
			const result = await authModel.getUserById(id)
			if (result.length < 1) {
				return wrapper.response(response, 404, "Username not found", [])
			}
			return wrapper.response(
				response,
				200,
				`Success Get User By ID ${id}`,
				result.data,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
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
	updateUser: async (request, response) => {
		try {
			const { id } = request.params
			const { username, password } = request.body
			const { filename, mimetype } = request.file

			const checkId = await userModel.getUserById(id)
			if (checkId.data.length < 1) {
				return wrapper.response(response, 404, `Data With ${id} Not Found`, [])
			}
			const setData = {
				username,
				password,
				picture: filename ? `${filename}.${mimetype.split("/")[1]}` : null,
				role: 1,
			}
			const salt = bcrypt.genSaltSync(10)
			const hashedPassword = bcrypt.hashSync(setData.password, salt)
			setData.password = hashedPassword
			await userModel.updateUser(id, setData)
			return wrapper.response(response, 200, "Success Update User")
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	deleteUser: async (request, response) => {
		try {
			const { id } = request.params
			const checkId = await userModel.getUserById(id)
			if (checkId.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data With Id ${id} Not Found`,
					[],
				)
			}
			await userModel.deleteUser(id)
			return wrapper.response(
				response,
				200,
				`Success Delete User With Id: ${id}`,
				id,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
