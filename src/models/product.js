const supabase = require("../config/supabase")

module.exports = {
	getCountProduct: () =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.select("*", { count: "exact" })
				.then((result) => {
					if (!result.error) {
						resolve(result.count)
					} else {
						reject(result)
					}
				})
		}),
	getAllProduct: (offset, limit, sortColumn, search, sortType) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.select("*")
				.range(offset, offset + limit - 1)
				.order(sortColumn, { ascending: sortType })
				.like("name", `%${search}%`)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	getProductById: (id) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.select(
					"name, price, description, picture, stock, tb_history_stock(product_id, stock_type, qty,created_at)",
				)
				.eq("id", id)
				.order("created_at", {
					foreignTable: "tb_history_stock",
					ascending: false,
				}) // Menyortir berdasarkan createdAt dalam urutan menurun
				.limit(1)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	createProduct: (data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.insert(data)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	updateProduct: (id, data) =>
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
	updateProductStock: (id, data) =>
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
	deleteProduct: (id) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.delete()
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
