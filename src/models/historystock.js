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
	getAllHistoryStock: (offset, limit) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_history_stock")
				.select(`*,tb_products(name)`)
				.range(offset, offset + limit - 1)
				// .order(sortColumn, { ascending: sortType })
				// .like("product_id", `%${search}%`)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),

	getHistoryStockByProductId: (id) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_history_stock")
				.select(`*, tb_products(name)`)
				.eq("product_id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),

	addOrReduceStockByProductId: (data) =>
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
	updateStockByProductId: (id, data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.update(data)
				.eq("id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
}
