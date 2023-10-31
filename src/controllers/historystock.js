const historyStockModel = require("../models/historystock")
const productModel = require("../models/product")
const wrapper = require("../utils/wrapper")

module.exports = {
	getAllHistoryStock: async (request, response) => {
		try {
			let { page, limit } = request.query
			page = +page
			limit = +limit
			const totalData = await historyStockModel.getCountHistoryStock()
			const totalPage = Math.ceil(totalData / limit)
			const pagination = {
				page,
				limit,
				totalPage,
				totalData,
			}
			const offset = (page - 1) * limit

			const result = await historyStockModel.getAllHistoryStock(offset, limit)
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
			console.log(productData.data[0].stock)
			const stockProduct = productData.data[0].stock
			console.log(stockProduct)
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
			const { id } = request.params
			const { qty, note } = request.body
			const stock_type = 2
			const checkProductId =
				await historyStockModel.getHistoryStockByProductId(id)
			if (checkProductId.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data With product id ${productId} Not Found`,
					[],
				)
			}
			const setStock = {
				stock: qty,
			}
			await historyStockModel.updateStockByProductId(id, setStock)
			const setData = {
				product_id: id,
				stock_type,
				qty,
				note,
			}
			await historyStockModel.addOrReduceStockByProductId(setData)
			return wrapper.response(
				response,
				200,
				`Success Update Stock for product id ${id}`,
				setData,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
