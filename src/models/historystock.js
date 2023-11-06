const supabase = require("../config/supabase")

module.exports = {
	getCountHistoryStock: (search) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_history_stock")
				.select("*", { count: "exact" })
				.ilike("product_id", `%${search}%`)
				.then((result) => {
					if (!result.error) {
						resolve(result.count)
					} else {
						reject(result)
					}
				})
		}),
	getAllHistoryStock: (offset, limit, sortBy, search, sortType) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_history_stock")
				.select(`*,tb_products(name)`)
				.range(offset, offset + limit - 1)
				.order(sortBy, { ascending: sortType })
				.like("product_id", `%${search}%`)
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
