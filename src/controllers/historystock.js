const historyStockModel = require("../models/historystock")
const wrapper = require("../utils/wrapper")

module.exports = {
	getAllHistoryStock: async (request, response) => {
		try {
			let { page, limit, sort, search } = request.query
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
			let sortColumn = "product_id"
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

			const result = await historyStockModel.getAllHistoryStock(
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
			const { productId } = request.params
			const result =
				await historyStockModel.getHistoryStockByProductId(productId)
			console.log(result)
			if (result.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data with product_id ${productId} Not Found`,
					result.data,
				)
			}
			console.log(result.data[0])
			return wrapper.response(
				response,
				200,
				`Success get History for product_id: ${productId}`,
				result.data,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	getHistoryStockById: async (request, response) => {
		try {
			const { id } = request.params
			const result = await historyStockModel.getHistoryStockById(id)
			console.log(result)
			if (result.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data with id ${id} Not Found`,
					result.data,
				)
			}
			console.log(result.data[0])
			return wrapper.response(
				response,
				200,
				`Success get History for id: ${id}`,
				result.data,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	createHistoryStock: async (request, response) => {
		try {
			const { product_id, stock_type, qty, note } = request.body

			const setData = {
				product_id,
				stock_type,
				qty,
				note:
					stock_type === 0
						? `Stok untuk produk id : ${product_id} berkurang sebanyak ${qty}`
						: stock_type === 1
						? `Stok untuk produk id : ${product_id} bertambah sebanyak ${qty}`
						: note,
			}
			result = await historyStockModel.createHistoryStock(setData)
			return wrapper.response(
				response,
				200,
				"Success Create History Stock",
				setData,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
	updateStockByProductId: async (request, response) => {
		try {
			const { productId } = request.params
			const { stockType, qty, note } = request.body
			const checkProductId =
				await historyStockModel.getHistoryStockByProductId(productId)
			if (checkProductId.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data With ${productId} Not Found`,
					[],
				)
			}
			const setData = {
				stockType,
				qty,
				note,
			}
			await historyStockModel.updateStockByProductId(productId, setData)
			return wrapper.response(response, 200, "Success Create Product", setData)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},

	deleteStockByProductId: async (request, response) => {
		try {
			const { productId } = request.params
			const checkProductId =
				await historyStockModel.getHistoryStockByProductId(productId)
			if (checkProductId.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data With ${productId} Not Found`,
					[],
				)
			}
			await historyStockModel.deleteStockByProductId(productId)
			return wrapper.response(
				response,
				200,
				`Success Delete Stock for product_id: ${productId}`,
				productId,
			)
		} catch (error) {
			return wrapper.response(response, 500, error.message, error)
		}
	},
}
