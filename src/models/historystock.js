const supabase = require("../config/supabase")

module.exports = {
	getCountHistoryStock: () =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_history_stock")
				.select("*", { count: "exact" })
				.then((result) => {
					if (!result.error) {
						resolve(result.count)
					} else {
						reject(result)
					}
				})
		}),
	getAllHistoryStock: (offset, limit, sortColumn, search, sortType) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_history_stock")
				.select("*")
				.range(offset, offset + limit - 1)
				.order(sortColumn, { ascending: sortType })
				.like("product_id", `%${search}%`)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),

	getHistoryStockByProductId: (productId) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_history_stock")
				.select("*")
				.eq("product_id", productId)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	getHistoryStockById: (id) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_history_stock")
				.select("*")
				.eq("id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	createHistoryStock: (data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_history_stock")
				.insert(data)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	updateStockByProductId: (productId, data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.update(data)
				.eq("product_id", productId)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	deleteStockByProductId: (productId) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.delete()
				.eq("product_id", productId)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
}
