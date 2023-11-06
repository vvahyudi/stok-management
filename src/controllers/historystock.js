const historyStockModel = require("../models/historystock")
const productModel = require("../models/product")
const wrapper = require("../utils/wrapper")

module.exports = {
	getAllHistoryStock: async (request, response) => {
		try {
			let { page, limit, sort, search } = request.query
			page = +page
			limit = +limit
			const totalData = await historyStockModel.getCountHistoryStock(search)
			const totalPage = Math.ceil(totalData / limit)
			const pagination = {
				page,
				limit,
				totalPage,
				totalData,
			}
			const offset = (page - 1) * limit
			let sortBy = "name"
			let sortType = "asc"
			if (sort) {
				// "name.asc"
				sortBy = sort.split(".")[0]
				sortType = sort.split(".")[1]
			}
			if (sortType.toLowerCase() === "asc") {
				sortType = true
			} else {
				sortType = false
			}
			const result = await historyStockModel.getAllHistoryStock(
				offset,
				limit,
				sortBy,
				search,
				sortType,
			)
			console.log(result)
			return wrapper.response(
				response,
				200,
				"Success Get All History Stock",
				result.data,
				pagination,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	getHistoryStockByProductId: async (request, response) => {
		try {
			const { id } = request.params
			const result = await historyStockModel.getHistoryStockByProductId(id)
			console.log(result)
			if (result.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data with product_id ${id} Not Found`,
					result.data,
				)
			}

			return wrapper.response(
				response,
				200,
				`Success get History for product_id: ${id}`,
				result.data,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},

	addStockByProductId: async (request, response) => {
		try {
			const { product_id, qty, note } = request.body
			const stock_type = 1
			const productData = await productModel.getProductById(product_id)
			console.log(productData.data[0].stock)
			const stockProduct = productData.data[0].stock
			console.log(stockProduct)
			const total = stockProduct + parseInt(qty)
			const setStock = {
				stock: total,
			}
			await historyStockModel.updateStockByProductId(product_id, setStock)
			const setData = {
				product_id,
				stock_type,
				qty,
				note: note
					? note
					: `Adding stock by ${qty} for product id ${product_id}`,
			}
			await historyStockModel.addOrReduceStockByProductId(setData)

			return wrapper.response(
				response,
				200,
				"Success Add Stock to Product",
				setData,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	reduceStockByProductId: async (request, response) => {
		try {
			const { product_id, qty, note } = request.body
			const stock_type = 0
			const productData = await productModel.getProductById(product_id)
			// console.log(productData.data[0].stock)
			const stockProduct = productData.data[0].stock
			// console.log(stockProduct)
			const total = stockProduct - parseInt(qty)
			const setStock = {
				stock: total,
			}
			await historyStockModel.updateStockByProductId(product_id, setStock)
			const setData = {
				product_id,
				stock_type,
				qty,
				note: note
					? note
					: `Stock Reduce by ${qty} for product id ${product_id}`,
			}
			await historyStockModel.addOrReduceStockByProductId(setData)

			return wrapper.response(
				response,
				200,
				"Success Reduce Stock to Product",
				setData,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	updateStockByProductId: async (request, response) => {
		try {
			const { product_id, qty, note } = request.body
			const stock_type = 2
			const checkProductId =
				await historyStockModel.getHistoryStockByProductId(product_id)
			if (checkProductId.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data With product id ${product_id} Not Found`,
					[],
				)
			}
			const setStock = {
				stock: qty,
			}
			await historyStockModel.updateStockByProductId(product_id, setStock)
			const setData = {
				product_id,
				stock_type,
				qty,
				note,
			}
			await historyStockModel.addOrReduceStockByProductId(setData)
			return wrapper.response(
				response,
				200,
				`Success Update Stock for product id ${product_id}`,
				setData,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
