const productModel = require("../models/product")
const historyStockModel = require("../models/historystock")
const wrapper = require("../utils/wrapper")

module.exports = {
	getAllProduct: async (request, response) => {
		try {
			let { page, limit, sort, search } = request.query
			page = +page
			limit = +limit
			const totalData = await productModel.getCountProduct()
			const totalPage = Math.ceil(totalData / limit)
			const pagination = {
				page,
				limit,
				totalPage,
				totalData,
			}
			const offset = (page - 1) * limit
			let sortColumn = "name"
			let sortType = "asc"
			if (sort) {
				// "name.asc"
				sortColumn = sort.split(".")[0]
				sortType = sort.split(".")[1]
			}
			if (sortType.toLowerCase() === "asc") {
				sortType = true
			} else {
				sortType = false
			}

			const result = await productModel.getAllProduct(
				offset,
				limit,
				sortColumn,
				search,
				sortType,
			)
			console.log(result)
			return wrapper.response(
				response,
				200,
				"Success Get All Product",
				result.data,
				pagination,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	getProductById: async (request, response) => {
		try {
			const { id } = request.params
			const result = await productModel.getProductById(id)
			if (result.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data with Id ${id} Not Found`,
					result.data,
				)
			}
			return wrapper.response(
				response,
				200,
				"Success Get Product By Id",
				result.data[0],
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	createProduct: async (request, response) => {
		try {
			const { name, price, description } = request.body
			const { filename, mimetype } = request.file
			const setData = {
				name,
				price: price ? price : 0,
				description: description ? description : `Ini produk ${name}`,
				picture: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
				stock: 0,
			}
			const result = await productModel.createProduct(setData)
			return wrapper.response(
				response,
				200,
				"Success Create Product",
				result.data,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	updateProduct: async (request, response) => {
		try {
			const { id } = request.params
			const { name, price, description } = request.body
			const { filename, mimetype } = request.file

			const checkId = await productModel.getProductById(id)
			if (checkId.data.length < 1) {
				return wrapper.response(response, 404, `Data With ${id} Not Found`, [])
			}
			const setData = {
				name,
				price: price ? price : 0,
				description: description ? description : `Ini produk ${name}`,
				picture: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
			}
			await productModel.updateProduct(id, setData)

			return wrapper.response(response, 200, "Success Update Product", setData)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	deleteProduct: async (request, response) => {
		try {
			const { id } = request.params
			const checkId = await productModel.getProductById(id)
			if (checkId.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data With Id ${id} Not Found`,
					[],
				)
			}
			await productModel.deleteProduct(id)
			return wrapper.response(
				response,
				200,
				`Success Delete Product With Id: ${id}`,
				id,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
