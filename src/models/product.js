const supabase = require("../config/supabase")

module.exports = {
	getCountProduct: (search) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.select("*", { count: "exact" })
				.order(sortBy, { ascending: sortType })
				.like("name", `%${search}%`)
				.then((result) => {
					if (!result.error) {
						resolve(result.count)
					} else {
						reject(result)
					}
				})
		}),
	getAllProduct: (offset, limit, sortBy, search, sortType) =>
		new Promise((resolve, reject) => {
			supabase
				.from("tb_products")
				.select("*")
				.range(offset, offset + limit - 1)
				.order(sortBy, { ascending: sortType })
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
